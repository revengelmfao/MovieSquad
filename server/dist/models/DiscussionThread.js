import { Schema, model } from 'mongoose';
const postSchema = new Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const discussionThreadSchema = new Schema({
    threadId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to a user document
    movie: { type: String, required: true },
    title: { type: String, required: true },
    posts: [postSchema], // Array of posts
    createdAt: { type: Date, default: Date.now },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
});
const DiscussionThread = model('DiscussionThread', discussionThreadSchema);
export default DiscussionThread;
