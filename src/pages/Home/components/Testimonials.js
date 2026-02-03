import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      language: 'Spanish',
      text: 'Talentinsulin helped me achieve fluency in Spanish in just 6 months! The interactive lessons and supportive community made learning enjoyable and effective.',
      avatar: '👩‍💼',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      language: 'Japanese',
      text: 'The structured approach and expert teachers made learning Japanese so much easier. I can now confidently communicate with my colleagues in Tokyo!',
      avatar: '👨‍💻',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Student',
      language: 'French',
      text: 'I love the flexibility of learning at my own pace. The courses are well-designed and the token system makes it affordable for students like me.',
      avatar: '👩‍🎓',
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>What Our Students Say</h2>
          <p>Join thousands of successful language learners worldwide</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div className="user-info">
                  <h4>{testimonial.name}</h4>
                  <p className="role">{testimonial.role}</p>
                  <p className="language">Learning {testimonial.language}</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <div className="success-metrics">
          <div className="metric-item">
            <span className="metric-value">95%</span>
            <span className="metric-label">Student Satisfaction</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">4.8/5</span>
            <span className="metric-label">Average Rating</span>
          </div>
          <div className="metric-item">
            <span className="metric-value">85%</span>
            <span className="metric-label">Course Completion Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
