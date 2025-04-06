declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
    // This is a custom type declaration for the Express Request object 
    // adding a user property to it.  