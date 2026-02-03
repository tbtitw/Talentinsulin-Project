import React, { useState } from 'react';
import './TeacherApplication.css';

function TeacherApplication() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    languageToTeach: '',
    nativeLanguage: '',
    yearsOfExperience: '',
    qualifications: '',
    aboutMe: '',
    availability: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/teachers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          yearsOfExperience: parseInt(formData.yearsOfExperience) || 0
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message
        });
        // Очистить форму
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          gender: '',
          languageToTeach: '',
          nativeLanguage: '',
          yearsOfExperience: '',
          qualifications: '',
          aboutMe: '',
          availability: ''
        });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Error submitting application'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="teacher-application-page">
      <div className="teacher-application-container">
        <h1>Become a Teacher</h1>
        <p className="intro-text">
          Join our team of passionate language educators! Fill out the application form below, 
          and we'll review your profile and get back to you soon.
        </p>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>Teaching Experience</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="languageToTeach">Language to Teach *</label>
                <input
                  type="text"
                  id="languageToTeach"
                  name="languageToTeach"
                  value={formData.languageToTeach}
                  onChange={handleChange}
                  placeholder="e.g., English, Spanish, French"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nativeLanguage">Native Language</label>
                <input
                  type="text"
                  id="nativeLanguage"
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Teaching Experience *</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="qualifications">Qualifications & Certifications</label>
              <textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                rows="4"
                placeholder="List your degrees, certifications (TEFL, TESOL, etc.), and relevant qualifications"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>

            <div className="form-group">
              <label htmlFor="aboutMe">About Me</label>
              <textarea
                id="aboutMe"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about yourself, your teaching philosophy, and why you want to join Talentinsulin"
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                rows="3"
                placeholder="When are you available to teach? (e.g., weekdays 9-5, weekends, flexible)"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherApplication;
