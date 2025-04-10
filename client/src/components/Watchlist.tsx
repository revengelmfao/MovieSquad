import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const WatchlistPage: React.FC = () => {
  const { watchlistName } = useParams<{ watchlistName: string }>();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isListView, setIsListView] = useState<boolean>(false); // State for toggling views

  useEffect(() => {
    const savedWatchlists = localStorage.getItem('watchlist');
    if (savedWatchlists) {
      const watchlist: string[] = JSON.parse(savedWatchlists);
      if (watchlist.includes(watchlistName || '')) {
        const storedMovies: Movie[] = JSON.parse(localStorage.getItem(watchlistName || '') || '[]');
        setMovies(storedMovies);
      } else {
        alert("This watchlist doesn't exist.");
      }
    }
  }, [watchlistName]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${e.target.value}&apikey=22f90598`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = (movie: Movie) => {
    if (!movies.some(existingMovie => existingMovie.imdbID === movie.imdbID)) {
      const updatedMovies = [...movies, movie];
      setMovies(updatedMovies);
      setSelectedMovie(movie);
      setSearch('');

      localStorage.setItem(watchlistName || '', JSON.stringify(updatedMovies));

      window.location.reload();
    } else {
      alert('This movie is already in your watchlist.');
    }
  };

  const handleRemoveFromWatchlist = (imdbID: string) => {
    const updatedMovies = movies.filter(movie => movie.imdbID !== imdbID);
    setMovies(updatedMovies);

    localStorage.setItem(watchlistName || '', JSON.stringify(updatedMovies));

    window.location.reload();
  };

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  // Handle the navigation back to the Profile page
  const handleBackToProfile = () => {
    navigate('/profile');
  };

  // Toggle between list and grid views
  const toggleView = () => {
    setIsListView(!isListView);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Watchlist: {watchlistName}</h1>

      {/* Button to go back to Profile page */}
      <button
        onClick={handleBackToProfile}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
      >
        Watchlists
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Search for Movies to Add</h2>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {loading && <p>Loading search results...</p>}

        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                className={`cursor-pointer bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition ${
                  selectedMovie && selectedMovie.imdbID === movie.imdbID ? 'bg-green-100' : ''
                }`}
                onClick={() => handleAddToWatchlist(movie)}
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/default-placeholder.jpg'}
                  alt={movie.Title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-sm font-semibold text-center">{movie.Title}</h3>
                <p className="text-xs text-center text-gray-600">{movie.Year}</p>
                {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                  <span className="block text-center text-green-500 mt-2">Selected!</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toggle between List and Grid Views */}
      <div className="mb-6 text-center">
        <button
          onClick={toggleView}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Toggle to {isListView ? 'Grid' : 'List'} View
        </button>
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies in this watchlist yet. Add some movies!</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Movies in your Watchlist</h2>
          {isListView ? (
            <ul className="space-y-4">
              {movies.map((movie) => (
                <li
                  key={movie.imdbID}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-20 h-30 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{movie.Title}</h3>
                      <p className="text-sm text-gray-600">{movie.Year}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWatchlist(movie.imdbID)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="cursor-pointer bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-sm font-semibold text-center">{movie.Title}</h3>
                  <p className="text-xs text-center text-gray-600">{movie.Year}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWatchlist(movie.imdbID);
                    }}
                    className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;