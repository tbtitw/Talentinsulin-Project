import React from 'react';
import './LanguageShowcase.css';

function LanguageShowcase() {
  const languages = [
    {
      id: 1,
      name: 'Spanish',
      learners: '3,500+',
      courses: 25,
      flag: '🇪🇸',
      description: 'Master the second most spoken language in the world',
      color: '#FFC107'
    },
    {
      id: 2,
      name: 'French',
      learners: '2,800+',
      courses: 22,
      flag: '🇫🇷',
      description: 'Learn the language of romance and diplomacy',
      color: '#2196F3'
    },
    {
      id: 3,
      name: 'German',
      learners: '2,200+',
      courses: 20,
      flag: '🇩🇪',
      description: 'Unlock opportunities in business and engineering',
      color: '#FF5722'
    },
    {
      id: 4,
      name: 'Japanese',
      learners: '2,500+',
      courses: 18,
      flag: '🇯🇵',
      description: 'Explore the fascinating culture and technology hub',
      color: '#E91E63'
    },
    {
      id: 5,
      name: 'Italian',
      learners: '1,900+',
      courses: 16,
      flag: '🇮🇹',
      description: 'Discover art, cuisine, and rich cultural heritage',
      color: '#4CAF50'
    },
    {
      id: 6,
      name: 'Chinese',
      learners: '2,100+',
      courses: 15,
      flag: '🇨🇳',
      description: 'Connect with the world\'s largest economy',
      color: '#9C27B0'
    }
  ];

  return (
    <section className="language-showcase-section">
      <div className="language-showcase-container">
        <div className="section-header">
          <h2>Popular Languages to Learn</h2>
          <p>Choose from our most popular language courses and start your journey today</p>
        </div>

        <div className="languages-grid">
          {languages.map((language) => (
            <div key={language.id} className="language-card">
              <div className="card-background" style={{ background: `linear-gradient(135deg, ${language.color}22 0%, ${language.color}44 100%)` }}>
                <div className="flag-icon">{language.flag}</div>
              </div>
              <div className="card-content">
                <h3>{language.name}</h3>
                <p className="description">{language.description}</p>
                <div className="language-stats">
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-text">{language.learners} learners</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">📚</span>
                    <span className="stat-text">{language.courses} courses</span>
                  </div>
                </div>
                <button className="explore-btn">Explore Courses</button>
              </div>
            </div>
          ))}
        </div>

        <div className="showcase-cta">
          <div className="cta-content">
            <h3>Can't find your language?</h3>
            <p>We offer courses in 15+ languages. Browse our full course catalog to discover more options.</p>
            <button className="view-all-btn">View All Languages</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LanguageShowcase;
