import { Schema, model, type Document } from 'mongoose';

interface IRating extends Document {
    _id: string;
    userId: string;
    movieId: string;
    score: number;
    review: string;
    createdAt: Date;
}

const ratingSchema = new Schema<IRating>({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    score: { type: Number, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;