import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

import movieSchema from "./Movie";
import type { IMovie } from "./Movie";

interface IUser extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  savedMovies: IMovie[];
  watchlist: string[];
  ratings: string[];
  reviews: string[];
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
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

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;