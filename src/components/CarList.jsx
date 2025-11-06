import { useState } from 'react'
import CarCard from './CarCard'
import { cars } from '../data/cars'

function CarList({ onSelectCar }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', ...new Set(cars.map(car => car.category))]

  const filteredCars = cars.filter(car => {
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="car-list-section" id="cars">
      <div className="container">
        <h2 className="section-title">Our Fleet</h2>
        <p className="section-subtitle">Choose from our wide range of vehicles</p>
        
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="cars-grid">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} onSelect={onSelectCar} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="no-results">
            <p>No cars found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarList
