import type { IMovie } from '../models/Movie.js';
import { Document } from "mongoose";

export default interface IUserDocument extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  // Add other properties as needed
  isCorrectPassword(password: string): Promise<boolean>;
}
