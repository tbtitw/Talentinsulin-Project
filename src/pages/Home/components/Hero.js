import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Master Any Language Online</h1>
            <p className="hero-subtitle">
              Learn languages with expert teachers, interactive lessons, and a supportive global community. 
              Start your journey to fluency today with personalized learning paths.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Active Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Expert Teachers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Languages</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/courses" className="hero-btn primary">
                Browse Courses
              </Link>
              <Link to="/pricing" className="hero-btn secondary">
                View Pricing
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="image-content">
                <div className="globe-icon">🌍</div>
                <p>Connect with learners worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
