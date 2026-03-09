import { useState, useEffect } from 'react'

function GuestSearch({ guests, onSelectGuest }) {
  const [nameInput, setNameInput] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isValidating, setIsValidating] = useState(false)

  // Check for exact match when user stops typing
  useEffect(() => {
    if (!nameInput.trim()) {
      setErrorMessage(null)
      onSelectGuest(null)
      return
    }

    // Debounce the validation
    const timeoutId = setTimeout(() => {
      validateName(nameInput.trim())
    }, 800)

    return () => clearTimeout(timeoutId)
  }, [nameInput, guests])

  const validateName = (name) => {
    setIsValidating(true)
    
    // Find exact match (case-insensitive)
    const matchedGuest = guests.find(
      guest => guest.name.toLowerCase() === name.toLowerCase()
    )

    if (matchedGuest) {
      setErrorMessage(null)
      onSelectGuest(matchedGuest)
    } else {
      setErrorMessage('Nome não encontrado na lista de convidados. Por favor, verifique se digitou exatamente o nome como está no seu convite.')
      onSelectGuest(null)
    }
    
    setIsValidating(false)
  }

  const handleInputChange = (value) => {
    setNameInput(value)
    setErrorMessage(null)
    setIsValidating(true)
    onSelectGuest(null)
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Seu nome como está no convite"
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '16px',
            borderRadius: '12px',
            border: errorMessage ? '2px solid #dc3545' : '2px solid #e9ecef',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            outline: 'none',
            fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', sans-serif'
          }}
          onFocus={(e) => {
            if (!errorMessage) e.target.style.borderColor = '#7a0000'
          }}
          onBlur={(e) => {
            if (!errorMessage) e.target.style.borderColor = '#e9ecef'
          }}
        />
        
        {isValidating && nameInput.trim() && (
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d',
            fontSize: '14px'
          }}>
            Verificando...
          </div>
        )}

        {errorMessage && (
          <div style={{
            marginTop: '12px',
            padding: '16px',
            background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
            borderRadius: '12px',
            color: '#721c24',
            fontSize: '14px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestSearch
