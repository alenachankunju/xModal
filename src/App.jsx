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
    // Check for empty fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        alert(`Please fill in the ${key} field`)
        return false
      }
    }

    // Validate email
    if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.')
      return false
    }

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.')
      return false
    }

    // Validate date of birth
    const dobDate = new Date(formData.dob)
    const today = new Date()
    if (dobDate > today) {
      alert('Invalid date of birth. Please enter a past date.')
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
