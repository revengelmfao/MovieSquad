const typeDefs = `
  type User {
    _id: ID!
    userId: Number!
    username: String!
    email: String!
    savedMovies: [Movie]
    watchlist: [String]
    ratings: [Rating]
    reviews: [Review]
    createdAt: String
  }

  type Movie {
    _id: ID!
    movieId: String!
    title: String!
    posterPath: String!
    year: Int!
    plot: String!
    director: String!
    actors: [String!]!
    genres: [String!]!
    imdbRating: String
    rated: String
    runtime: String
    language: String
    ratings: [Rating]
    reviews: [Review]
    createdAt: String
  }

  type Rating {
    _id: ID!
    userId: String!
    movieId: String!
    score: Int!
    review: String!
    createdAt: String
  }

  type Review {
    _id: ID!
    userId: String!
    movieId: String!
    review: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    movieId: String!
    title: String!
    posterPath: String!
    year: Int!
    plot: String!
    director: String!
    actors: [String!]!
    genres: [String!]!
    imdbRating: String
    rated: String
    runtime: String
    language: String
  }

  type Query {
    me: User
    getUser(_id: ID!): User
    getMovie(movieId: String!): Movie
    getAllUsers: [User]
    getSavedMovies(userId: ID!): [Movie]
    getWatchlist(userId: ID!): [String]
    getRatings(userId: ID!): [Rating]
    getReviews(userId: ID!): [Review]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: String!): User
    addToWatchlist(movieId: String!): User
    removeFromWatchlist(movieId: String!): User
    addRating(movieId: String!, score: Int!, review: String!): User
    removeRating(movieId: String!): User
    updateRating(movieId: String!, score: Int!, review: String!): User
    addReview(movieId: String!, review: String!): User
    removeReview(movieId: String!): User
    updateReview(movieId: String!, review: String!): User
  }
`;

export default typeDefs;