import { Schema, Types, model, Document } from 'mongoose';

export interface IMovie extends Document {
    movieId: string;      // Can use imdbID from OMDB
    title: string;        // Maps to OMDB "Title"
    posterPath: string;   // Maps to OMDB "Poster"
    plot: string;         // Maps to OMDB "Plot"
    releaseDate: string;  // Maps to OMDB "Released"
    year: number;         // Maps to OMDB "Year" (convert from string to number)
    director: string;     // Maps to OMDB "Director"
    actors: string[];     // Needs parsing from OMDB "Actors" (comma-separated string)
    genres: string[];     // Needs parsing from OMDB "Genre" (comma-separated string)
    imdbRating: string;   // New - from OMDB
    rated: string;        // New - from OMDB "Rated"
    runtime: string;      // New - from OMDB "Runtime"
    language: string;     // New - from OMDB "Language"
    ratings: Types.ObjectId[];  // Your app's user ratings
    reviews: Types.ObjectId[];  // Your app's user reviews
}

const movieSchema = new Schema<IMovie>({
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
}, 
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
});

const Movie = model<IMovie>('Movie', movieSchema);

export { movieSchema };
export default Movie;