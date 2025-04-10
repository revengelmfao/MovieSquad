import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { TokenUser } from '../services/auth.js';

// Update this interface to match what's expected in your application
export interface IJwtPayload {
  _id: string; 
  username: string;
  email: string;
  // Make these non-optional since they're expected as required
  movies: string[];
  watchlist: string[];
  savedMovies: string[];
}

// Update the interface with correct types
export interface IUserAuthRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  user: IJwtPayload;
}
