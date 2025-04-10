import connectDB from './config/connection.js';
import { User, Movie } from './models/index.js';
import userData from './seeds/userData.json' with { type: 'json' };
import movieData from './seeds/movieData.json' with { type: 'json' };
const seedDB = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Movie.deleteMany({});
        console.log('Database cleared');
        // Create movies first
        const movies = await Movie.insertMany(movieData);
        console.log(`${movies.length} movies inserted`);
        // Create users with movies
        const createdUsers = [];
        // Create users
        const users = await User.create([
            { username: 'Movie_Squad', email: 'MovieSquad@Team3.com' },
        ]);
        // Add the created user to the createdUsers array
        createdUsers.push(...users);
        console.log('Users seeded');
        for (const user of userData) {
            // Generate userId for each user
            const userId = user.username.toLowerCase().replace(/\s/g, '') + Date.now().toString();
            // Create a new user with the first movie in their collections
            const newUser = await User.create({
                ...user,
                userId,
                // Add the first movie to their watchlist
                watchlist: [movies[0].movieId],
                // Add the movie to their savedMovies
                savedMovies: [movies[0]]
            });
            createdUsers.push(newUser);
        }
        console.log(`${createdUsers.length} users created with movies in their collections`);
        // For demo purposes, let's associate a few ratings/reviews with the first user and movie
        if (createdUsers.length > 0 && movies.length > 0) {
            // This would use your Rating/Review models if you implement them
            console.log(`First user (${createdUsers[0].username}) has been associated with the movie "${movies[0].title}"`);
        }
        console.log('Seeding complete!');
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// Connect to the database and seed
connectDB()
    .then(() => seedDB());
