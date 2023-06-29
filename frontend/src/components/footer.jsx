import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="social-media">
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="pages">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          {/* Add more page links as needed */}
        </div>
        <div className="useful-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          {/* Add more useful links as needed */}
        </div>
      </div>
      <div className="school-logo">
      <img src="images/universal.jpg" alt="logo" />
      </div>
    </footer>
  );
}

export default Footer;
