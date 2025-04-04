import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

import movieSchema from "./Movie";
import type { IMovie } from "./Movie";

interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  friends: string[]; // Array of friend IDs, references to User model
  savedMovies: IMovie[]; // Array of saved movies
  watchlist: IMovie[]; // Array of watchlist movies
  ratings: string[]; // Array of ratings
  reviews: string[]; // Array of reviews
  createdAt: Schema.Types.Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: String, ref: "User" }], // Array of friend IDs
  savedMovies: [movieSchema], // Array of saved movies
  watchlist: [movieSchema],
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

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;