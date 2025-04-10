import { Schema, model } from 'mongoose';
const reviewSchema = new Schema({
    // Remove _id as MongoDB will generate it automatically
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    review: { type: String, required: true },
}, {
    timestamps: true,
});
const Review = model('Review', reviewSchema);
export default Review;
