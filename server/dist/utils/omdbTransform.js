// Utility to transform OMDB API data to match our model schema
export const transformOmdbData = (omdbData) => {
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
