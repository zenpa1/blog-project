import axios from "axios";
import { Post, Comment, CreatePostData, CreateCommentData } from "../types/types";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Post API calls
export const postAPI = {
    getAll: (): Promise<Post[]> => api.get("/posts").then(response => response.data),
    getById: (id: string): Promise<Post> => api.get(`/posts/${id}`).then(response => response.data),
    create: (postData: CreatePostData): Promise<Post> => api.post("/posts", postData).then(response => response.data),
};

// Comment API calls
export const commentAPI = {
    getByPostId: (postId: string): Promise<Comment[]> => api.get(`/comments/post/${postId}`).then(response => response.data),
    create: (commentData: CreateCommentData): Promise<Comment> => api.post("/comments", commentData).then(response => response.data),
    delete: (id: string): Promise<void> => api.delete(`/comments/${id}`),
};

export default api;