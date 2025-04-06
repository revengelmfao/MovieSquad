import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';

// Register all route modules
router.use('/users', userRoutes);

export default router;
