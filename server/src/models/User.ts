import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";
import Movie, { movieSchema, type IMovie } from "./Movie.js";

interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  savedMovies: IMovie[];
  watchlist: string[];
  ratings: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  createdAt: Date;
  isCorrectPassword(password: string): Promise<boolean>;
  savedMoviesCount: number;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

// Rename comparePassword to isCorrectPassword to match interface
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("savedMoviesCount").get(function (this: IUser) {
  return this.savedMovies.length;
});

const User = model<IUser>("User", userSchema);

export default User;