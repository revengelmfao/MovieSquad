import React, { useState } from "react";

const moviesData = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    rating: 4.5
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of his reality.",
    rating: 5
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team travels through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 4.7
  }
];

export default function MovieReviewPage() {
  const [reviews, setReviews] = useState(moviesData);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-sm">🎬 Movie Reviews</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl shadow-xl p-6 border border-gray-100 bg-white hover:shadow-2xl transition-all duration-300"
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
    </div>
  );
}
