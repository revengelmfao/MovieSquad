import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { movieSchema } from "./Movie.js";
const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedMovies: [movieSchema],
    watchlist: [{ type: String }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// Rename comparePassword to isCorrectPassword to match interface
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.virtual("savedMoviesCount").get(function () {
    return this.savedMovies.length;
});
const User = model("User", userSchema);
export default User;
