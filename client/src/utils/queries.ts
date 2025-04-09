import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedMovies {
        _id
        movieId
        title
        posterPath
        year
        plot
        director
        genres
      }
      watchlist
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(_id: $userId) {
      _id
      username
      email
      savedMovies {
        _id
        movieId
        title
        posterPath
      }
      watchlist
    }
  }
`;

export const GET_DATABASE_STATS = gql`
  query getDatabaseStats {
    databaseStats {
      users
      movies
      databaseName
      connectionHost
      isConnected
    }
  }
`;
