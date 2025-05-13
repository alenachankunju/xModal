import { useState } from 'react'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const validateForm = () => {
    const errors = []

    // Check for empty fields
    if (!formData.username.trim()) {
      errors.push('Please fill in the username field')
    }
    if (!formData.email.trim()) {
      errors.push('Please fill in the email field')
    }
    if (!formData.phone.trim()) {
      errors.push('Please fill in the phone field')
    }
    if (!formData.dob.trim()) {
      errors.push('Please fill in the date of birth field')
    }

    // Only proceed with other validations if fields are not empty
    if (errors.length === 0) {
      // Validate email
      if (!formData.email.includes('@')) {
        errors.push('Invalid email. Please check your email address.')
      }

      // Validate phone number
      if (!/^\d{10}$/.test(formData.phone)) {
        errors.push('Invalid phone number. Please enter a 10-digit phone number.')
      }

      // Validate date of birth
      const dobDate = new Date(formData.dob)
      const today = new Date()
      if (dobDate > today) {
        errors.push('Invalid date of birth. Please enter a past date.')
      }
    }

    if (errors.length > 0) {
      alert(errors[0]) // Show the first error message
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsModalOpen(false)
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      })
    }
  }

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  return (
    <div className="app">
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
