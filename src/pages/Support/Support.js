import React, { useState } from 'react';
import './Support.css';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your API
    console.log('Support request submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="support-page">
      <div className="support-container">
        <div className="support-header">
          <h1>Support Center</h1>
          <p className="support-subtitle">
            We're here to help! Get assistance with any questions or issues.
          </p>
        </div>

        <div className="support-content">
          <div className="support-options">
            <div className="support-option-card">
              <div className="option-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team in real-time</p>
              <button className="option-button">Start Chat</button>
            </div>

            <div className="support-option-card">
              <div className="option-icon">📧</div>
              <h3>Email Support</h3>
              <p>Send us an email and we'll respond within 24 hours</p>
              <a href="mailto:support@talentinsulin.com" className="option-button">
                Email Us
              </a>
            </div>

            <div className="support-option-card">
              <div className="option-icon">❓</div>
              <h3>FAQ</h3>
              <p>Find answers to commonly asked questions</p>
              <button className="option-button" onClick={() => window.location.href = '/faq'}>
                View FAQ
              </button>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Submit a Support Request</h2>
            <p className="form-description">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>

            {submitted && (
              <div className="success-message">
                ✓ Your support request has been submitted successfully! We'll get back to you soon.
              </div>
            )}

            <form className="support-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="course">Course Content</option>
                  <option value="account">Account Management</option>
                  <option value="refund">Refund Request</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Please describe your issue or question in detail..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Submit Request
              </button>
            </form>
          </div>

          <div className="support-info">
            <h2>Other Ways to Reach Us</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>📞 Phone Support</h3>
                <p>+1 (555) 123-4567</p>
                <p className="info-hours">Mon-Fri: 9AM - 6PM EST</p>
              </div>

              <div className="info-card">
                <h3>🕐 Support Hours</h3>
                <p>Monday - Friday: 9AM - 6PM EST</p>
                <p>Saturday: 10AM - 4PM EST</p>
                <p>Sunday: Closed</p>
              </div>

              <div className="info-card">
                <h3>🌐 Social Media</h3>
                <p>Follow us for updates and tips</p>
                <div className="social-links">
                  <a href="#" className="social-link">Facebook</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
