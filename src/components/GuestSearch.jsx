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
    <div style={{ marginBottom: '30px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Digite o seu nome"
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '16px',
            borderRadius: '12px',
            border: '2px solid #e9ecef',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            outline: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', sans-serif'
          }}
          onFocus={(e) => e.target.style.borderColor = '#7a0000'}
          onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
        />
        
        {searchTerm && filteredGuests.length > 0 && !selectedGuest && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            maxHeight: '300px',
            overflowY: 'auto',
            background: 'white',
            borderRadius: '12px',
            marginTop: '5px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            zIndex: 1000
          }}>
            {filteredGuests.map(guest => (
              <div
                key={guest.id}
                onClick={() => handleSelectGuest(guest)}
                style={{
                  padding: '16px 20px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f3f5',
                  transition: 'background 0.2s ease',
                  fontSize: '15px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                {guest.name}
              </div>
            ))}
          </div>
        )}

        {searchTerm && filteredGuests.length === 0 && (
          <div style={{
            marginTop: '12px',
            padding: '16px',
            background: '#fff3cd',
            borderRadius: '12px',
            color: '#856404',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Nenhum convidado encontrado com "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestSearch
