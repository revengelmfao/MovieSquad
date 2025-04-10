import { Request } from 'express';
import { TokenUser } from '../services/auth.js';

// This interface needs to match the TokenUser interface from auth.ts
export interface IJwtPayload {
  username: string;
  email: string;
  _id: string;
  // Add the missing properties to match what's expected
  movies?: string[];
  watchlist?: string[];
  savedMovies?: string[];
}

export interface IUserAuthRequest extends Request {
  user?: IJwtPayload; // Make user optional with ?
}
