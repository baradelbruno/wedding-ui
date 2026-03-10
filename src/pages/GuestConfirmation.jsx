import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GuestSearch from '../components/GuestSearch'
import ConfirmationForm from '../components/ConfirmationForm'
import StatusMessage from '../components/StatusMessage'
import './GuestConfirmation.css'

function GuestConfirmation() {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState(null)
  const apiUrl = `${import.meta.env.VITE_API_URL || 'https://localhost:7290'}/WeddingGuests`

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
    } catch (err) {
      setError(err.message)
      console.error('❌ Error loading guests:', err)
    } finally {
      setLoading(false)
    }
  }

  // Confirm attendance
  const confirmAttendance = async ({ email, phoneNumber }) => {
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

  // Handle guest selection
  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest)
    // Don't clear confirmation message when selecting a guest
  }

  return (
    <div className="guest-confirmation-page">
      <Header />
      
      <div className="content-wrapper">
        <div>
          <h1>Confirme Sua Presença</h1>
        </div>

        <div className="card">
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#6c757d',
            fontSize: '16px'
          }}>
            <div style={{ 
              marginBottom: '12px',
              fontSize: '32px'
            }}>●</div>
            Carregando convidados...
          </div>
        )}
        
        {error && (
          <div style={{ 
            padding: '16px 20px', 
            background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)', 
            borderRadius: '12px', 
            marginBottom: '20px',
            color: '#721c24',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>⚠ Erro:</div>
            <div>{error}</div>
          </div>
        )}

        {!loading && !error && (
          <>
            <StatusMessage message={confirmMessage} />
            
            <GuestSearch 
              guests={guests}
              onSelectGuest={handleSelectGuest}
            />

            <ConfirmationForm
              selectedGuest={selectedGuest}
              onConfirm={confirmAttendance}
              confirming={confirming}
            />

            {selectedGuest?.isAttending && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '25px',
                  background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                  color: '#155724',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '20px' }}>✓</span>
                  <span>Já confirmado!</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default GuestConfirmation
