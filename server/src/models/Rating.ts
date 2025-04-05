import { Schema, model, type Document } from 'mongoose';

interface IRating extends Document {
    ratingId: string;
    userId: Schema.Types.ObjectId; // Reference to a user document
    movieId: string; // Movie ID
    score: number;
    review?: Schema.Types.ObjectId; // Reference to a review document
    createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
    ratingId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a user document
    movieId: { type: String, required: true },
    score: { type: Number, required: true },
    review: { type: Schema.Types.ObjectId, ref: 'Review', required: false }, // Reference to a review document
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
});

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;