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

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '2px solid #e9ecef',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', sans-serif'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#495057'
  }

  const errorStyle = {
    color: '#dc3545',
    fontSize: '13px',
    marginTop: '6px'
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{
            ...inputStyle,
            borderColor: email && !isEmailValid(email) ? '#dc3545' : '#e9ecef'
          }}
          onFocus={(e) => e.target.style.borderColor = email && !isEmailValid(email) ? '#dc3545' : '#7a0000'}
          onBlur={(e) => e.target.style.borderColor = email && !isEmailValid(email) ? '#dc3545' : '#e9ecef'}
        />
        {email && !isEmailValid(email) && (
          <div style={errorStyle}>
            Email deve conter "@" e ".com"
          </div>
        )}
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={labelStyle}>
          Telefone
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(00) 00000-0000"
          maxLength="15"
          style={{
            ...inputStyle,
            borderColor: phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 ? '#dc3545' : '#e9ecef'
          }}
          onFocus={(e) => e.target.style.borderColor = phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 ? '#dc3545' : '#7a0000'}
          onBlur={(e) => e.target.style.borderColor = phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 ? '#dc3545' : '#e9ecef'}
        />
        {phoneNumber && phoneNumber.replace(/\D/g, '').length < 11 && (
          <div style={errorStyle}>
            Telefone deve ter 11 dígitos
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleConfirm}
          disabled={!isFormValid() || confirming}
          style={{
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '50px',
            border: 'none',
            background: isFormValid() && !confirming 
              ? 'linear-gradient(135deg, #7a0000 0%, #5a0000 100%)' 
              : '#dee2e6',
            color: 'white',
            cursor: isFormValid() && !confirming ? 'pointer' : 'not-allowed',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            boxShadow: isFormValid() && !confirming ? '0 4px 12px rgba(122, 0, 0, 0.25)' : 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', sans-serif',
            letterSpacing: '0.3px'
          }}
          onMouseEnter={(e) => {
            if (isFormValid() && !confirming) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(122, 0, 0, 0.35)'
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid() && !confirming) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(122, 0, 0, 0.25)'
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
