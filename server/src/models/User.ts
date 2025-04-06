import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

// Fix the import extension
import Movie, { movieSchema, type IMovie } from "./Movie.js";

interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  // Now this will correctly use the imported movieSchema
  savedMovies: IMovie[];
  watchlist: string[];
  ratings: string[];
  reviews: string[];
  createdAt: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  savedMoviesCount: number;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Use the properly imported movieSchema here
  savedMovies: [movieSchema],
  watchlist: [{ type: String }],
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
},
{
    timestamps: true,
    toJSON: { virtuals: true },
}
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Change method name to match what's being used in resolvers
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `savedMoviesCount` with the number of saved movies we have
userSchema.virtual("savedMoviesCount").get(function (this: IUser) {
  return this.savedMovies.length;
});

const User = model<IUser>("User", userSchema);

export default User;