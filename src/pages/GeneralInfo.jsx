import { useState } from 'react'
import Header from '../components/Header'
import './GeneralInfo.css'

// Easily configurable address
const VENUE_ADDRESS = "Avenida das Flores, 30 - Distrito do Porto, Capela do Alto - SP, 18195-000"

function GeneralInfo() {
  const [addressCopyStatus, setAddressCopyStatus] = useState('')

  const encodedAddress = encodeURIComponent(VENUE_ADDRESS)
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
    <div className="general-info-page">
      <Header />

      <main className="general-info-content">
        <h1 className="general-info-title">Informações Gerais</h1>

        <section className="general-info-section" aria-label="Detalhes do evento">
          <p className="general-info-line">
            <span className="general-info-label">Data:</span> 8 . 8 .2026
          </p>
          <p className="general-info-line">
            <span className="general-info-label">Horário:</span> 15h30
          </p>
          <p className="general-info-line">
            <span className="general-info-label">Local:</span> {VENUE_ADDRESS}
          </p>

          <div className="general-info-subtitle">Dicas Gerais:</div>
          <ul className="general-info-list">
            <li>A cerimônia e a recepção será ao ar livre. Venha com sapato apropriado para grama.</li>
            <li>À noite, costuma fazer frio na região. Recomendamos trazer uma blusa.</li>
          </ul>

        <div className="general-info-subtitle">Sugestões de Hospedagem:</div>
          <ul className="general-info-list">
            <li>Capela do Alto é a cidade mais próxima, a cerca de 15 minutos da festa.</li>
            <li>Sorocaba é a cidade com maior oferta de hotéis, a cerca de uma hora de distância.</li>
          </ul>
        </section>

        <div className="location-section" aria-label="Mapa e endereço">
          <div className="map-container">
            <iframe
              src={mapUrlAlt}
              width="100%"
              height="400"
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
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="address-text">{VENUE_ADDRESS}</span>
            {addressCopyStatus && (
              <span className="address-copy-status">{addressCopyStatus}</span>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default GeneralInfo
