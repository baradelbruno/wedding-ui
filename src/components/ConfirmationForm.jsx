import { useState } from 'react'

function ConfirmationForm({ selectedGuest, onConfirm, confirming }) {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Validate email
  const isEmailValid = (email) => {
    return email.includes('@') && email.includes('.com')
  }

  // Format phone number with mask
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '')
    
    // Apply mask (99) 99999-9999
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
    // Limit to 11 digits
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  // Handle phone number input with mask
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  // Check if form is valid
  const isFormValid = () => {
    const phoneDigits = phoneNumber.replace(/\D/g, '')
    return isEmailValid(email) && phoneDigits.length === 11
  }

  const handleConfirm = () => {
    if (isFormValid()) {
      onConfirm({ email, phoneNumber })
      // Clear form after confirmation
      setEmail('')
      setPhoneNumber('')
    }
  }

  if (!selectedGuest || selectedGuest.isAttending) {
    return null
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: `2px solid ${email && !isEmailValid(email) ? '#f44336' : '#ccc'}`,
            boxSizing: 'border-box'
          }}
        />
        {email && !isEmailValid(email) && (
          <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
            Email deve conter "@" e ".com"
          </div>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Telefone
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          maxLength="15"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: `2px solid ${phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 ? '#f44336' : '#ccc'}`,
            boxSizing: 'border-box'
          }}
        />
        {phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 && (
          <div style={{ color: '#f44336', fontSize: '12px', marginTop: '5px' }}>
            Telefone deve ter 11 dígitos
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleConfirm}
          disabled={!isFormValid() || confirming}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            background: isFormValid() ? '#4CAF50' : '#ccc',
            color: 'white',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            if (isFormValid()) {
              e.target.style.background = '#45a049'
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid()) {
              e.target.style.background = '#4CAF50'
            }
          }}
        >
          {confirming ? 'Confirmando...' : 'Confirme minha presença!'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmationForm
