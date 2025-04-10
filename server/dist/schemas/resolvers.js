import { User, Movie } from "../models/index.js";
import { signToken, AuthenticationError } from "../services/auth.js"; // Fix import
const resolvers = {
    Query: {
        me: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findById(context.user._id)
                .populate("ratings")
                .populate("reviews");
            return user;
        },
        getUser: async (_, { _id }) => {
            const user = await User.findById(_id).populate("ratings").populate("reviews");
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        },
        getMovie: async (_, { movieId }) => {
            const movie = await Movie.findById(movieId).populate("ratings").populate("reviews");
            if (!movie) {
                throw new Error("Movie not found");
            }
            return movie;
        },
        getAllUsers: async () => {
            const users = await User.find().populate("ratings").populate("reviews");
            return users;
        },
        getSavedMovies: async (_, { userId }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            // No need to populate savedMovies as they are embedded documents
            return user.savedMovies;
        },
        getWatchlist: async (_, { userId }) => {
            const user = await User.findById(userId).populate("watchlist").populate("ratings").populate("reviews");
            if (!user) {
                throw new Error("User not found");
            }
            return user.watchlist;
        },
        getRatings: async (_, { userId }) => {
            const user = await User.findById(userId).populate("ratings").populate("reviews");
            if (!user) {
                throw new Error("User not found");
            }
            return user.ratings;
        },
        getReviews: async (_, { userId }) => {
            const user = await User.findById(userId).populate("ratings").populate("reviews");
            if (!user) {
                throw new Error("User not found");
            }
            return user.reviews;
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            // Generate a userId
            const userId = username.toLowerCase().replace(/\s/g, '') + Date.now().toString();
            const user = await User.create({ userId, username, email, password });
            const token = signToken({
                username: user.username,
                email: user.email,
                _id: String(user._id)
            });
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // Use isCorrectPassword method
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // Fix: Explicitly convert ObjectId to string and use proper type assertion
            const userId = user._id ? user._id.toString() : '';
            const token = signToken({
                username: user.username,
                email: user.email,
                _id: userId
            });
            return { token, user };
        },
        saveMovie: async (_, { movieData }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedMovies: movieData } }, { new: true, runValidators: true });
            return user;
        },
        removeMovie: async (_, { movieId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $pull: { savedMovies: { movieId } } }, { new: true });
            return user;
        },
        addToWatchlist: async (_, { movieId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { watchlist: movieId } }, { new: true });
            return user;
        },
        removeFromWatchlist: async (_, { movieId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $pull: { watchlist: movieId } }, { new: true });
            return user;
        },
        addRating: async (_, { movieId, score, review }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { ratings: { movieId, score, review } } }, { new: true });
            return user;
        },
        removeRating: async (_, { movieId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $pull: { ratings: { movieId } } }, { new: true });
            return user;
        },
        updateRating: async (_, { movieId, score, review }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $set: { "ratings.$[elem].score": score, "ratings.$[elem].review": review } }, { arrayFilters: [{ "elem.movieId": movieId }], new: true });
            return user;
        },
        addReview: async (_, { movieId, review }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $addToSet: { reviews: { movieId, review } } }, { new: true });
            return user;
        },
        removeReview: async (_, { movieId }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $pull: { reviews: { movieId } } }, { new: true });
            return user;
        },
        updateReview: async (_, { movieId, review }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            const user = await User.findByIdAndUpdate(context.user._id, { $set: { "reviews.$[elem].review": review } }, { arrayFilters: [{ "elem.movieId": movieId }], new: true });
            return user;
        },
    },
};
export default resolvers;
