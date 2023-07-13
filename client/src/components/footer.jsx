// Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="contact">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: 123-456-7890</p>
          {/* Add more contact information as needed */}
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
