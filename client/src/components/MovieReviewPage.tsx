import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
}

const MovieReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=22f90598`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          console.error('Movie not found');
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading movie details...</p>;

  if (!movie) return <p className="text-center mt-10 text-red-500">Movie not found.</p>;

  return (
    <div className="min-h-screen min-w-screen min-h-screen bg-gray-100 p-6 flex flex-col items-center bg-gradient-to-r from-orange-400 to-red-600 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/default-placeholder.jpg'}
          alt={movie.Title}
          className="w-full max-h-[500px] object-contain rounded-xl"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-600 mb-2 italic">{movie.Genre} | {movie.Runtime} | Rated: {movie.Rated}</p>
          <p className="text-gray-700 mb-4">{movie.Plot}</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewPage;
