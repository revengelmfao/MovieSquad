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
    reviews: Schema.Types.ObjectId[]; // Array of review IDs, references to Review model
    averageRating: number; // Virtual property for average rating
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
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, {
    toJSON: { virtuals: true },
    timestamps: true,
});

movieSchema.virtual('averageRating').get(function (this: IMovie) {
    if (this.reviews.length === 0) return 0;
    const totalRating = this.reviews.reduce((acc, review: any) => {
        const rating = review?.rating?.score || 0; // Assuming review has a rating property
        return acc + rating;
    }, 0);
    return totalRating / this.reviews.length;
}
);

export default movieSchema;