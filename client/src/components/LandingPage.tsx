import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                console.log(response.data);  
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
            className="min-w-screen flex flex-col bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/backgroundimg.avif)' }} 
        >
            <div className="flex flex-col items-center mb-6 px-4">
                <h1 className="text-4xl sm:text-6xl md:text-8xl text-center font-bold mb-3 pt-8 text-white">Movie Squad</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8 px-4">
                <div className="bg-orange-500 text-black rounded-lg text-center w-full lg:w-2/3 flex items-center justify-center py-8">
                    <p className="font-bold text-3xl sm:text-5xl lg:text-6xl">
                        Discover new movies
                        <br />Create Watch list
                        <br />Collaborate with Movie lovers!
                    </p>
                </div>
                <div className="bg-orange-500 rounded-lg flex flex-1 flex-col justify-center px-4 py-6 h-full">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-8 w-auto"
                        />
                        <h2 className="mt-6 text-center text-lg font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>

                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            <Link to="/forgotpassword">Forgot Password?</Link>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-6 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl sm:text-5xl text-center font-bold mb-4 text-white">Top Rated Movies</h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-lg w-full sm:w-72 md:w-80 lg:w-96">
                        <img
                            src={movie.Poster || '/images/default-poster.jpg'} 
                            alt={movie.Title}
                            className="w-full h-80 object-cover rounded-md"
                        />
                        <h2 className="text-xl text-white mt-4">{movie.Title}</h2>
                        <p className="text-gray-400">IMDb Rating: {movie.imdbRating || 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
