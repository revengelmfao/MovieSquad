export const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedMovies: [Movie]
    watchlist: [Movie]
    ratings: [Rating]
    reviews: [Review]
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

export default typeDefs;