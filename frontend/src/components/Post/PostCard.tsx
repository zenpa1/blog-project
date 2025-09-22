import React from 'react';
import { Post } from '../../types/types';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">By {post.author}</h6>
        <p className="card-text">{truncateContent(post.content)}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Posted on {formatDate(post.createdAt)}</small>
          <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">
            Read More
          </Link>
        </div>
        {post.comments && post.comments.length > 0 && (
          <div className="mt-2">
            <small className="text-muted">
              {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;