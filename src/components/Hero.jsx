import React from 'react'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">Find Your Perfect Ride</h1>
        <p className="hero-subtitle">
          Explore our premium collection of vehicles. From luxury sedans to rugged SUVs.
        </p>
        <div className="hero-features">
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Best Prices</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>24/7 Support</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✓</span>
            <span>Free Cancellation</span>
          </div>
        </div>
        <a href="#cars" className="btn-hero">Browse Cars</a>
      </div>
    </section>
  )
}

export default Hero
