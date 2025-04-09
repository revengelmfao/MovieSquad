import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
    `;

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

export const SAVE_MOVIE = gql`
    mutation saveMovie($movieData: MovieInput!) {
        saveMovie(movieData: $movieData) {
            _id
            username
            email
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
        }
    }
`;

export const REMOVE_MOVIE = gql`
    mutation removeMovie($movieId: String!) {
        removeMovie(movieId: $movieId) {
            _id
            username
            email
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
        }
    }
`;

export const ADD_TO_WATCHLIST = gql`
    mutation addToWatchlist($movieId: String!) {
        addToWatchlist(movieId: $movieId) {
            _id
            username
            email
            watchlist
        }
    }
`;

export const REMOVE_FROM_WATCHLIST = gql`
    mutation removeFromWatchlist($movieId: String!) {
        removeFromWatchlist(movieId: $movieId) {
            _id
            username
            email
            watchlist
        }
    }
`;

export const ADD_RATING = gql`
    mutation addRating($movieId: String!, $score: Int!, $review: String!) {
        addRating(movieId: $movieId, score: $score, review: $review) {
            _id
            username
            email
            ratings {
                movieId
                score
                review
            }
        }
    }
`;

export const REMOVE_RATING = gql`
    mutation removeRating($movieId: String!) {
        removeRating(movieId: $movieId) {
            _id
            username
            email
            ratings {
                movieId
                score
                review
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation addReview($movieId: String!, $review: String!) {
        addReview(movieId: $movieId, review: $review) {
            _id
            username
            email
            reviews {
                movieId
                review
            }
        }
    }
`;

export const REMOVE_REVIEW = gql`
    mutation removeReview($movieId: String!) {
        removeReview(movieId: $movieId) {
            _id
            username
            email
            reviews {
                movieId
                review
            }
        }
    }
`;
export const UPDATE_USER = gql`
    mutation updateUser($username: String!, $email: String!) {
        updateUser(username: $username, email: $email) {
            _id
            username
            email
        }
    }
`;

export const UPDATE_RATING = gql`
    mutation updateRating($movieId: String!, $score: Int!, $review: String!) {
        updateRating(movieId: $movieId, score: $score, review: $review) {
            _id
            username
            email
            ratings {
                movieId
                score
                review
            }
        }
    }
`;
export const UPDATE_REVIEW = gql`
    mutation updateReview($movieId: String!, $review: String!) {
        updateReview(movieId: $movieId, review: $review) {
            _id
            username
            email
            reviews {
                movieId
                review
            }
        }
    }
`;
