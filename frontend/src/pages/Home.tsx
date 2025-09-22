import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center py-5">
      <div className="container">
        <h1 className="display-4 mb-4">bloggers</h1>
        <p className="lead mb-5">
          A simple blog application built with React, TypeScript, and Express.
          Share your thoughts, read posts from others, and join the conversation.
        </p>
        
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Get Started</h5>
                <p className="card-text">
                  Explore existing posts or create your own to share with the community.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Link to="/posts" className="btn btn-primary me-md-2">
                    <i className="bi bi-list-ul me-2"></i>
                    View All Posts
                  </Link>
                  <Link to="/create-post" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>
                    Create New Post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-pencil-square display-4 text-primary mb-3"></i>
                <h5>Create Posts</h5>
                <p>Share your thoughts and ideas with the community.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-chat-dots display-4 text-primary mb-3"></i>
                <h5>Add Comments</h5>
                <p>Engage with other users by commenting on their posts.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-people display-4 text-primary mb-3"></i>
                <h5>Join Community</h5>
                <p>Become part of our growing community of writers and readers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;