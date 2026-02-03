import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      icon: '🎓',
      title: 'Expert Teachers',
      description: 'Learn from qualified native speakers and experienced language instructors'
    },
    {
      icon: '📚',
      title: 'Interactive Lessons',
      description: 'Engaging content with videos, exercises, and real-world practice'
    },
    {
      icon: '🌍',
      title: 'Multiple Languages',
      description: 'Choose from a wide variety of languages and proficiency levels'
    },
    {
      icon: '⏰',
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with 24/7 access to course materials'
    },
    {
      icon: '💬',
      title: 'Live Conversations',
      description: 'Practice speaking with native speakers in real-time sessions'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and assessments'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">Why Choose Talentinsulin?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
