import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import './Pricing.css';

function Pricing({ openModal }) {
  const { convertPrice, currency } = useCurrency();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customTokens, setCustomTokens] = useState('');
  const [customError, setCustomError] = useState('Minimum 50 tokens required');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleCustomTokensChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      setCustomTokens('');
      setCustomError('Minimum 50 tokens required');
      return;
    }
    
    // Parse and validate
    const value = parseInt(inputValue, 10);
    
    if (isNaN(value) || value < 0) {
      return; // Ignore invalid input
    }
    
    setCustomTokens(value);
    
    if (value < 50 && value > 0) {
      setCustomError('Minimum 50 tokens required');
    } else if (value === 0) {
      setCustomError('Please enter amount');
    } else {
      setCustomError('');
    }
  };

  const calculateCustomPrice = () => {
    const tokens = parseInt(customTokens, 10) || 0;
    return (tokens / 100).toFixed(2);
  };

  const plans = [
    {
      name: 'Starter',
      tokens: 1000,
      priceUSD: 9.99,
      features: [
        '1000 tokens',
        'Access to basic courses',
        'Community forum access',
        'Progress tracking',
        'Mobile app access'
      ]
    },
    {
      name: 'Pro',
      tokens: 2500,
      priceUSD: 19.99,
      popular: true,
      features: [
        '2500 tokens',
        'Access to all courses',
        'Live conversation sessions',
        'Priority support',
        'Downloadable resources',
        'Certificate of completion'
      ]
    },
    {
      name: 'Premium',
      tokens: 5000,
      priceUSD: 29.99,
      features: [
        '5000 tokens',
        'Access to all courses',
        'One-on-one tutoring',
        'Custom learning path',
        'Advanced analytics',
        'Lifetime access to purchased courses'
      ]
    }
  ];

  const handleSelectPlan = async (plan, isCustom = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (openModal) {
        openModal('login');
      } else {
        alert('Please log in to purchase tokens');
      }
      return;
    }

    let tokens, amount, packageType;
    
    if (isCustom) {
      const tokensValue = parseInt(customTokens, 10);
      if (isNaN(tokensValue) || tokensValue < 50) {
        setCustomError('Minimum 50 tokens required');
        return;
      }
      tokens = tokensValue;
      amount = parseFloat(calculateCustomPrice());
      packageType = 'Custom';
    } else {
      tokens = plan.tokens;
      amount = plan.priceUSD;
      packageType = plan.name;
    }

    try {
      const response = await fetch('http://localhost:5000/api/transactions/buy-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          packageType: packageType,
          tokens: tokens,
          amount: amount
        })
      });

      if (response.ok) {
        alert(`Successfully purchased ${tokens} tokens!`);
        if (isCustom) {
          setCustomTokens('');
          setCustomError('Minimum 50 tokens required');
        }
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to purchase tokens');
      }
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      alert('Failed to purchase tokens. Please try again.');
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>
          <p>Start learning today with a plan that works for you</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="amount">{convertPrice(plan.priceUSD)}</span>
              </div>
              <div className="tokens-badge">{plan.tokens} Tokens</div>
              <ul className="features-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                className="select-plan-btn"
                onClick={() => handleSelectPlan(plan)}
              >
                {isLoggedIn ? 'Select Plan' : 'Log In to Purchase'}
              </button>
            </div>
          ))}
        </div>

        {/* Custom Token Purchase */}
        <div className="custom-token-section">
          <div className="custom-token-card">
            <div className="custom-header">
              <h2>Custom Amount</h2>
              <span className="custom-badge">Flexible</span>
            </div>
            <p className="custom-description">
              Buy exactly the amount of tokens you need. Perfect for trying out our platform!
            </p>
            <div className="rate-info">
              <span className="rate-label">Rate:</span>
              <span className="rate-value">$1 = 100 tokens</span>
            </div>
            <div className="custom-input-group">
              <label htmlFor="custom-tokens">Number of Tokens</label>
              <input
                type="number"
                id="custom-tokens"
                min="50"
                value={customTokens}
                onChange={handleCustomTokensChange}
                placeholder="Enter amount (min. 50)"
                className={customError ? 'error' : ''}
              />
              {customError && <span className="error-message">{customError}</span>}
            </div>
            <div className="custom-price-display">
              <span className="price-label">Total Price:</span>
              <span className="custom-price">
                {convertPrice(parseFloat(calculateCustomPrice()))}
              </span>
            </div>
            <ul className="features-list">
              <li>✓ Pay only for what you need</li>
              <li>✓ Minimum 50 tokens ($0.50)</li>
              <li>✓ No commitment required</li>
              <li>✓ Instant token delivery</li>
            </ul>
            <button 
              className="select-plan-btn custom-btn"
              onClick={() => handleSelectPlan(null, true)}
              disabled={!customTokens || parseInt(customTokens, 10) < 50}
            >
              {isLoggedIn ? 'Purchase Tokens' : 'Log In to Purchase'}
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-section">
          <h2>Compare Plans</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Basic</th>
                  <th>Pro</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Courses</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Community Forum</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Progress Tracking</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Mobile App</td>
                  <td>✓</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Live Sessions</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Priority Support</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Certificates</td>
                  <td>—</td>
                  <td>✓</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>1-on-1 Tutoring</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Custom Learning Path</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
                <tr>
                  <td>Advanced Analytics</td>
                  <td>—</td>
                  <td>—</td>
                  <td>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h2>Why Choose Our Plans?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>Flexible Learning</h3>
              <p>Learn at your own pace with lifetime access to course materials</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">👨‍🏫</div>
              <h3>Expert Teachers</h3>
              <p>Learn from native speakers and certified language instructors</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📱</div>
              <h3>Multi-Device Access</h3>
              <p>Study anywhere with our mobile app and desktop platform</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3>Certificates</h3>
              <p>Earn recognized certificates to showcase your language skills</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pricing-faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Can I change my plan later?</h3>
              <p>Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>We offer a 7-day money-back guarantee on all plans. Try any plan risk-free!</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
          </div>
          <div className="faq-link">
            <p>Have more questions?</p>
            <Link to="/faq" className="view-all-faq">View All FAQs →</Link>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h2>What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p>"The Pro plan is perfect for me. Live sessions really helped improve my speaking skills!"</p>
              <div className="testimonial-author">
                <strong>Sarah M.</strong>
                <span>Pro Plan Student</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p>"Premium's one-on-one tutoring made all the difference. Worth every penny!"</p>
              <div className="testimonial-author">
                <strong>James L.</strong>
                <span>Premium Plan Student</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p>"Great value for money. The Basic plan has everything I need to get started."</p>
              <div className="testimonial-author">
                <strong>Maria G.</strong>
                <span>Basic Plan Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pricing-cta">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning with Talentinsulin</p>
          <div className="cta-stats">
            <div className="stat-item">
              <strong>10,000+</strong>
              <span>Active Students</span>
            </div>
            <div className="stat-item">
              <strong>50+</strong>
              <span>Expert Teachers</span>
            </div>
            <div className="stat-item">
              <strong>30+</strong>
              <span>Languages</span>
            </div>
            <div className="stat-item">
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
