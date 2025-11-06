import React from 'react'
import BookingForm from '../components/BookingForm'

function CarDetails({ car, onBack }) {
  return (
    <div className="car-details-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cars
        </button>
        
        <div className="car-details-content">
          <div className="car-details-left">
            <img src={car.image} alt={car.name} className="car-details-image" />
            
            <div className="car-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{car.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Seats</span>
                  <span className="spec-value">{car.seats} Passengers</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Price</span>
                  <span className="spec-value">${car.price}/day</span>
                </div>
              </div>
            </div>

            <div className="car-features">
              <h3>Features</h3>
              <ul className="features-list">
                {car.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="car-details-right">
            <h2 className="car-details-title">{car.name}</h2>
            <p className="car-details-description">{car.description}</p>
            
            <div className="price-highlight">
              <span className="price-label">Starting from</span>
              <span className="price-big">${car.price}</span>
              <span className="price-period">per day</span>
            </div>

            <BookingForm car={car} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails
