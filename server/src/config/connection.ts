import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const connectDB = async () => {
  try {
    // If in production, log a warning before connecting
    if (isProd) {
      console.warn('WARNING: Running in production mode - data operations will affect live data!');
      // Optional: Add a confirmation prompt for production seeding
    }

    // MongoDB Atlas connection string will be used if available in environment variables
    // Format should be: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/movie-app
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie-app';
    
    // Log the connection string but hide the password for security
    const sanitizedUri = MONGODB_URI.includes('@') 
      ? MONGODB_URI.replace(/(:.*@)/, ':****@') 
      : MONGODB_URI;
      
    console.log('Connecting to MongoDB at:', sanitizedUri);
    
    const conn = await mongoose.connect(MONGODB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
