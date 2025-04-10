export interface OMBDApiMovie {
    // Core movie identifiers
    imdbID: string;     // Maps to movieId in our system
    Title: string;      // Maps to title in our system
    Poster: string;     // Maps to posterPath in our system
    
    // Movie details
    Plot: string;       // Movie description
    Year: string;       // Release year (as string, needs conversion to number)
    Released: string;   // Full release date
    Director: string;   // Film director
    Actors: string;     // Comma-separated string of actors (needs parsing)
    Genre: string;      // Comma-separated string of genres (needs parsing)
    
    // Ratings and metadata
    imdbRating: string; // IMDB rating as string
    Rated: string;      // Movie rating (PG, PG-13, R, etc)
    Runtime: string;    // Movie duration
    Language: string;   // Movie language
    Country: string;    // Production country
    
    // Response metadata
    Response: string;   // "True" or "False" string from OMDB
    Error?: string;     // Error message if Response is "False"
}

/**
 * Converts OMDB API movie format to our internal Movie format
 * Use this to transform data before saving to database or state
 */
export function convertOMBDToMovie(omdbMovie: OMBDApiMovie) {
    return {
        movieId: omdbMovie.imdbID,
        title: omdbMovie.Title,
        posterPath: omdbMovie.Poster,
        plot: omdbMovie.Plot,
        releaseDate: omdbMovie.Released,
        year: parseInt(omdbMovie.Year), // Convert string to number
        director: omdbMovie.Director,
        actors: omdbMovie.Actors?.split(',').map(actor => actor.trim()) || [],
        genres: omdbMovie.Genre?.split(',').map(genre => genre.trim()) || [],
        imdbRating: omdbMovie.imdbRating,
        rated: omdbMovie.Rated,
        runtime: omdbMovie.Runtime,
        language: omdbMovie.Language
    };
}

/**
 * Helper function to fetch a movie from OMDB API
 * @param id - IMDB ID 
 * @param apiKey - Your OMDB API key
 */
export async function fetchMovieById(id: string, apiKey: string = '22f90598') {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            return data as OMBDApiMovie;
        } else {
            throw new Error(data.Error || 'Failed to fetch movie');
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
}

/**
 * Helper function to search for movies from OMDB API
 * @param query - Search term
 * @param apiKey - Your OMDB API key
 */
export async function searchMovies(query: string, apiKey: string = '22f90598') {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            return data.Search as Partial<OMBDApiMovie>[];
        } else {
            throw new Error(data.Error || 'No movies found');
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

