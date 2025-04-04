import { Schema, model, type Document } from 'mongoose';

export interface IComment {
    user: string; // User ID
    text: string;
    createdAt?: Date;
}

export interface IReview extends Document {
    reviewId: string;
    user: Schema.Types.ObjectId; // User ID
    movie: string; // Movie ID
    reviewText: string;
    rating?: Schema.Types.ObjectId; // Reference to a rating document
    comments?: IComment[]; // Array of comments
    createdAt?: Date;
}

const commentSchema = new Schema<IComment>({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new Schema<IReview>({
    reviewId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a user document
    movie: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Schema.Types.ObjectId, ref: 'Rating', required: false }, // Reference to a rating document
    comments: [commentSchema], // Array of comments
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;