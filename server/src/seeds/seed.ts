import connectDB from '../config/connection.js';
import { Movie, User } from '../models/index.js';
import cleanDB from './cleanDb.js';
import userData from './userData.json' with { type: 'json' };
import movieData from './movieData.json' with { type: 'json' };

// Transform movieData to match schema (description → plot)
const transformedMovieData = movieData.map(movie => ({
  ...movie,
  plot: movie.description || movie.description, // Fixed to use plot if description doesn't exist
  // Remove description field if it exists
  ...(movie.description && { description: undefined })
}));

const seedDatabase = async (): Promise<void> => {
  try {
    // This will connect to MongoDB Atlas using your .env MONGODB_URI
    console.log('Connecting to MongoDB Atlas...');
    await connectDB();
    
    // Clean DB - Be careful! This will delete all existing data
    console.log('Cleaning database...');
    await cleanDB();

    // Insert movies first
    console.log('Inserting movies...');
    const movies = await Movie.insertMany(transformedMovieData);
    console.log(`${movies.length} movies inserted successfully`);
    
    // Create users from userData.json
    console.log('Creating users...');
    
    // Add a default admin user for testing
    const adminUser = {
      userId: 'admin' + Date.now().toString(),
      username: 'admin',
      email: 'admin@movieapp.com',
      password: 'adminPassword123', // Will be encrypted by the User model pre-save hook
      watchlist: movies.length > 0 ? [movies[0].movieId] : [],
      savedMovies: movies.length > 0 ? [movies[0]] : []
    };
    
    const users = await Promise.all([
      User.create(adminUser),
      ...userData.map(async (user) => {
        // Generate userId for each user
        const userId = user.username.toLowerCase().replace(/\s/g, '') + Date.now().toString();
        
        // Add password if it doesn't exist in JSON (required by model)
        const userWithPassword = {
          ...user,
          userId,
          password: user.password || 'password123', // Default password if none provided
          // Add the first movie to their watchlist if movies exist
          watchlist: movies.length > 0 ? [movies[0].movieId] : [],
          // Add the movie to their savedMovies if movies exist
          savedMovies: movies.length > 0 ? [movies[0]] : []
        };
        
        return User.create(userWithPassword);
      })
    ]);
    
    console.log(`${users.length} users created with movies in their collections`);
    console.log('Admin user created for testing - username: admin, password: adminPassword123');
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
