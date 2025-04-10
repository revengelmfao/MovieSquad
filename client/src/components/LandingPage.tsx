import { useEffect, useState } from 'react';

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
                const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie`);
                const data = await response.json();
                console.log(data);  
                
                if (data.Response === 'True') {
                    const sortedMovies = data.Search.sort((a: Movie, b: Movie) => {
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
            <div className="flex flex-col items-center mb-4 px-2">
                <h1 className="text-8xl text-center font-bold mb-2 pt-6 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">Movie Squad</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-6 px-2">
                <div className="bg-gradient-to-r from-orange-400 to-red-600 text-black rounded-md text-center w-full lg:w-2/3 flex items-center justify-center py-4">
                    <p className="font-bold lg:text-6xl leading-snug">
                        Discover new movies
                        <br />Create Watch list
                        <br />Collaborate with Movie lovers!
                    </p>
                </div>
            </div>

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
                        <p className="text-xs text-gray-400">IMDb Rating: {movie.imdbRating || 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;