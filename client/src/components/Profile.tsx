import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const Profile: React.FC = () => {
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<any[]>([]); // Add state for saved movies
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [savedMoviesOpen, setSavedMoviesOpen] = useState(false); // Toggle for saved movies dropdown
  

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const { loading, error, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (data?.me?.watchlist) {
      setWatchlist(data.me.watchlist);
    }
    
    // Set saved movies from query data
    if (data?.me?.savedMovies) {
      setSavedMovies(data.me.savedMovies);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  const handleWatchlistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddToWatchlist = () => {
    const trimmed = search.trim();
    if (trimmed !== "" && !watchlist.includes(trimmed)) {
      setWatchlist((prev) => [...prev, trimmed]);
      setSearch("");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSavedMovies = () => {
    setSavedMoviesOpen(!savedMoviesOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile Page</h1>

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Create A Watchlist
        </h2>

        <input
          type="text"
          placeholder="Give your watchlist a name!"
          value={search}
          onChange={handleWatchlistName}
          onKeyDown={(e) => e.key === "Enter" && handleAddToWatchlist()}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToWatchlist}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
          >
            Add to Watchlist
          </button>
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="relative w-full max-w-xl mb-6">
        <button
          onClick={toggleDropdown}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-xl text-left font-semibold hover:bg-gray-700 transition"
        >
          Created Watchlists
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {watchlist.length === 0 ? (
              <li className="px-4 py-2 text-gray-500 italic">
                No items added yet
              </li>
            ) : (
              watchlist.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none"
                >
                  {/* Link to watchlist page */}
                  <Link
                    to={`/watchlist/${item}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Saved Movies Section */}
      <div className="relative w-full max-w-xl">
        <button
          onClick={toggleSavedMovies}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-xl text-left font-semibold hover:bg-gray-700 transition"
        >
          Saved Movies ({savedMovies.length})
        </button>

        {savedMoviesOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {savedMovies.length === 0 ? (
              <li className="px-4 py-2 text-gray-500 italic">
                No movies saved yet
              </li>
            ) : (
              savedMovies.map((movie, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none flex items-center"
                >
                  {movie.posterPath && (
                    <img 
                      src={movie.posterPath} 
                      alt={movie.title} 
                      className="w-10 h-14 object-cover mr-2"
                    />
                  )}
                  <div>
                    <Link
                      to={`/movie/${movie.movieId}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {movie.title} ({movie.year})
                    </Link>
                    <p className="text-sm text-gray-500">{movie.director}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;