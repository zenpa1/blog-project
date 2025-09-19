// -- MAIN SERVER FILE --
import express, { Request, Response } from "express";  // Main framework
import cors from "cors";  // Cross-Origin Resource Sharing
import bodyParser from "body-parser"  // Middleware simplifying data extraction
import mongoose from "mongoose";  // Used for connecting to MongoDB
import postsRouter from "./routes/posts.js";
import { initialMessage } from "./helper.js";

const app = express();  // Start server
const PORT = process.env.PORT || 3000;  // Uses port 3000 for connections
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/blogapp";  // Connection URL

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/posts", postsRouter);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "OK", message: "API is running." });
});

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URL).then(() => {
        console.log("Connected to MongoDB.");
        app.listen(PORT, () => {
            console.log(initialMessage(PORT));
        });
    }).catch((error) => {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    });

export default app;