import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content-box">
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of students learning languages with Talentinsulin
          </p>
          <Link to="/courses" className="cta-button">
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
