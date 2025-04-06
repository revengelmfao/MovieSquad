import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken, UserContext } from './services/auth-service.js';
import connectDB from './config/connection.js';
// Import API routes
import apiRoutes from './routes/api/index.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const app = express();

// Create new Apollo server and pass in schema data
const server = new ApolloServer<UserContext>({
  typeDefs,
  resolvers,
});

// If in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  // Use path.resolve for more reliable path resolution with the fixed __dirname
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
  
  // Mount the API routes - make sure this line is present
  app.use('/api', apiRoutes);
  
  // Add debug middleware to log all incoming requests
  app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
  });
  
  // Apply Apollo middleware with context
  app.use('/graphql', expressMiddleware(server, {
    context: authenticateToken
  }));
  
  // Serve index.html for any other route in production
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(__dirname, '../../client/dist'), 'index.html'));
    });
  }
  
  // Fix the db connection handling
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      console.log(`REST API available at http://localhost:${PORT}/api`);
      console.log(`Get all users at http://localhost:${PORT}/api/users`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

startApolloServer();
