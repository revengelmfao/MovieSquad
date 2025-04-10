import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js'; // Make sure the path matches
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const startApolloServer = async () => {
    await server.start();
    await connectDB();
    const PORT = process.env.PORT || 3001;
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, {
        context: authenticateToken
    }));
    if (process.env.NODE_ENV === 'production') {
        // Use the fixed __dirname with path.resolve for more reliable path resolution
        const clientPath = path.resolve(__dirname, '../../client/dist');
        console.log('Serving static files from:', clientPath);
        app.use(express.static(clientPath));
        // Fix the type issue with req param
        app.get('*', (req, res) => {
            res.sendFile(path.join(clientPath, 'index.html'));
        });
    }
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
};
startApolloServer();
