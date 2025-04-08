import { User, Rating, Review, Movie } from "../models/index.js";
import { signToken, AuthenticationError, UserContext, TokenUser } from "../services/auth-service.js";
import { Schema, Document, ObjectId, Types } from "mongoose";

// Define proper interfaces for your types
interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  savedMovies: MovieType[];
  watchlist: string[];
  ratings: RatingType[];
  reviews: IReviewType[];
  createdAt: string;
}

// Interface for User document with isCorrectPassword method
interface UserDocument extends Document {
  userId: number;
  username: string;
  email: string;
  password: string;
  savedMovies: MovieType[];
  watchlist: string[];
  ratings: RatingType[];
  reviews: IReviewType[];
  createdAt: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

interface MovieType {
  _id?: string;
  movieId: string;
  title: string;
  posterPath: string;
  year: number;
  plot: string;
  director: string;
  actors: string[];
  genres: string[];
}

interface MovieInput {
  movieData: MovieType;
}

interface RatingType {
  userId: string;
  movieId: string;
  score: number;
  review: string;
  createdAt?: string;
}

interface IReviewType {
  userId: string;
  movieId: string;
  review: string;
  createdAt?: string;
}

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      
      const user = await User.findById(context.user._id)
        .populate("ratings")
        .populate("reviews");
        
      return user;
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
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      // No need to populate savedMovies as they are embedded documents
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
    createUser: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
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
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ email }) as UserDocument;
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
    saveMovie: async (_: any, { movieData }: { movieData: MovieType }, context: UserContext) => {
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
    removeMovie: async (_: any, { movieId }: { movieId: string }, context: UserContext) => {
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
    addRating: async (_: any, { movieId, score, review }: RatingType, context: UserContext) => {
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
    updateRating: async (_: any, { movieId, score, review }: RatingType, context: UserContext) => {
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
    addReview: async (_: any, { movieId, review }: { movieId: string, review: string }, context: UserContext) => {
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
    updateReview: async (_: any, { movieId, review }: { movieId: string, review: string }, context: UserContext) => {
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
