import React from 'react'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🚗</span>
            <span className="logo-text">Premium Rentals</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#cars">Cars</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="btn-primary">Book Now</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
