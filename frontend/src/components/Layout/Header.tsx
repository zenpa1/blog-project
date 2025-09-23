import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          bloggers
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/posts">
            All Posts
          </Link>
          <Link className="nav-link" to="/create-post">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;