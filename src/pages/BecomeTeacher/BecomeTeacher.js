import React, { useState } from 'react';
import { countries } from '../../utils/countries';
import './BecomeTeacher.css';

function BecomeTeacher() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    languages: [],
    nativeLanguage: '',
    experienceYears: '',
    teachingCertificates: '',
    education: '',
    teachingMethods: '',
    availability: '',
    timezone: '',
    hourlyRate: '',
    videoIntroduction: '',
    whyTeach: '',
    specializations: []
  });

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentSpecialization, setCurrentSpecialization] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const availableLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Dutch', 'Polish', 'Turkish', 'Swedish', 'Greek', 'Hebrew'
  ];

  const availableSpecializations = [
    'Business Language',
    'Conversation Practice',
    'Grammar',
    'Pronunciation',
    'Writing Skills',
    'Test Preparation (TOEFL, IELTS, etc.)',
    'Kids & Teens',
    'Academic Language',
    'Travel Language',
    'Literature'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleAddLanguage = () => {
    if (currentLanguage && !selectedLanguages.includes(currentLanguage)) {
      setSelectedLanguages([...selectedLanguages, currentLanguage]);
      setFormData({ ...formData, languages: [...selectedLanguages, currentLanguage] });
      setCurrentLanguage('');
    }
  };

  const handleRemoveLanguage = (language) => {
    const updated = selectedLanguages.filter(lang => lang !== language);
    setSelectedLanguages(updated);
    setFormData({ ...formData, languages: updated });
  };

  const handleAddSpecialization = () => {
    if (currentSpecialization && !selectedSpecializations.includes(currentSpecialization)) {
      setSelectedSpecializations([...selectedSpecializations, currentSpecialization]);
      setFormData({ ...formData, specializations: [...selectedSpecializations, currentSpecialization] });
      setCurrentSpecialization('');
    }
  };

  const handleRemoveSpecialization = (spec) => {
    const updated = selectedSpecializations.filter(s => s !== spec);
    setSelectedSpecializations(updated);
    setFormData({ ...formData, specializations: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedLanguages.length === 0) {
      setError('Please add at least one language you can teach');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/teachers/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="become-teacher-page">
        <div className="become-teacher-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Application Submitted Successfully!</h2>
            <p>Thank you for your interest in teaching at Talentinsulin. We'll review your application and get back to you within 5-7 business days.</p>
            <button onClick={() => window.location.href = '/'} className="btn-home">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="become-teacher-page">
      <div className="become-teacher-container">
        <div className="teacher-header">
          <h1>Become a Teacher</h1>
          <p>Join our global community of language educators and help students around the world achieve their learning goals.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="teacher-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Teaching Languages */}
          <div className="form-section">
            <h3>Languages You Teach</h3>
            
            <div className="form-group">
              <label>Native Language *</label>
              <select
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={handleChange}
                required
              >
                <option value="">Select your native language</option>
                {availableLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Languages You Can Teach *</label>
              <div className="language-input-group">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                >
                  <option value="">Select a language</option>
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <button type="button" onClick={handleAddLanguage} className="btn-add">
                  Add Language
                </button>
              </div>
              
              {selectedLanguages.length > 0 && (
                <div className="selected-items">
                  {selectedLanguages.map(lang => (
                    <span key={lang} className="selected-item">
                      {lang}
                      <button type="button" onClick={() => handleRemoveLanguage(lang)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Teaching Experience */}
          <div className="form-section">
            <h3>Teaching Experience</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Years of Teaching Experience *</label>
                <select
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Desired Hourly Rate (USD) *</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  min="5"
                  max="200"
                  placeholder="e.g., 25"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Teaching Certificates</label>
              <input
                type="text"
                name="teachingCertificates"
                value={formData.teachingCertificates}
                onChange={handleChange}
                placeholder="e.g., TEFL, TESOL, CELTA"
              />
              <small>Separate multiple certificates with commas</small>
            </div>

            <div className="form-group">
              <label>Education Background *</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your educational background"
                required
              />
            </div>

            <div className="form-group">
              <label>Teaching Specializations</label>
              <div className="language-input-group">
                <select
                  value={currentSpecialization}
                  onChange={(e) => setCurrentSpecialization(e.target.value)}
                >
                  <option value="">Select a specialization</option>
                  {availableSpecializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <button type="button" onClick={handleAddSpecialization} className="btn-add">
                  Add Specialization
                </button>
              </div>
              
              {selectedSpecializations.length > 0 && (
                <div className="selected-items">
                  {selectedSpecializations.map(spec => (
                    <span key={spec} className="selected-item">
                      {spec}
                      <button type="button" onClick={() => handleRemoveSpecialization(spec)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>Additional Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Availability *</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Full-time">Full-time (30+ hours/week)</option>
                  <option value="Part-time">Part-time (10-30 hours/week)</option>
                  <option value="Flexible">Flexible (Less than 10 hours/week)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timezone *</label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  placeholder="e.g., GMT+3, EST"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Teaching Methods & Philosophy *</label>
              <textarea
                name="teachingMethods"
                value={formData.teachingMethods}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your teaching approach, methodology, and what makes you unique as a teacher"
                required
              />
            </div>

            <div className="form-group">
              <label>Video Introduction (URL)</label>
              <input
                type="url"
                name="videoIntroduction"
                value={formData.videoIntroduction}
                onChange={handleChange}
                placeholder="YouTube, Vimeo, or other video link"
              />
              <small>Share a short video introducing yourself (optional but recommended)</small>
            </div>

            <div className="form-group">
              <label>Why Do You Want to Teach at Talentinsulin? *</label>
              <textarea
                name="whyTeach"
                value={formData.whyTeach}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your motivation and what you hope to achieve"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BecomeTeacher;
