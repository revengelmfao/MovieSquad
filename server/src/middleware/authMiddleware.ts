import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenUser } from '../services/auth.js'; // Fix import

const secret = process.env.JWT_SECRET || 'secretkey';

// Authentication middleware for REST API routes
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1] || '';
  
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  
  try {
    // Verify token
    const { data } = jwt.verify(token, secret) as { data: TokenUser };
    
    // Fix: Don't try to access properties that don't exist in TokenUser
    // Instead, only attach what's available in the token
    (req as any).user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      // Provide default empty arrays instead of trying to access non-existent properties
      movies: [],
      watchlist: [],
      savedMovies: []
    };
    
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};