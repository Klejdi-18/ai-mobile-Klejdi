import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Premium Rentals</h3>
            <p>Your trusted partner for quality car rentals since 2020.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#cars">Cars</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@premiumrentals.com</li>
              <li>📍 123 Main St, City, State 12345</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <ul>
              <li>Mon - Fri: 8:00 AM - 8:00 PM</li>
              <li>Sat - Sun: 9:00 AM - 6:00 PM</li>
              <li>24/7 Emergency Support</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Premium Rentals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
