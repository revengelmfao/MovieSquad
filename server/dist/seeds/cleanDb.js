import { Movie, User } from '../models/index.js';
import process from 'process';
const cleanDB = async () => {
    try {
        // Delete movies from movie collection
        await Movie.deleteMany({});
        console.log('Movie collection cleaned.');
        // Delete movies from User collection
        await User.deleteMany({});
        console.log('User collection cleaned.');
    }
    catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};
export default cleanDB;
