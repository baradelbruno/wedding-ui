import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const apiUrl = 'https://localhost:7290/WeddingGuests'

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

  // Fetch guests from API
  const fetchGuests = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setGuests(data)
      console.log('✅ Loaded guests:', data)
    } catch (err) {
      setError(err.message)
      console.error('❌ Error loading guests:', err)
    } finally {
      setLoading(false)
    }
  }

  // Confirm attendance
  const confirmAttendance = async () => {
    if (!selectedGuest) return

    setConfirming(true)
    setConfirmMessage(null)

    try {
      const response = await fetch(`${apiUrl}?id=${selectedGuest.id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          isAttending: true,
          email: email,
          phoneNumber: phoneNumber
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      console.log('✅ Attendance confirmed for:', selectedGuest.name)
      setConfirmMessage({ type: 'success', text: `Presença confirmada para ${selectedGuest.name}!` })
      
      // Update the guest in the local state
      setGuests(guests.map(g => 
        g.id === selectedGuest.id ? { 
          ...g, 
          isAttending: true,
          email: email,
          phoneNumber: phoneNumber 
        } : g
      ))
      setSelectedGuest({ 
        ...selectedGuest, 
        isAttending: true,
        email: email,
        phoneNumber: phoneNumber
      })
      
      // Clear the form fields
      setEmail('')
      setPhoneNumber('')

    } catch (err) {
      console.error('❌ Error confirming attendance:', err)
      setConfirmMessage({ type: 'error', text: `Erro ao confirmar presença: ${err.message}` })
    } finally {
      setConfirming(false)
    }
  }

  // Load guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search term
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle guest selection
  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest)
    setSearchTerm(guest.name)
    setEmail('')
    setPhoneNumber('')
    setConfirmMessage(null)
  }

  return (
    <>
      <div>
        <h1>Lista de Presença Casamento Larissa e Bruno</h1>
      </div>

      <div className="card">
        {loading && <p>Loading guests...</p>}
        
        {error && (
          <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', marginBottom: '15px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {confirmMessage && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '15px',
                background: confirmMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                color: confirmMessage.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${confirmMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                {confirmMessage.text}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setSelectedGuest(null)
                    setConfirmMessage(null)
                    setEmail('')
                    setPhoneNumber('')
                  }}
                  placeholder="Digite o seu nome"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '2px solid #ccc',
                    boxSizing: 'border-box'
                  }}
                />
                
                {searchTerm && filteredGuests.length > 0 && !selectedGuest && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    marginTop: '5px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}>
                    {filteredGuests.map(guest => (
                      <div
                        key={guest.id}
                        onClick={() => handleSelectGuest(guest)}
                        style={{
                          padding: '12px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #eee',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                      >
                        {guest.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedGuest && !selectedGuest.isAttending && (
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
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={confirmAttendance}
                disabled={!selectedGuest || confirming || selectedGuest?.isAttending || !isFormValid()}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedGuest && !selectedGuest.isAttending && isFormValid() ? '#4CAF50' : '#ccc',
                  color: 'white',
                  cursor: selectedGuest && !selectedGuest.isAttending && isFormValid() ? 'pointer' : 'not-allowed',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedGuest && !selectedGuest.isAttending && isFormValid()) {
                    e.target.style.background = '#45a049'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedGuest && !selectedGuest.isAttending && isFormValid()) {
                    e.target.style.background = '#4CAF50'
                  }
                }}
              >
                {confirming ? 'Confirmando...' : selectedGuest?.isAttending ? 'Já confirmado!' : 'Confirme minha presença!'}
              </button>
            </div>

            {searchTerm && filteredGuests.length === 0 && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                background: '#fff3cd',
                borderRadius: '4px',
                color: '#856404',
                marginBottom: '20px'
              }}>
                No guests found matching "{searchTerm}"
              </div>
            )}

            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              {guests.length} guest{guests.length !== 1 ? 's' : ''} in the system
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
