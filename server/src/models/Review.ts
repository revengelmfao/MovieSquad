import { Schema, model, type Document } from 'mongoose';

export interface IReview extends Document {
    _id: string;
    user: string; // User ID
    movie: string; // Movie ID
    review: string;
}

const reviewSchema = new Schema<IReview>({
    _id: { type: String, required: true },
    user: { type: String, required: true },
    movie: { type: String, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;