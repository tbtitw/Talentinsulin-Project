import React from 'react';
import './CategoryFilter.css';

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button
          key={category}
          className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category === 'all' ? 'All Posts' : category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
