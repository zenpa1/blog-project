import express, { Request, Response, Router } from "express";
import Post from "../models/Post.js";

const router: Router = express.Router();

// GET /posts (Retrieves all posts)
router.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });  // Newest post first
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve posts. "});
    }
});

// GET /posts/:id (Retrieve a single post by ID)
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found. "});
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve post. "});
    }
});

// POST /posts (Create a new post)
router.post("/", async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required. "});
        }

        const newPost = new Post({ title, content, author });
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post." });
    }
});

export default router;