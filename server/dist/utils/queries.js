import { gql } from 'graphql-tag';
export const GET_ME = gql `
  query me {
    me {
      _id
      username
      email
      savedMovies {
        movieId
        title
        posterPath
      }
      watchlist
    }
  }
`;
