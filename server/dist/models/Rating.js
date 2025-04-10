import { Schema, model } from 'mongoose';
const ratingSchema = new Schema({
    // Remove _id as MongoDB will generate it automatically
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    score: { type: Number, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});
const Rating = model('Rating', ratingSchema);
export default Rating;
