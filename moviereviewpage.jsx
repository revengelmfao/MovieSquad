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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Movie Reviews</h1>
      <div className="grid gap-6">
        {reviews.map((movie) => (
          <div key={movie.id} className="rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-2">{movie.description}</p>
            <p className="text-yellow-500 font-medium">Rating: {movie.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
}
