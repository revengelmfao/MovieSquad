import React, { useState } from "react";

const moviesData = [
  {
    id: 1,
    title: "Inception",
    description: "Inception, a 2010 science fiction action thriller directed by Christopher Nolan, follows a professional thief, Dom Cobb, who steals information by infiltrating the subconscious through shared dream states, but is then tasked with the reverse: planting an idea into a target's mind",
    rating: 4.5,
    review: "Truly in awe at how amazing this movie is, an astounding show of all aspects of films.It's a heist film, a tragic romance, science-fiction, and an action film. But the best thing is it uses all of these ingredients flawlessly."
  },
  {
    id: 2,
    title: "The Matrix",
    description: "The Matrix, is a 1999 science fiction action film where a hacker, Neo, discovers the reality he lives in is a simulated world, the Matrix, created by machines to control humanity, and he must join a rebellion to fight for freedom",
    rating: 5,
    review: "The Matrix is a visually dazzling cyberadventure, full of kinetic excitement, but it retreats to formula just when it's getting interesting."
  },
  {
    id: 3,
    title: "Interstellar",
    description: "Interstellar, is a 2014 science fiction epic directed by Christopher Nolan, following a crew of astronauts who embark on a perilous journey through a wormhole to find a new home for humanity after Earth becomes uninhabitable due to environmental disasters. ",
    rating: 4.7,
    review: "Watching Interstellar was nothing short of an extraordinary journey that left me in awe long after the credits rolled. Directed by Christopher Nolan, this film transcends the boundaries of conventional cinema, taking us on a profound voyage through space and time that is as visually stunning as it is intellectually stimulating."
  }
];

export default function MovieReviewPage() {
  const [reviews, setReviews] = useState(moviesData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState("");
  const [message, setMessage] = useState("");

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setNewRating(movie.rating);
    setNewReview(movie.review || "");
    setMessage("");
  };

  const handleSubmitReview = () => {
    if (!selectedMovie) return;
    const updatedReviews = reviews.map((movie) =>
      movie.id === selectedMovie.id
        ? { ...movie, rating: newRating, review: newReview }
        : movie
    );
    setReviews(updatedReviews);
    setSelectedMovie({ ...selectedMovie, rating: newRating, review: newReview });
    setMessage("Review submitted successfully!");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-sm">🎬 Movie Reviews</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {reviews.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleSelectMovie(movie)}
            className="cursor-pointer rounded-2xl shadow-xl p-6 border border-gray-100 bg-white hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-indigo-600">{movie.title}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{movie.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-800 font-medium">{movie.rating} / 5</span>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Review: {selectedMovie.title}</h2>
          <p className="text-gray-700 mb-4">{selectedMovie.description}</p>

          {selectedMovie.review && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Existing Review:</h3>
              <p className="text-gray-700 italic">{selectedMovie.review}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 font-medium">Rating (1–5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Your Review:</label>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows="4"
              className="w-full p-2 border rounded-lg"
            ></textarea>
          </div>

          <button
            onClick={handleSubmitReview}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit Review
          </button>

          {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
        </div>
      )}
    </div>
  );
}