import mongoose from 'mongoose';
import { User, Movie } from '../models/index.js';

/**
 * Gets database statistics from MongoDB Atlas
 */
export const getDatabaseStats = async () => {
  try {
    // Check if connection is established
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not established');
    }

    const stats = {
      users: await User.countDocuments(),
      movies: await Movie.countDocuments(),
      // Fix: Correctly access the database name
      databaseName: mongoose.connection.db?.databaseName || 'unknown',
      connectionHost: mongoose.connection.host || 'unknown',
      isConnected: mongoose.connection.readyState === 1
    };
    return stats;
  } catch (error) {
    console.error('Error getting database stats:', error);
    throw error;
  }
};

/**
 * Checks if MongoDB Atlas is connected
 */
export const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Gets collection names from MongoDB Atlas
 */
export const getCollections = async () => {
  try {
    // Check if connection is established
    if (!mongoose.connection || mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      throw new Error('Database connection not established');
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections.map(col => col.name);
  } catch (error) {
    console.error('Error getting collections:', error);
    throw error;
  }
};
