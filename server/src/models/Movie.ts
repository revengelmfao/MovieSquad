import { Schema, model, Document } from 'mongoose';

interface IMovie extends Document {
    movieId: string;
    title: string;
    posterPath: string;
    description: string;
    releaseDate: string;
    year: number;
    director: string;
    actors: string[];
    genres: string[];
    ratings: string[];
    reviews: string[];
    savedMovies: string[];
    watchlist: string[];

}

const movieSchema = new Schema<IMovie>({
    movieId: { 
        type: String, 
    },
    title: { 
        type: String,
        required: true, 
    },
    posterPath: { 
        type: String, 
    },
    description: { 
        type: String, 
    },
    releaseDate: {
        type: String, 
    },
    year: { 
        type: Number, 
    },
    director: { 
        type: String, 
    },
    actors: [{ 
        type: String, 
    }],
    genres: [{ 
        type: String, 
    }],
    ratings: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Rating' 
    }],
    reviews: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Review' }],
}, 
{
    timestamps: true,
});

const Movie = model<IMovie>('Movie', movieSchema);

// Make sure to export both the schema and the interface properly
export { type IMovie, movieSchema };
export default Movie;