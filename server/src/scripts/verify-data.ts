import connectDB from '../config/connection.js';
import { User, Movie } from '../models/index.js';

const verifyData = async () => {
  try {
    await connectDB();
    
    // Count users
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in database`);
    
    // Count movies
    const movieCount = await Movie.countDocuments();
    console.log(`Found ${movieCount} movies in database`);
    
    // Get first few users
    const users = await User.find().limit(5);
    console.log('Sample users:', users.map(u => ({ 
      username: u.username, 
      email: u.email,
      savedMoviesCount: u.savedMovies?.length || 0 
    })));
    
    process.exit(0);
  } catch (err) {
    console.error('Error verifying data:', err);
    process.exit(1);
  }
};

verifyData();
