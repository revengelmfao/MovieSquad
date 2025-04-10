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