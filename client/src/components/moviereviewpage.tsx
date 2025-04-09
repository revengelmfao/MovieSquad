import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MOVIE_REVIEWS } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";
import { REMOVE_REVIEW } from "../utils/mutations";

const moviesData = [
  {
    id: 1,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    rating: 4.5,
  },
  {
    id: 2,
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of his reality.",
    rating: 5,
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team travels through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 4.7,
  },
];

export default function MovieReviewPage() {
  const [addReview] = useMutation(ADD_REVIEW);
  const [removeReview] = useMutation(REMOVE_REVIEW);
  const [reviewText, setReviewText] = useState<{ [key: number]: string }>({});
  const [reviews, setReviews] = useState(moviesData);

  const { loading, error, data } = useQuery(QUERY_MOVIE_REVIEWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    setReviews(data.movieReviews);
  }

  const handleReviewChange = (id: number, value: string) => {
    setReviewText({ ...reviewText, [id]: value });
  };

  const handleAddReview = async (id: number) => {
    try {
      const { data } = await addReview({
        variables: { movieId: id, review: reviewText[id] },
      });
      setReviews([...reviews, data.addReview]);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleRemoveReview = async (id: number) => {
    try {
      await removeReview({ variables: { movieId: id } });
      setReviews(reviews.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-sm">
        🎬 Movie Reviews
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((movie) => (
          <div
            key={movie.id}
            className="rounded-2xl shadow-xl p-6 border border-gray-100 bg-white hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-indigo-600">
              {movie.title}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {movie.description}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-800 font-medium">
                {movie.rating} / 5
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
