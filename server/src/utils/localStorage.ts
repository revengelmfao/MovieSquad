/**
 * Movie-focused localStorage utility functions
 * These functions handle saving, retrieving, and managing movie IDs and authentication tokens
 */

// Get saved movie IDs from localStorage
export const getSavedMovieIds = (): string[] => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies')!)
    : [];
  return savedMovieIds;
};

// Save movie IDs to localStorage
export const saveMovieIds = (movieIdArr: string[]): void => {
  if (movieIdArr.length) {
    localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

// Remove a movie ID from localStorage
export const removeMovieId = (movieId: string): boolean => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies')!)
    : null;
  
  if (!savedMovieIds) {
    return false;
  }
  
  const updatedSavedMovieIds = savedMovieIds.filter((id: string) => id !== movieId);
  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));
  
  return true;
};

// Get watchlist movie IDs from localStorage
export const getWatchlistMovieIds = (): string[] => {
  const watchlistMovieIds = localStorage.getItem('watchlist_movies')
    ? JSON.parse(localStorage.getItem('watchlist_movies')!)
    : [];
  return watchlistMovieIds;
};

// Save watchlist movie IDs to localStorage
export const saveWatchlistMovieIds = (movieIdArr: string[]): void => {
  if (movieIdArr.length) {
    localStorage.setItem('watchlist_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('watchlist_movies');
  }
};

// Add a movie ID to watchlist in localStorage
export const addMovieToWatchlist = (movieId: string): void => {
  const watchlistMovieIds = getWatchlistMovieIds();
  if (!watchlistMovieIds.includes(movieId)) {
    saveWatchlistMovieIds([...watchlistMovieIds, movieId]);
  }
};

// Remove a movie ID from watchlist in localStorage
export const removeMovieFromWatchlist = (movieId: string): boolean => {
  const watchlistMovieIds = getWatchlistMovieIds();
  
  if (!watchlistMovieIds.length) {
    return false;
  }
  
  const updatedWatchlistMovieIds = watchlistMovieIds.filter(id => id !== movieId);
  saveWatchlistMovieIds(updatedWatchlistMovieIds);
  
  return true;
};

// JWT token management
export const getAuthToken = (): string | null => {
  return localStorage.getItem('id_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('id_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('id_token');
};
