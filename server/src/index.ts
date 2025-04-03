import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware, UserContext } from './utils/auth';
import db from './config/connection';

const PORT = process.env.PORT || 3001;
const app = express();

// Create new Apollo server and pass in schema data
const server = new ApolloServer<UserContext>({
  typeDefs,
  resolvers,
});

// If in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  // Use path.resolve to handle different deployment environments
  const clientBuildPath = path.resolve(__dirname, '../../client/dist');
  
  // For debugging in production
  console.log('Serving static files from:', clientBuildPath);
  
  // Check if the directory exists
  try {
    if (require('fs').existsSync(clientBuildPath)) {
      console.log('Client build directory exists');
    } else {
      console.log('Client build directory does not exist');
    }
  } catch (err) {
    console.error('Error checking for client build directory:', err);
  }
  
  app.use(express.static(clientBuildPath));
}

const startApolloServer = async () => {
  await server.start();
  
  // Apply Express middleware *after* server has started
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  // Apply Apollo middleware with context
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  
  // Serve index.html for any other route in production
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(__dirname, '../../client/dist'), 'index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
