import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../pages/Blog/data/blogData';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <img src="/images/logos/favicon.png" alt="Talentinsulin" />
              </div>
              <span className="footer-logo-text">Talentinsulin</span>
            </Link>
            <p className="footer-description">
              Professional web solutions for all your needs. Fast, secure, and reliable.
            </p>
            <div className="footer-company-info">
              <p className="company-name">TALENT INSULIN LTD</p>
              <p>Company number 15586966</p>
              <address>
                20 Wenlock Road,<br />
                London, England,<br />
                N1 7GU
              </address>
            </div>
          </div>

          <div className="footer-section">
            <h4>Learning</h4>
            <ul>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/become-teacher">Become a Teacher</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Useful</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Blog</h4>
            <ul className="blog-links">
              {blogPosts.map((post) => (
                <li key={post.id}>
                  <Link to={`/blog/${post.id}`} title={post.title}>
                    {post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/refunds">Refunds and Tokens</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookies Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <span className="icon">✉</span>
                <a href="mailto:info@talentinsulin.com">info@talentinsulin.com</a>
              </li>
              <li>
                <span className="icon">📞</span>
                <a href="tel:+447537133270">+44 7537 133270</a>
              </li>
              <li>
                <span className="icon">📷</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@talentinsulin</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Talentinsulin. All rights reserved.</p>
          <div className="payment-methods">
            <div className="payment-card">
              <img src="/images/payment/visa-logo.svg" alt="Visa" />
            </div>
            <div className="payment-card">
              <img src="/images/payment/mastercard-logo.svg" alt="Mastercard" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
