// import user model and interface
import User from '../models/User.js';
// import sign token function from auth
import { signToken } from '../services/auth.js';
// get a single user by either their id or their username
export const getSingleUser = async (req, res) => {
    const foundUser = await User.findOne({
        $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
    });
    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }
    return res.json(foundUser);
};
// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
export const createUser = async (req, res) => {
    const user = await User.create(req.body);
    if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken({
        username: user.username,
        email: user.email,
        _id: user.id.toString()
    });
    return res.json({ token, user });
};
// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
export const login = async (req, res) => {
    const user = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken({
        username: user.username,
        email: user.email,
        _id: user.id.toString()
    });
    return res.json({ token, user });
};
// save a movie to a user's savedMovies
export const saveMovie = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }
        const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { savedMovies: req.body } }, { new: true, runValidators: true });
        return res.json(updatedUser);
    }
    catch (err) {
        console.error('Error saving movie:', err);
        return res.status(400).json(err);
    }
};
// remove a movie from savedMovies
export const deleteMovie = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user found' });
    }
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { savedMovies: { movieId: req.params.movieId } } }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
};
// get all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    }
    catch (err) {
        console.error('Error retrieving users:', err);
        return res.status(500).json({ message: 'Error retrieving users', error: err });
    }
};
// get user by id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
};
// update user
export const updateUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(updatedUser);
    }
    catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Error updating user', error: err });
    }
};
// delete user
export const deleteUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
