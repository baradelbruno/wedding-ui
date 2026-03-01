import { useState } from 'react'

function GuestSearch({ guests, onSelectGuest }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuest, setSelectedGuest] = useState(null)

  // Filter guests based on search term
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest)
    setSearchTerm(guest.name)
    onSelectGuest(guest)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setSelectedGuest(null)
    onSelectGuest(null)
  }

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
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

        {searchTerm && filteredGuests.length === 0 && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            background: '#fff3cd',
            borderRadius: '4px',
            color: '#856404'
          }}>
            No guests found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestSearch
