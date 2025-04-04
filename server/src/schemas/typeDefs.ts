const typeDefs = `
  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    savedMovies: [String!]!
    watchlist: [String!]!
    ratings: [Rating!]!
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
    ratings: [Rating!]!
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
    ratings: [Rating!]!
    reviews: [Review!]!
  }

  type Rating {
    userId: ID!
    movieId: String!
    score: Int!
    review: String!
    createdAt: String!
  }

  type Review {
    userId: ID!
    movieId: String!
    review: String!
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
    getMovie(movieId: String!): Movie
    getSavedMovies(userId: ID!): [Movie!]!
    getWatchlist(userId: ID!): [Movie!]!
    getRatings(userId: ID!): [Rating!]!
    getReviews(userId: ID!): [Review!]!
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
  }
`;

export default typeDefs;