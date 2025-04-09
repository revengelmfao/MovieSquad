import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
    interface Movie {
        imdbID: string;
        Title: string;
        Poster: string;
        imdbRating: string;
    }

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            const apiKey = '22f90598';
            try {
                const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie`);
                if (response.data.Response === 'True') {
                    const sortedMovies = response.data.Search.sort((a: Movie, b: Movie) => {
                        return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
                    });
                    setMovies(sortedMovies);
                } else {
                    console.error('No movies found or error in the response');
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchTopRatedMovies();
    }, []);

    return (
        <div
<<<<<<< HEAD
            className="min-w-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/backgroundimg.avif)' }}
        >
            <div className="flex flex-col items-center mb-4 px-2">
                <h1 className="text-8xl text-center font-bold mb-2 pt-6 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                    Movie Squad
                </h1>

            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-6 px-2">
                <div className="bg-gradient-to-r from-orange-400 to-red-600 text-black rounded-md text-center w-full lg:w-2/3 flex items-center justify-center py-4">
                    <p className="font-bold lg:text-6xl leading-snug">
                        Discover new movies
                        <br />Create Watch list
                        <br />Collaborate with Movie lovers!
                    </p>
                </div>
                <div className="bg-gradient-to-r from-red-600 to-orange-400 rounded-md flex flex-1 flex-col justify-center px-3 py-4">
                    <div className="sm:mx-auto sm:w-full sm:max-w-xs">
                        <h2 className="mt-4 text-center text-lg font-bold text-gray-900">
                            Sign in to your account
                        </h2>

                        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xs">
                            <form action="#" method="POST" className="space-y-3">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-xs font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full rounded-md bg-white px-2 py-1 text-sm text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                    />
                                    <div className="mt-1 text-right">
                                        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
=======
            className=" min-h-screen min-w-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/backgroundimg.avif)' }}
        >
            <div className="flex flex-col items-center mb-3 px-1">
                <h1 className="text-lg sm:text-4xl md:text-6xl text-center font-bold mb-2 pt-4 text-white">Movie Squad</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-5 px-1">
                <div className="bg-orange-500 text-black rounded-md text-center w-full lg:w-2/3 flex items-center justify-center py-2 px-1">
                    <p className="font-bold text-3xl sm:text-5xl lg:text-6xl">
                        Discover New Movies
                        <br />Create Watch Lists
                        <br />Collaborate With Movie Lovers!
                    </p>
                </div>

                <div className="bg-orange-500 rounded-md flex flex-1 flex-col justify-center px-2 py-3">
                    <div className="sm:mx-auto sm:w-full sm:max-w-xs">
                        <h2 className="mt-3 text-center text-lg font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                        <form action="#" method="POST" className="space-y-2 mt-3">
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="mt-1 block w-full rounded-md bg-white px-1 py-1 text-xs text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="mt-1 block w-full rounded-md bg-white px-1 py-1 text-xs text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                <div className="text-xs text-right mt-1">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
                                </div>
                            </div>

<<<<<<< HEAD
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
                                >
                                    Sign in
                                </button>
                            </form>

                            <p className="mt-4 text-center text-xs text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Sign Up!
                                </a>
                            </p>
                        </div>
=======
                            <button
                                type="submit"
                                className="w-full justify-center rounded-md bg-indigo-600 px-1 py-1 text-xs font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="mt-3 text-center text-xs text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Sign Up!
                            </a>
                        </p>
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            <h1 className="text-2xl sm:text-3xl text-center font-bold mb-3 text-white">Top Rated Movies</h1>

            <div className="flex flex-wrap justify-center gap-3 mb-6 px-2">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="bg-gray-800 p-3 rounded-md w-40 sm:w-56 md:w-64">
                        <img
                            src={movie.Poster || '/images/default-poster.jpg'}
                            alt={movie.Title}
                            className="w-full h-48 object-cover rounded-sm"
                        />
                        <h2 className="text-base text-white mt-2">{movie.Title}</h2>
=======
            <h1 className="text-xl sm:text-2xl text-center font-bold mb-2 text-white">Top Rated Movies</h1>

            <div className="flex flex-wrap justify-center gap-2 mb-5 px-1">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="bg-gray-800 p-2 rounded-md w-full sm:w-48 md:w-56">
                        <img
                            src={movie.Poster || '/images/default-poster.jpg'}
                            alt={movie.Title}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-sm text-white mt-2">{movie.Title}</h2>
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
                        <p className="text-xs text-gray-400">IMDb Rating: {movie.imdbRating || 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;