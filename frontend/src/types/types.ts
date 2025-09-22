export interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    comments?: Comment[];
}

export interface Comment {
    _id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostData {
    title: string;
    content: string;
    author: string;
}

export interface CreateCommentData {
    postId: string;
    content: string;
    author: string;
}