import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
    .get(getAllUsers as any)
    .post(createUser as any);

// /api/users/:userId
router.route('/:userId')
    .get(getUserById as any)
    .put(updateUser as any)
    .delete(deleteUser as any);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend as any)
    .delete(removeFriend as any);

export default router;