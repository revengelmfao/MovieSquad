import type { Movie } from './Movie.js';

export interface User {
    userId: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    savedMovies: Movie[];
    }