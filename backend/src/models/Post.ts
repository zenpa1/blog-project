import mongoose, { Schema, Document } from "mongoose";  // Makes data modeling easier

// Interface for TypeScript representing a document
export interface IPost {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

// Mongoose Schema corresponding to the interface
const PostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true  // Automatically removes whitespaces
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    }  
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

// Create and export model
export default mongoose.model<IPost>("Post", PostSchema);