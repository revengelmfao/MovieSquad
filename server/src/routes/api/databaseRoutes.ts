import express from 'express';
import { getStats, getCollectionsList, getAllWatchlists, getAllSavedMovies } from '../../controllers/databaseController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public routes for basic database info
router.get('/stats', getStats);
router.get('/collections', getCollectionsList);

// Protected routes for admin - requires authentication
router.get('/watchlists', authMiddleware, getAllWatchlists);
router.get('/savedmovies', authMiddleware, getAllSavedMovies);

export default router;
