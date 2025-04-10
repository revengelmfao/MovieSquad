import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($movieData: MovieInput!) {
    saveMovie(movieData: $movieData) {
      _id
      username
      savedMovies {
        movieId
        title
        posterPath
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      savedMovies {
        movieId
        title
      }
    }
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation addToWatchlist($movieId: String!) {
    addToWatchlist(movieId: $movieId) {
      _id
      username
      watchlist
    }
  }
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation removeFromWatchlist($movieId: String!) {
    removeFromWatchlist(movieId: $movieId) {
      _id
      username
      watchlist
    }
  }
`;
