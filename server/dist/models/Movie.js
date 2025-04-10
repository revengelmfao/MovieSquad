import { Schema, model } from 'mongoose';
const movieSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    posterPath: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: [{
            type: String
        }],
    genres: [{
            type: String
        }],
    imdbRating: {
        type: String
    },
    rated: {
        type: String
    },
    runtime: {
        type: String
    },
    language: {
        type: String
    },
    ratings: [{
            type: Schema.Types.ObjectId,
            ref: 'Rating'
        }],
    reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
});
const Movie = model('Movie', movieSchema);
export { movieSchema };
export default Movie;
