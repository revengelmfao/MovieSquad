import { getDatabaseStats, getCollections } from '../utils/atlas-utils.js';
import { User, Movie } from '../models/index.js';
// Get database stats
export const getStats = async (_req, res) => {
    try {
        const stats = await getDatabaseStats();
        return res.json(stats);
    }
    catch (err) {
        console.error('Error in getStats:', err);
        return res.status(500).json({ message: 'Error retrieving database stats', error: err });
    }
};
// Get collections
export const getCollectionsList = async (_req, res) => {
    try {
        const collections = await getCollections();
        return res.json({ collections });
    }
    catch (err) {
        console.error('Error in getCollectionsList:', err);
        return res.status(500).json({ message: 'Error retrieving collections', error: err });
    }
};
// Get all users' watchlists (admin route)
export const getAllWatchlists = async (_req, res) => {
    try {
        const users = await User.find({}, 'username watchlist');
        const watchlists = users.map(user => ({
            username: user.username,
            watchlist: user.watchlist || []
        }));
        return res.json(watchlists);
    }
    catch (err) {
        console.error('Error retrieving watchlists:', err);
        return res.status(500).json({ message: 'Error retrieving watchlists', error: err });
    }
};
// Get all users' saved movies (admin route)
export const getAllSavedMovies = async (_req, res) => {
    try {
        const users = await User.find({}, 'username savedMovies');
        const savedMovies = users.map(user => ({
            username: user.username,
            savedMoviesCount: user.savedMovies?.length || 0,
            savedMovies: user.savedMovies || []
        }));
        return res.json(savedMovies);
    }
    catch (err) {
        console.error('Error retrieving saved movies:', err);
        return res.status(500).json({ message: 'Error retrieving saved movies', error: err });
    }
};
// Get all movies
export const getAllMovies = async (_req, res) => {
    try {
        const movies = await Movie.find({});
        return res.json(movies);
    }
    catch (err) {
        console.error('Error retrieving movies:', err);
        return res.status(500).json({ message: 'Error retrieving movies', error: err });
    }
};
// Get movie by ID
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findOne({ movieId: id });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.json(movie);
    }
    catch (err) {
        console.error('Error retrieving movie:', err);
        return res.status(500).json({ message: 'Error retrieving movie', error: err });
    }
};
// Get movies by genre
export const getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const movies = await Movie.find({ genres: { $in: [genre] } });
        return res.json(movies);
    }
    catch (err) {
        console.error('Error retrieving movies by genre:', err);
        return res.status(500).json({ message: 'Error retrieving movies', error: err });
    }
};
