import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';

// Register all route modules
router.use('/users', userRoutes);

// Add debug route
router.get('/test', (req, res) => {
  res.json({ message: 'API routes are working' });
});

export default router;
