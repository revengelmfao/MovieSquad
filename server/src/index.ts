import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './utils/auth';
import db from './config/connection';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
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
  
  // Serve index.html for any route not handled by the API
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
