import mongoose, { Schema, Document } from "mongoose";  // Makes data modeling easier

// Interface for TypeScript representing a document
export interface IPost {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    // Note: Virtual populating comments instead of storing directly
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
    timestamps: true,  // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true }  // Include virtuals when converting to JSON
});

// Virtual does not store data in MongoDB (populate comments when querying posts)
PostSchema.virtual("comments", {
    ref: "Comment",  // Reference Comment model
    localField: "_id",  // Field in Post model
    foreignField: "postId",  // Field in comment model
    justOne: false  // Set to false to get an array of elements
})

// Create and export model
export default mongoose.model<IPost>("Post", PostSchema);