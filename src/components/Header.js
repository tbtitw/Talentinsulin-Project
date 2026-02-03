import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import './Header.css';

function Header({ openModal }) {
  const { currency, setCurrency } = useCurrency();
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [learningMenuOpen, setLearningMenuOpen] = useState(false);
  const [usefulMenuOpen, setUsefulMenuOpen] = useState(false);
  const [policiesMenuOpen, setPoliciesMenuOpen] = useState(false);
  const [userTokens, setUserTokens] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown') && !event.target.closest('.user-menu')) {
        setLearningMenuOpen(false);
        setUsefulMenuOpen(false);
        setPoliciesMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setUserTokens(data.user.tokens || 0);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <img src="/images/logos/favicon.png" alt="Talentinsulin" />
          </div>
          <span className="logo-text">Talentinsulin</span>
        </Link>
        <nav className="navigation">
          <ul>
            <li>
              <div className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLearningMenuOpen(!learningMenuOpen);
                    setUsefulMenuOpen(false);
                    setPoliciesMenuOpen(false);
                  }}
                >
                  Learning ▾
                </button>
                {learningMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/pricing" onClick={() => setLearningMenuOpen(false)}>Pricing</Link>
                    <Link to="/courses" onClick={() => setLearningMenuOpen(false)}>Courses</Link>
                    <Link to="/become-teacher" onClick={() => setLearningMenuOpen(false)}>Become a Teacher</Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUsefulMenuOpen(!usefulMenuOpen);
                    setLearningMenuOpen(false);
                    setPoliciesMenuOpen(false);
                  }}
                >
                  Useful ▾
                </button>
                {usefulMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/about" onClick={() => setUsefulMenuOpen(false)}>About Us</Link>
                    <Link to="/support" onClick={() => setUsefulMenuOpen(false)}>Support</Link>
                    <Link to="/contact-us" onClick={() => setUsefulMenuOpen(false)}>Contact Us</Link>
                    <Link to="/blog" onClick={() => setUsefulMenuOpen(false)}>Blog</Link>
                    <Link to="/faq" onClick={() => setUsefulMenuOpen(false)}>FAQ</Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPoliciesMenuOpen(!policiesMenuOpen);
                    setLearningMenuOpen(false);
                    setUsefulMenuOpen(false);
                  }}
                >
                  Policies ▾
                </button>
                {policiesMenuOpen && (
                  <div className="dropdown-menu">
                    <Link to="/refunds" onClick={() => setPoliciesMenuOpen(false)}>Refunds and Tokens</Link>
                    <Link to="/privacy" onClick={() => setPoliciesMenuOpen(false)}>Privacy Policy</Link>
                    <Link to="/terms" onClick={() => setPoliciesMenuOpen(false)}>Terms of Service</Link>
                    <Link to="/cookies" onClick={() => setPoliciesMenuOpen(false)}>Cookies Policy</Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
        <div className="currency-switcher">
          <button 
            className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
            onClick={() => setCurrency('USD')}
          >
            USD
          </button>
          <button 
            className={`currency-btn ${currency === 'EUR' ? 'active' : ''}`}
            onClick={() => setCurrency('EUR')}
          >
            EUR
          </button>
          <button 
            className={`currency-btn ${currency === 'GBP' ? 'active' : ''}`}
            onClick={() => setCurrency('GBP')}
          >
            GBP
          </button>
        </div>
        <div className="header-actions">
          {user ? (
            <>
              <div className="tokens-display-header">
                {userTokens} tokens
              </div>
              <div className="user-menu">
                <button 
                  className="user-name-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                >
                  Hello, {user.firstName} ▾
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}>Profile</Link>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="btn-login" onClick={() => openModal('login')}>Log In</button>
              <button className="btn-signup" onClick={() => openModal('signup')}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
