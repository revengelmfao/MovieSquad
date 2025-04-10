import type { IMovie } from '../models/Movie.js';
export default interface IUserDocument {
  username: string | null;
  email: string | null;
  password: string | null;
  savedMovie: IMovie[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number | null;
}
