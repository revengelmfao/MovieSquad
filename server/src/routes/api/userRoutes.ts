import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllUsers).post(createUser);

// Protected routes - require authentication
router.route('/:userId')
  .get(authMiddleware, getUserById)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

export default router;