import { User, Rating, Review } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

import mongoose from "mongoose";
import MovieSchema from "../models/Movie.js";

const Movie = mongoose.model("Movie", MovieSchema);

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  savedMovies: string[];
  watchlist: string[];
  ratings: Rating[];
  reviews: Review[];
  createdAt: string;
}

interface MovieInput {
  movieId: string;
  title: string;
  posterPath: string;
  year: number;
  plot: string;
  director: string;
  actors: string[];
  genres: string[];
  ratings: Rating[];
  reviews: Review[];
}

interface saveMovieInput {
  movieData: MovieInput;
}

interface removeMovieInput {
  movieId: string;
}

interface Rating {
  userId: string;
  movieId: string;
  score: number;
  review: string;
  createdAt: string;
}

interface Review {
  userId: string;
  movieId: string;
  review: string;
  createdAt: string;
}

interface UserContext {
  user: User | null;
  token: string | null;
}

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return context.user;
    },
    getUser: async (_: any, { _id }: { _id: string }) => {
      const user = await User.findById(_id).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    getMovie: async (_: any, { movieId }: { movieId: string }) => {
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
    getSavedMovies: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("savedMovies").populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.savedMovies;
    },
    getWatchlist: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("watchlist").populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.watchlist;
    },
    getRatings: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.ratings;
    },
    getReviews: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.reviews;
    },
  },
  Mutation: {
    createUser: async (_: any, { username, email, password }: User) => {
      // Generate a userId (example: could use a UUID library)
      const userId = username.toLowerCase().replace(/\s/g, '') + Date.now().toString();
      
      const user = await User.create({ userId, username, email, password });
      const token = signToken({ Changed to String() which is more explicit for TypeScript
        username: user.username, 
        email: user.email, 
        _id: String(user._id)
      });
      return { token, user };
    },
    login: async (_: any, { email, password }: User) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.comparePassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken({ Changed to String() which is more explicit for TypeScript
        username: user.username, 
        email: user.email, 
        _id: user._id.toString() 
      });
      return { token, user };
    },
    saveMovie: async (_: any, { movieData }: saveMovieInput, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedMovies: movieData } },
        { new: true, runValidators: true }
      );
      return user;
    },
    removeMovie: async (_: any, { movieId }: removeMovieInput, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedMovies: { movieId } } },
        { new: true }
      );
      return user;
    },
    addToWatchlist: async (_: any, { movieId }: { movieId: string }, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { watchlist: movieId } },
        { new: true }
      );
      return user;
    },
    removeFromWatchlist: async (_: any, { movieId }: { movieId: string }, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { watchlist: movieId } },
        { new: true }
      );
      return user;
    },
    addRating: async (_: any, { movieId, score, review }: Rating, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { ratings: { movieId, score, review } } },
        { new: true }
      );
      return user;
    },
    removeRating: async (_: any, { movieId }: { movieId: string }, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { ratings: { movieId } } },
        { new: true }
      );
      return user;
    },
    updateRating: async (_: any, { movieId, score, review }: Rating, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $set: { "ratings.$[elem].score": score, "ratings.$[elem].review": review } },
        { arrayFilters: [{ "elem.movieId": movieId }], new: true }
      );
      return user;
    },
    addReview: async (_: any, { movieId, review }: Review, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { reviews: { movieId, review } } },
        { new: true }
      );
      return user;
    },
    removeReview: async (_: any, { movieId }: { movieId: string }, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { reviews: { movieId } } },
        { new: true }
      );
      return user;
    },
    updateReview: async (_: any, { movieId, review }: Review, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $set: { "reviews.$[elem].review": review } },
        { arrayFilters: [{ "elem.movieId": movieId }], new: true }
      );
      return user;
    },
  },
};

export default resolvers;
