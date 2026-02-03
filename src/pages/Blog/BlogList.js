import React, { useState } from 'react';
import '../../App.css';
import './BlogList.css';
import BlogCard from './components/BlogCard';
import CategoryFilter from './components/CategoryFilter';
import { blogPosts, categories } from './data/blogData';

function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-list-page">
      <div className="blog-list-container">
        <div className="blog-list-header">
          <h1>Blog</h1>
          <p>Insights, tips, and stories about language learning</p>
        </div>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <p>No posts found in this category.</p>
            <button onClick={() => setSelectedCategory('all')} className="reset-btn">
              Show All Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
