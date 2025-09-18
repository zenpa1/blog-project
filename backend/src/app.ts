import express, { Request, Response } from "express";  // Request and Response for type annotation
import { initialMessage } from "./helper.js";  // Import testing
const app = express();  // Start server
const port = 3000;  // Uses port 3000 for connections

// Response check
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
})

// Listener check
app.listen(port, () => {
    console.log(initialMessage(port));
})