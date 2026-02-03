import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import '../../App.css';
import './BlogPostDetail.css';
import { getPostById, getRelatedPosts } from './data/blogData';
import { blogContent } from './data/blogContent';

function BlogPostDetail() {
  const { id } = useParams();
  const post = getPostById(id);
  const content = blogContent[id];

  if (!post || !content) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(id);

  return (
    <div className="blog-post-detail-page">
      <div className="blog-post-detail-container">
        <Link to="/blog" className="back-link">← Back to Blog</Link>
        
        <article className="post-detail-content">
          <div className="post-detail-header">
            <div className="post-detail-image-wrapper">
              <img 
                src={post.imageUrl} 
                alt={post.imageAlt}
                className="post-detail-image"
              />
              <div className="post-detail-overlay" style={{ background: post.gradient }}></div>
            </div>
            <span className="post-detail-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="post-detail-meta">
              <span className="post-detail-author">By {post.author}</span>
              <span className="post-divider">•</span>
              <span className="post-detail-date">{post.date}</span>
              <span className="post-divider">•</span>
              <span className="post-detail-read-time">{post.readTime}</span>
            </div>
          </div>

          <div className="post-detail-body" dangerouslySetInnerHTML={{ __html: content.content }} />

          <div className="post-detail-footer">
            <div className="post-detail-tags">
              <span className="tag">{post.category}</span>
              <span className="tag">Language Learning</span>
              <span className="tag">Education</span>
            </div>
            <div className="post-detail-share">
              <span>Share this article:</span>
              <div className="share-buttons">
                <button className="share-btn" aria-label="Share on Twitter">🐦</button>
                <button className="share-btn" aria-label="Share on Facebook">📘</button>
                <button className="share-btn" aria-label="Share on LinkedIn">💼</button>
              </div>
            </div>
          </div>
        </article>

        <div className="related-posts">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {relatedPosts.map((relatedPost) => (
              <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="related-card">
                <div className="related-image-wrapper">
                  <img 
                    src={relatedPost.imageUrl} 
                    alt={relatedPost.imageAlt}
                    className="related-image"
                    loading="lazy"
                  />
                </div>
                <div className="related-content">
                  <span className="related-category">{relatedPost.category}</span>
                  <h3>{relatedPost.title}</h3>
                  <span className="related-read-time">{relatedPost.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostDetail;
