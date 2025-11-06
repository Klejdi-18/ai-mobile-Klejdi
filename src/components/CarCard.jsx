import React from 'react'

function CarCard({ car, onSelect }) {
  return (
    <div className="car-card" onClick={() => onSelect(car)}>
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <span className="car-category">{car.category}</span>
      </div>
      <div className="car-info">
        <h3 className="car-name">{car.name}</h3>
        <div className="car-details">
          <span className="detail">
            <span className="detail-icon">👥</span> {car.seats} Seats
          </span>
          <span className="detail">
            <span className="detail-icon">⚙️</span> {car.transmission}
          </span>
        </div>
        <div className="car-footer">
          <div className="car-price">
            <span className="price-amount">${car.price}</span>
            <span className="price-period">/day</span>
          </div>
          <button className="btn-view">View Details</button>
        </div>
      </div>
    </div>
  )
}

export default CarCard
