import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../../../context/CurrencyContext';
import './PricingSection.css';

function PricingSection({ openModal }) {
  const { convertPrice, currency } = useCurrency();
  const navigate = useNavigate();
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
    <section className="home-pricing-section">
      <div className="home-pricing-container">
        <div className="home-pricing-header">
          <h2>Choose Your Plan</h2>
          <p>Select the perfect plan for your language learning journey</p>
        </div>
        <div className="home-pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`home-pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              <h3>{plan.name}</h3>
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

          {/* Custom Token Card in Grid */}
          <div className="home-pricing-card custom-card">
            <span className="popular-badge" style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' }}>Flexible</span>
            <h3>Custom</h3>
            <div className="custom-rate-info">
              <span className="rate-text">$1 = 100 tokens</span>
            </div>
            <div className="custom-input-wrapper">
              <label htmlFor="custom-tokens-grid">Tokens (min. 50)</label>
              <input
                type="number"
                id="custom-tokens-grid"
                min="50"
                value={customTokens}
                onChange={handleCustomTokensChange}
                placeholder="50"
                className={customError ? 'error' : ''}
              />
              {customError && <span className="error-msg">{customError}</span>}
            </div>
            <div className="custom-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">{convertPrice(parseFloat(calculateCustomPrice()))}</span>
            </div>
            <ul className="features-list">
              <li>✓ Pay only for what you need</li>
              <li>✓ No commitment required</li>
              <li>✓ Instant delivery</li>
            </ul>
            <button 
              className="select-plan-btn"
              onClick={() => handleSelectPlan(null, true)}
              disabled={!customTokens || parseInt(customTokens, 10) < 50}
            >
              {isLoggedIn ? 'Purchase Tokens' : 'Log In to Purchase'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
