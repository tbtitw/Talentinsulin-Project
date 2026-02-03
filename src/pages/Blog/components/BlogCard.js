import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="blog-card">
      <div className="blog-card-image-wrapper">
        <img 
          src={post.imageUrl} 
          alt={post.imageAlt}
          className="blog-card-image"
          loading="lazy"
        />
        <div className="blog-card-overlay" style={{ background: post.gradient }}></div>
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-read-time">{post.readTime}</span>
        </div>
        <h2>{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-footer">
          <span className="blog-card-author">{post.author}</span>
          <span className="blog-card-date">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
