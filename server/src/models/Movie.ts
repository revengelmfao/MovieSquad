import { Schema, type Document } from 'mongoose';

export interface IMovie extends Document {
    movieId: string;
    title: string;
    posterPath: string;
    year: number;
    plot: string;
    director: string;
    actors: string[];
    genres: string[];
    ratings: string[];
    reviews: string[];
}

const movieSchema = new Schema<IMovie>({
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, required: true },
    year: { type: Number, required: true },
    plot: { type: String, required: true },
    director: { type: String, required: true },
    actors: [{ type: String, required: true }],
    genres: [{ type: String, required: true }],
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
    timestamps: true,
});

export default movieSchema;