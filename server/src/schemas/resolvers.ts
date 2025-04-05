import { User, Rating, Review, DiscussionThread } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

import mongoose from "mongoose";
import MovieSchema from "../models/Movie.js";

// import { Schema, model } from "mongoose";
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

interface DiscussionThreadInput {
  threadId: string;
  user: string;
  movie: string;
  title: string;
  posts: string[];
}
interface Post {
  user: string; // User ID
  text: string;
  createdAt?: Date;
}
interface DiscussionThread {
  threadId: string;
  user: string; // User ID
  movie: string; // Movie ID
  title: string;
  posts?: Post[]; // Array of posts
  createdAt?: Date;
}

interface UserContext {
  user: User | null;
  token: string | null;
}

const resolvers = {
  Query: {
    // query for the current user
    me: async (_: any, __: any, context: UserContext) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return context.user;
    },
    // query for a specific user by ID
    getUser: async (_: any, { _id }: { _id: string }) => {
      const user = await User.findById(_id).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    // query for getting a user's friends
    getFriends: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate({ path: "friends", model: "User" }).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.friends;
    },
    // query for getting a specific friend by ID
    getFriend: async (_: any, { userId, friendId }: { userId: string; friendId: string }) => {
      const user = await User.findById(userId).populate("friends").populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      const friend = user.friends.find((friend: any) => friend._id.toString() === friendId);
      if (!friend) {
        throw new Error("Friend not found");
      }
      return friend;
    },
    // query for all movies
    getMovie: async (_: any, { movieId }: { movieId: string }) => {
      const movie = await Movie.findById(movieId).populate("ratings").populate("reviews");
      if (!movie) {
        throw new Error("Movie not found");
      }
      return movie;
    },
    // query for all movies
    getAllUsers: async () => {
      const users = await User.find().populate("ratings").populate("reviews");
      return users;
    },
    // query to get all movies saved by a user
    getSavedMovies: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("savedMovies").populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.savedMovies;
    },
    // query to get all movies in a user's watchlist
    getWatchlist: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("watchlist").populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.watchlist;
    },
    // query to get all ratings made by a user
    getRatings: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.ratings;
    },
    // query to get all reviews made by a user
    getReviews: async (_: any, { userId }: { userId: string }) => {
      const user = await User.findById(userId).populate("ratings").populate("reviews");
      if (!user) {
        throw new Error("User not found");
      }
      return user.reviews;
    },
    // query to get all discussion threads for a specific movie
    getDiscussionThreads: async (_: any, { movieId }: { movieId: string }) => {
      const threads = await DiscussionThread.find({ movie: movieId }).populate("posts.user").populate("user");
      return threads;
    },
    // query to get all discussion threads created by a specific user
    getDiscussionThread: async (_: any, { threadId }: { threadId: string }) => {
      const thread = await DiscussionThread.findById(threadId).populate("posts.user").populate("user");
      if (!thread) {
        throw new Error("Thread not found");
      }
      return thread;
    },
  },
  Mutation: {
    // mutation to create a new user
    createUser: async (_: any, { username, email, password }: User) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // mutation to log in a user
    login: async (_: any, { email, password }: User) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.comparePassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    // mutation to add a movie to a user's saved movies
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
    // mutation to remove a movie from a user's saved movies
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
    // mutation to add a movie to a user's watchlist
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
    // mutation to remove a movie from a user's watchlist
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
    // mutation to add a rating to a movie
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
    // mutation to remove a rating from a movie
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
    // mutation to update a rating for a movie
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
    // mutation to add a review to a movie
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
    // mutation to remove a review from a movie
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
    // mutation to update a review for a movie
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
    // mutation to create a new discussion thread
    createDiscussionThread: async (_: any, { threadId, user, movie, title, posts }: DiscussionThreadInput) => {
      const thread = await DiscussionThread.create({ threadId, user, movie, title, posts });
      return thread;
    },
    // mutation to add a post to a discussion thread
    addPostToThread: async (_: any, { threadId, user, text }: { threadId: string; user: string; text: string }) => {
      const thread = await DiscussionThread.findByIdAndUpdate(
        threadId,
        { $addToSet: { posts: { user, text } } },
        { new: true }
      );
      return thread;
    },
    // mutation to remove a post from a discussion thread
    removePostFromThread: async (_: any, { threadId, postId }: { threadId: string; postId: string }) => {
      const thread = await DiscussionThread.findByIdAndUpdate(
        threadId,
        { $pull: { posts: { _id: postId } } },
        { new: true }
      );
      return thread;
    },
    // mutation to update a post in a discussion thread
    updatePostInThread: async (_: any, { threadId, postId, text }: { threadId: string; postId: string; text: string }) => {
      const thread = await DiscussionThread.findOneAndUpdate(
        { _id: threadId, "posts._id": postId },
        { $set: { "posts.$.text": text } },
        { new: true }
      );
      if (!thread) {
        throw new Error("Thread or post not found");
      }
      return thread;
    },
    // mutation to delete a discussion thread
    deleteDiscussionThread: async (_: any, { threadId }: { threadId: string }) => {
      const thread = await DiscussionThread.findByIdAndDelete(threadId);
      if (!thread) {
        throw new Error("Thread not found");
      }
      return thread;
    },
    // mutation to delete a post from a discussion thread
    deletePostFromThread: async (_: any, { threadId, postId }: { threadId: string; postId: string }) => {
      const thread = await DiscussionThread.findByIdAndUpdate(
        threadId,
        { $pull: { posts: { _id: postId } } },
        { new: true }
      );
      if (!thread) {
        throw new Error("Thread not found");
      }
      return thread;
    },
    // mutation to update a discussion thread's title
    updateDiscussionThread: async (_: any, { threadId, title }: { threadId: string; title: string }) => {
      const thread = await DiscussionThread.findByIdAndUpdate(
        threadId,
        { title },
        { new: true }
      );
      if (!thread) {
        throw new Error("Thread not found");
      }
      return thread;
    },
    // mutation to add a friend to a user's friends list
    addFriend: async (_: any, { userId, friendId }: { userId: string; friendId: string }) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      return user;
    }
  },
};

export default resolvers;
