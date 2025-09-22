import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types/types';
import { postAPI, commentAPI } from '../services/api';
import CommentList from '../components/Comment/CommentList';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState({ content: '', author: '' });

  // Use useCallback to memoize the fetchPost function
  const fetchPost = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const postData = await postAPI.getById(id);
      setPost(postData);
      setError(null);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, [id]); // Add id as dependency

  useEffect(() => {
    fetchPost();
  }, [fetchPost]); // Now fetchPost is stable and can be included in dependencies

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.content || !newComment.author) return;

    try {
      const commentData = {
        postId: id,
        content: newComment.content,
        author: newComment.author
      };
      
      await commentAPI.create(commentData);
      setNewComment({ content: '', author: '' });
      fetchPost(); // Refresh the post to show new comment
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentAPI.delete(commentId);
        fetchPost(); // Refresh the post
      } catch (err) {
        console.error('Error deleting comment:', err);
        alert('Failed to delete comment');
      }
    }
  };

  if (loading) return <div className="text-center">Loading post...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div className="alert alert-warning">Post not found</div>;

  return (
    <div className="container">
      <Link to="/posts" className="btn btn-secondary mb-3">← Back to Posts</Link>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-muted">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="card-text">{post.content}</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Comments</h5>
              <small className="text-muted">{post.comments?.length || 0}</small>
            </div>
            <div className="card-body">
              <CommentList comments={post.comments || []} onDelete={handleDeleteComment} />

              <form onSubmit={handleAddComment} className="mt-4">
                <h5>Add a Comment</h5>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Your comment..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={newComment.author}
                    onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Comment</button>
              </form>
            </div>
          </div>
        </div>

        <aside className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h6>About the Author</h6>
              <p className="text-muted">{post.author}</p>
              <h6>Posted</h6>
              <p className="text-muted">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;