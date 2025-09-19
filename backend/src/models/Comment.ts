import mongoose, { Schema, Document, Types } from "mongoose";  // Makes data modeling easier

// Interface for TypeScript representing a document
export interface IComment {
    content: string;
    author: string;
    postId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Mongoose Schema corresponding to the interface
const CommentSchema: Schema = new Schema ({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true  // Automatically removes whitespaces
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",  // Creates reference to Post model
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

// Create and export model
export default mongoose.model<IComment>("Comment", CommentSchema);