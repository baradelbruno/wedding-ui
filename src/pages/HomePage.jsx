import { useState } from 'react'
import './HomePage.css'
import Header from '../components/Header'
import CountdownTimer from '../components/CountdownTimer'
import mainImage from '../Assets/main-image.jpeg'

// Easily configurable address
const VENUE_ADDRESS = "Avenida das Flores, 30 - Distrito do Porto, Capela do Alto - SP, 18195-000"
const WEDDING_DATE = "2026-08-08T15:00:00" // Adjust time as needed

function HomePage() {
  const [addressCopyStatus, setAddressCopyStatus] = useState('')

  // Encode address for Google Maps URL
  const encodedAddress = encodeURIComponent(VENUE_ADDRESS)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`
  // Alternative without API key (using search query):
  const mapUrlAlt = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  const copyAddressToClipboard = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(VENUE_ADDRESS)
        setAddressCopyStatus('Copiado!')
        setTimeout(() => setAddressCopyStatus(''), 2000)
        return
      }

      const textArea = document.createElement('textarea')
      textArea.value = VENUE_ADDRESS
      textArea.setAttribute('readonly', '')
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      setAddressCopyStatus('Copiado!')
      setTimeout(() => setAddressCopyStatus(''), 2000)
    } catch (err) {
      console.error('Erro ao copiar endereço:', err)
      setAddressCopyStatus('Não foi possível copiar')
      setTimeout(() => setAddressCopyStatus(''), 2000)
    }
  }

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="photo-placeholder">
          <img src={mainImage} alt="Wedding Photo" className="main-image" />
          <div className="hero-overlay">
            <div className="hero-overlay-title">Larissa & Bruno</div>
            <div className="hero-overlay-month">08 . 08 . 2026</div>
            <div className="hero-overlay-divider" />
            <div className="hero-overlay-place">Capela do Alto</div>
          </div>
        </div>

        <section className="welcome-section">
          <div className="section-container">
            <h2 className="section-title">Nosso Grande Dia</h2>
            <div className="section-divider"></div>
            <p className="welcome-text">
              É com grande alegria que convidamos você para celebrar conosco este momento tão especial.
              Sua presença tornará nosso dia ainda mais inesquecível.
            </p>
            <CountdownTimer targetDate={WEDDING_DATE} />
          </div>
        </section>

        <section className="location-section">
          <div className="section-container">
            <h2 className="section-title">Local da Cerimônia</h2>
            <div className="section-divider"></div>
            <div className="map-container">
              <iframe
                src={mapUrlAlt}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
              />
            </div>
            
            <div
              className={`address-display${addressCopyStatus ? ' copied' : ''}`}
              role="button"
              tabIndex={0}
              title="Clique para copiar"
              onClick={copyAddressToClipboard}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  copyAddressToClipboard()
                }
              }}
            >
              <svg 
                className="location-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="address-text">{VENUE_ADDRESS}</span>
              {addressCopyStatus && (
                <span className="address-copy-status">{addressCopyStatus}</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
