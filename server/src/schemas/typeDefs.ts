const typeDefs = `
  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    friends: [String!]!
    savedMovies: [String!]!
    watchlist: [String!]!
    ratings: [Rating!]!
    reviews: [Review!]!
    createdAt: String!
  }

  type Movie {
    movieId: ID!
    title: String!
    posterPath: String!
    year: Int!
    plot: String!
    director: String!
    actors: [String!]!
    genres: [String!]!
    reviews: [Review!]!
  }

  type MovieInput {
    movieId: ID!
    title: String!
    posterPath: String!
    year: Int!
    plot: String!
    director: String!
    actors: [String!]!
    genres: [String!]!
    reviews: [Review!]!
  }

  type Rating {
    userId: ID!
    movieId: String!
    score: Int!
    review: String!
    createdAt: String!
  }

  type Comment {
    userId: ID!
    text: String!
    createdAt: String!
  }

  type Review {
    userId: ID!
    movieId: String!
    review: String!
    comments: [String!]!
    createdAt: String!
  }

  type DiscussionThread {
    threadId: ID!
    userId: ID!
    movieId: String!
    title: String!
    posts: [String!]!
    createdAt: String!
  }

  type Post {
    userId: ID!
    text: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getUser(_id: ID!): User
    getAllUsers: [User!]!
    getFriends(userId: ID!): [User!]!
    getFriend(userId: ID!, friendId: ID!): User
    getMovie(movieId: String!): Movie
    getSavedMovies(userId: ID!): [Movie!]!
    getWatchlist(userId: ID!): [Movie!]!
    getRatings(userId: ID!): [Rating!]!
    getReviews(userId: ID!): [Review!]!
    getDiscussionThreads(movieId: String!): [DiscussionThread!]!
    getDiscussionThread(threadId: String!): DiscussionThread
    getPosts(threadId: String!): [Post!]!
    getPost(postId: String!): Post
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    saveMovie(data: MovieInput!, userId: ID!): User!
    removeMovie(movieId: ID!): User!
    addToWatchlist(userId: ID!, movieId: String!): User!
    removeFromWatchlist(userId: ID!, movieId: String!): User!
    addRating(userId: ID!, movieId: String!, score: Int!, review: String!): User!
    updateRating(userId: ID!, movieId: String!, score: Int!, review: String!): User!
    removeRating(userId: ID!, movieId: String!): User!
    addReview(userId: ID!, movieId: String!, review: String!): User!
    updateReview(userId: ID!, movieId: String!, review: String!): User!
    removeReview(userId: ID!, movieId: String!): User!
    addComment(userId: ID!, reviewId: String!, text: String!): User!
    updateComment(userId: ID!, reviewId: String!, text: String!): User!
    removeComment(userId: ID!, reviewId: String!): User!
    createDiscussionThread(userId: ID!, movieId: String!, title: String!, posts: [String!]!): DiscussionThread!
    updateDiscussionThread(threadId: String!, title: String!, posts: [String!]!): DiscussionThread!
    removeDiscussionThread(threadId: String!): DiscussionThread!
    addPost(threadId: String!, userId: ID!, text: String!): DiscussionThread!
    updatePost(threadId: String!, postId: String!, text: String!): DiscussionThread!
    removePost(threadId: String!, postId: String!): DiscussionThread!
    addFriend(userId: ID!, friendId: ID!): User!
    removeFriend(userId: ID!, friendId: ID!): User!
  }
`;

export default typeDefs;