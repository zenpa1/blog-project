import express, { Request, Response, Router } from "express";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const router: Router = express.Router();

// GET /comments/post/:postId (Retrieve all comments for a specific post)
router.get("/post/:postId", async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });  // Newest comment first
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve comments. "});
    }
});

// POST /comments (Create a new comment)
router.post("/", async (req: Request, res: Response) => {
    try {
        const { postId, content, author } = req.body;

        if (!postId || !content || !author) {
            return res.status(400).json({ error: "Post ID, content, and author are required." });
        }

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found. "});
        }

        const newComment = new Comment({ postId, content, author });
        const savedComment = await newComment.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: "Failed to create comment. "});
    }
});

// DELETE /comments/:id (Delete a comment by ID)
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        res.json({ message: "Comment deleted succesfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment. "});
    }
});

export default router;