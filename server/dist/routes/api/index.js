import express from 'express';
import userRoutes from './userRoutes.js';
import databaseRoutes from './databaseRoutes.js';
const router = express.Router();
// Mount routes
router.use('/users', userRoutes);
router.use('/db', databaseRoutes);
export default router;
