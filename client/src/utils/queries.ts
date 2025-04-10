import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      password
        savedMovies {
            movieId
            title
            posterPath
            year
            plot
            director
            actors
            genres
            imdbRating
            rated
            runtime
            language
        }
        watchlist
        ratings {
            _id
            userId
            movieId
            score
            review
            createdAt
        }
        reviews {
            _id
            userId
            movieId
            review
            createdAt
        }
        createdAt
        updatedAt
        savedMoviesCount
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      username
      email
      password
        savedMovies {
            movieId
            title
            posterPath
            year
            plot
            director
            actors
            genres
            imdbRating
            rated
            runtime
            language
        }
        watchlist
        ratings {
            _id
            userId
            movieId
            score
            review
            createdAt
        }
        reviews {
            _id
            userId
            movieId
            review
            createdAt
        }
        createdAt
        updatedAt
        savedMoviesCount
        
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers($userIds: [String!]!) {
    getUsers(userIds: $userIds) {
      id
      username
      email
      password
        savedMovies {
            movieId
            title
            posterPath
            year
            plot
            director
            actors
            genres
            imdbRating
            rated
            runtime
            language
        }
        watchlist
        ratings {
            _id
            userId
            movieId
            score
            review
            createdAt
        }
        reviews {
            _id
            userId
            movieId
            review
            createdAt
        }
        createdAt
        updatedAt
        
    }
  }
`;
export const QUERY_MOVIE_RATINGS = gql`
    query getMovieRatings($movieId: String!) {
        getMovieRatings(movieId: $movieId) {
        _id
        userId
        movieId
        score
        review
        createdAt
        }
    }
    `;
export const QUERY_MOVIE_REVIEWS = gql`
    query getMovieReviews($movieId: String!) {
        getMovieReviews(movieId: $movieId) {
        _id
        userId
        movieId
        review
        createdAt
        }
    }
    `;
export const QUERY_USER_RATINGS = gql`
    query getUserRatings($userId: String!) {
        getUserRatings(userId: $userId) {
        _id
        userId
        movieId
        score
        review
        createdAt
        }
    }
    `;
export const QUERY_USER_REVIEWS = gql`
    query getUserReviews($userId: String!) {
        getUserReviews(userId: $userId) {
        _id
        userId
        movieId
        review
        createdAt
        }
    }
    `;
export const QUERY_USER_SAVED_MOVIES = gql`
    query getUserSavedMovies($userId: String!) {
        getUserSavedMovies(userId: $userId) {
        movieId
        title
        posterPath
        year
        plot
        director
        actors
        genres
        imdbRating
        rated
        runtime
        language
        }
    }
    `;
export const QUERY_USER_WATCHLIST = gql`
    query getUserWatchlist($userId: String!) {
        getUserWatchlist(userId: $userId) {
        movieId
        title
        posterPath
        year
        plot
        director
        actors
        genres
        imdbRating
        rated
        runtime
        language
        }
    }
    `;
export const QUERY_USER_SAVED_MOVIES_COUNT = gql`
    query getUserSavedMoviesCount($userId: String!) {
        getUserSavedMoviesCount(userId: $userId) {
        savedMoviesCount
        }
    }
    `;
