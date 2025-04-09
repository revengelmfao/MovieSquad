declare namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
        movies: string[];
        watchlist: string[];
        savedMovies: string[]; 
      };
    }
  }
    // This is a custom type declaration for the Express Request object 
    // adding a user property to it.  