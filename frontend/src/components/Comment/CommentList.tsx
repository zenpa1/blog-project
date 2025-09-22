import React from 'react';
import { Comment } from '../../types/types';

interface CommentListProps {
  comments: Comment[];
  onDelete?: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-muted">No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul className="list-group">
      {comments.map((c) => (
        <li key={c._id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1">{c.content}</p>
              <small className="text-muted">By {c.author} • {new Date(c.createdAt).toLocaleDateString()}</small>
            </div>
            {onDelete && (
              <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => onDelete(c._id)}>Delete</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;