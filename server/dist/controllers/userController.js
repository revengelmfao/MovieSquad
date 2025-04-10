import { User, Movie } from '../models/index.js';
// Get all users
export const getAllUsers = async (_req, res) => {
    try {
        console.log('Getting all users...');
        const users = await User.find();
        console.log(`Found ${users.length} users`);
        return res.json(users);
    }
    catch (err) {
        console.error('Error in getAllUsers:', err);
        return res.status(500).json({ message: 'Error retrieving users', error: err });
    }
};
// Get single user by ID
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Update a user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        // Remove user's associated movies
        // Assuming Movie is the model for the movies collection
        await Movie.deleteMany({ username: user.username });
        return res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Add a friend
export const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Remove a friend
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
