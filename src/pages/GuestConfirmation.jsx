import { useState, useEffect } from 'react'
import Header from '../components/Header'
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
      console.log('✅ Loaded guests:', data)
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
    setConfirmMessage(null)
  }

  return (
    <div className="guest-confirmation-page">
      <Header />
      
      <div className="content-wrapper">
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
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  background: '#ccc',
                  color: 'white'
                }}>
                  Já confirmado!
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              {guests.length} guest{guests.length !== 1 ? 's' : ''} in the system
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  )
}

export default GuestConfirmation
