import { useState } from 'react'

function BookingForm({ car }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    location: 'downtown'
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupDate: '',
        returnDate: '',
        location: 'downtown'
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="success-icon">✓</div>
        <h3>Booking Request Received!</h3>
        <p>Thank you for your interest in the {car.name}.</p>
        <p>We'll contact you shortly to confirm your reservation.</p>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Book This Car</h3>
      
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickupDate">Pick-up Date *</label>
          <input
            type="date"
            id="pickupDate"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="returnDate">Return Date *</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
            min={formData.pickupDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Pick-up Location *</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        >
          <option value="downtown">Downtown Office</option>
          <option value="airport">Airport Terminal</option>
          <option value="north">North Branch</option>
          <option value="south">South Branch</option>
        </select>
      </div>

      <button type="submit" className="btn-submit">
        Request Booking
      </button>
    </form>
  )
}

export default BookingForm
