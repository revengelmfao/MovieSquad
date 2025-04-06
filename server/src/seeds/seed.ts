import connectDB from '../config/connection.js';
import { Movie, Rating, Review, User } from '../models/index.js';
import cleanDB from './cleanDb.js';
import userData from './userData.json' with { type: 'json' };
import movieData from './movieData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();
    await cleanDB();

    // Insert movies first
    const movies = await Movie.insertMany(movieData);
    console.log(`${movies.length} movies inserted`);
    
    // Create users
    const users = await Promise.all(
      userData.map(async (user) => {
        // Generate userId for each user
        const userId = user.username.toLowerCase().replace(/\s/g, '') + Date.now().toString();
        
        // Create a new user with the movieId in their watchlist
        const newUser = await User.create({
          ...user,
          userId,
          // Add the first movie to their watchlist
          watchlist: [movies[0].movieId],
          // Add the movie to their savedMovies
          savedMovies: [movies[0]]
        });
        
        return newUser;
      })
    );
    
    console.log(`${users.length} users created with movies in their collections`);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
