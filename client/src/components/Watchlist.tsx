import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { ADD_TO_WATCHLIST } from "../utils/mutations";
import { REMOVE_FROM_WATCHLIST } from "../utils/mutations";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const WatchlistPage: React.FC = () => {
  const [addToWatchlistMutation] = useMutation(ADD_TO_WATCHLIST);
  const [removeFromWatchlistMutation] = useMutation(REMOVE_FROM_WATCHLIST);

  const { watchlistName } = useParams<{ watchlistName: string }>();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isListView, setIsListView] = useState<boolean>(false);

  useEffect(() => {

    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
      setIsListView(savedViewMode === 'list');
    }

    const savedWatchlists = localStorage.getItem('watchlist');
    if (savedWatchlists) {
      const watchlist: string[] = JSON.parse(savedWatchlists);
      if (watchlist.includes(watchlistName || "")) {
        const storedMovies: Movie[] = JSON.parse(
          localStorage.getItem(watchlistName || "") || "[]"
        );
        setMovies(storedMovies);
      } else {
        alert("This watchlist doesn't exist.");
      }
    }
  }, [watchlistName]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${e.target.value}&apikey=22f90598`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (movie: Movie) => {
    if (!movies.some(existingMovie => existingMovie.imdbID === movie.imdbID)) {

      try {
        // Call GraphQL mutation to persist on backend
        await addToWatchlistMutation({
          variables: {
            movieId: movie.imdbID, // adjust according to your schema
            // optionally: listName: watchlistName if your schema supports named lists
          },
        });
  
        const updatedMovies = [...movies, movie];
        setMovies(updatedMovies);
        setSelectedMovie(movie);
        setSearch('');
  
        // Optional: localStorage sync for offline fallback
        localStorage.setItem(watchlistName || '', JSON.stringify(updatedMovies));
      } catch (error) {
        console.error('Error adding to watchlist:', error);
    } else {
      alert('This movie is already in your watchlist.');
    }
  };
  


  const handleRemoveFromWatchlist = async (imdbID: string) => {
    try {
      await removeFromWatchlistMutation({
        variables: {
          movieId: imdbID,
        },
      });
  
      const updatedMovies = movies.filter(movie => movie.imdbID !== imdbID);
      setMovies(updatedMovies);
  
      localStorage.setItem(watchlistName || '', JSON.stringify(updatedMovies));
      window.location.reload();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };
  

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  const toggleView = () => {
    const newView = !isListView;
    setIsListView(newView);
    localStorage.setItem('viewMode', newView ? 'list' : 'grid');
  };

  return (

    <div className="min-h-screen min-w-screen bg-gradient-to-r from-orange-400 to-red-600 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Watchlist: {watchlistName}
      </h1>

      <button
        onClick={handleBackToProfile}
        className="mb-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
      >
        Go Back to Watchlists
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Search for Movies to Add
        </h2>
        <h2 className="text-3xl font-semibold text-black mb-2">Search for Movies to Add</h2>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-black-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-white-500 mb-4 bg-white"
        />

        {loading && <p className="text-white">Loading search results...</p>}

        {searchResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                className={`cursor-pointer bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition ${
                  selectedMovie && selectedMovie.imdbID === movie.imdbID
                    ? "bg-green-100"
                    : ""
                }`}
                onClick={() => handleAddToWatchlist(movie)}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/default-placeholder.jpg"
                  }
                  alt={movie.Title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h3 className="text-sm font-semibold text-center">
                  {movie.Title}
                </h3>
                <p className="text-xs text-center text-gray-600">
                  {movie.Year}
                </p>
                {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                  <span className="block text-center text-green-500 mt-2">
                    Selected!
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={toggleView}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 ring-grey"
        >
          Toggle to {isListView ? "Grid" : "List"} View
        </button>
      </div>

      {movies.length === 0 ? (

        <p className="text-center text-gray-500">
          No movies in this watchlist yet. Add some movies!
        </p>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-black mb-4">
            Movies in your Watchlist
          </h2>
          
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
                  <h3 className="text-sm font-semibold text-center">
                    {movie.Title}
                  </h3>
                  <p className="text-xs text-center text-gray-600">
                    {movie.Year}
                  </p>

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
