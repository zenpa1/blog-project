import React, { useState, useEffect } from 'react';
import { Post } from '../types/types';
import { postAPI } from '../services/api';
import PostCard from '../components/Post/PostCard';
import { Link } from 'react-router-dom';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await postAPI.getAll();
        setPosts(postsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // We'll let the useEffect hook handle the refetch
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        <h4>Error Loading Posts</h4>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={handleRetry}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Posts</h2>
        <Link to="/create-post" className="btn btn-success">
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center my-5">
          <h4>No Posts Yet</h4>
          <p>Be the first to create a post!</p>
          <Link to="/create-post" className="btn btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;