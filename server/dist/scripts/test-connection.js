import connectDB from '../config/connection.js';
const testConnection = async () => {
    try {
        console.log('Testing connection to MongoDB Atlas...');
        const conn = await connectDB();
        console.log('Connection successful!');
        console.log(`Connected to: ${conn.connection.name} on host: ${conn.connection.host}`);
        process.exit(0);
    }
    catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        process.exit(1);
    }
};
testConnection();
