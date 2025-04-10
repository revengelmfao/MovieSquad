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
    
    // Use a more forceful type assertion to bypass the type checking
    (req as any).user = data;
    
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};