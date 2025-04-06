import { Schema, model, type Document } from 'mongoose';

interface IPost {
    user: string; // User ID
    text: string;
    createdAt?: Date;
}

interface IDiscussionThread extends Document {
    threadId: string;
    user: Schema.Types.ObjectId; // User ID
    movie: string; // Movie ID
    title: string;
    posts?: IPost[]; // Array of posts
    createdAt?: Date;
}

const postSchema = new Schema<IPost>({
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const discussionThreadSchema = new Schema<IDiscussionThread>({
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

const DiscussionThread = model<IDiscussionThread>('DiscussionThread', discussionThreadSchema);
export default DiscussionThread;