// Utility to transform OMDB API data to match our model schema

interface OmdbMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  [key: string]: any; // Allow any other OMDB fields
}

interface TransformedMovie {
  movieId: string;
  title: string;
  posterPath: string;
  plot: string;
  releaseDate: string;
  year: number;
  director: string;
  actors: string[];
  genres: string[];
  imdbRating: string;
  rated: string;
  runtime: string;
  language: string;
}

export const transformOmdbData = (omdbData: OmdbMovie): TransformedMovie => {
  return {
    movieId: omdbData.imdbID,
    title: omdbData.Title,
    posterPath: omdbData.Poster,
    plot: omdbData.Plot,
    releaseDate: omdbData.Released,
    year: parseInt(omdbData.Year),
    director: omdbData.Director,
    actors: omdbData.Actors.split(', '),
    genres: omdbData.Genre.split(', '),
    imdbRating: omdbData.imdbRating,
    rated: omdbData.Rated,
    runtime: omdbData.Runtime,
    language: omdbData.Language
  };
};