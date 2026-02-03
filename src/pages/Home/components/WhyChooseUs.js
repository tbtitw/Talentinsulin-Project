import React from 'react';
import './WhyChooseUs.css';

function WhyChooseUs() {
  const reasons = [
    {
      icon: '🎯',
      title: 'Personalized Learning',
      description: 'AI-powered courses tailored to your level and learning style'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Teachers',
      description: 'Learn from certified native speakers with years of experience'
    },
    {
      icon: '💬',
      title: 'Live Practice',
      description: 'Real-time conversation sessions with teachers and peers'
    },
    {
      icon: '📱',
      title: 'Learn Anywhere',
      description: 'Access courses on any device, anytime, anywhere'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics'
    },
    {
      icon: '🏆',
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion'
    }
  ];

  return (
    <section className="why-choose-us-section">
      <div className="why-choose-us-container">
        <div className="why-choose-us-header">
          <h2>Why Choose Talentinsulin?</h2>
          <p>Everything you need to master a new language</p>
        </div>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
