import React from 'react';
import InfoCard from './components/InfoCard';
import ContactForm from './components/ContactForm';
import '../../App.css';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Have a question or feedback? We'd love to hear from you.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <InfoCard
              icon="📧"
              title="Email"
              description="support@talentinsulin.com"
              label="We typically respond within 24 hours"
            />
            <InfoCard
              icon="💬"
              title="Live Chat"
              description="Available Monday - Friday"
              label="9:00 AM - 6:00 PM EST"
            />
            <InfoCard
              icon="🌍"
              title="Social Media"
              description="Follow us for updates"
              label="Twitter, LinkedIn, Facebook"
            />
            <InfoCard
              icon="📍"
              title="Location"
              description="Remote First Company"
              label="Serving students worldwide"
            />
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
