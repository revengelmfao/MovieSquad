import { Schema, model, type Document } from 'mongoose';

export interface IReview extends Document {
    userId: number;     // Changed from user to userId to match resolvers
    movieId: string;    // Changed from movie to movieId to match resolvers
    review: string;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    // Remove _id as MongoDB will generate it automatically
    userId: { type: Number, required: true },
    movieId: { type: String, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;