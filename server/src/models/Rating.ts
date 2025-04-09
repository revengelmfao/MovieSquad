import { Schema, model, type Document } from 'mongoose';

interface IRating extends Document {
    userId: string;
    movieId: string;
    score: number;
    review: string;
    createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
    // Remove _id as MongoDB will generate it automatically
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    score: { type: Number, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;