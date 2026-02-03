import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About Talentinsulin</h1>
          <p className="about-subtitle">
            Empowering language learners worldwide with innovative online education
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Talentinsulin, we believe that language learning should be accessible, 
              engaging, and effective for everyone. Our mission is to break down barriers 
              to language education and provide learners with the tools they need to succeed 
              in a globalized world.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎓</div>
                <h3>Expert Instructors</h3>
                <p>Learn from native speakers and certified language teachers with years of experience.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h3>Interactive Learning</h3>
                <p>Engage with dynamic content, live sessions, and practical exercises.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Community</h3>
                <p>Connect with learners from around the world and practice together.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Learn Anywhere</h3>
                <p>Access courses on any device, anytime, anywhere.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Talentinsulin started with a simple idea: make language 
              learning more accessible and enjoyable. What began as a small platform with 
              a handful of courses has grown into a comprehensive language learning ecosystem 
              serving thousands of students worldwide.
            </p>
            <p>
              Our team of educators, developers, and language enthusiasts work tirelessly 
              to create the best possible learning experience. We continuously update our 
              courses, add new features, and listen to our community's feedback to improve.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-list">
              <div className="value-item">
                <h3>Quality Education</h3>
                <p>We never compromise on the quality of our content and teaching methods.</p>
              </div>
              <div className="value-item">
                <h3>Student Success</h3>
                <p>Your progress and achievements are our top priority.</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>We embrace new technologies to enhance the learning experience.</p>
              </div>
              <div className="value-item">
                <h3>Inclusivity</h3>
                <p>We welcome learners of all backgrounds and skill levels.</p>
              </div>
            </div>
          </section>

          <section className="about-section about-cta-section">
            <div className="about-cta-box">
              <h2>Join Our Community</h2>
              <p>
                Ready to start your language learning journey? Join thousands of students 
                who are already achieving their language goals with Talentinsulin.
              </p>
              <button className="cta-button" onClick={() => window.location.href = '/pricing'}>
                Get Started Today
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
