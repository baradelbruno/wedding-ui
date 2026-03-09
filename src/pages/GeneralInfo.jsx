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
            <span className="general-info-label">Data:</span> 8 de Agosto de 2026
          </p>
          <p className="general-info-line">
            <span className="general-info-label">Horário:</span> 15h30
          </p>
          <p className="general-info-line">
            <span className="general-info-label">Local:</span> {VENUE_ADDRESS}
          </p>

          <div className="general-info-subtitle">Dicas Gerais:</div>
          <ul className="general-info-list">
            <li>A cerimônia e a festa serão, majoritariamente, ao ar livre. Venha com sapato apropriado para grama.</li>
            <li>À noite, costuma fazer frio na região. Estamos preparando maneiras de mantê-los aquecidos, mas recomendamos trazer uma blusa.</li>
            <li>Não há Ubers no local. Organize o transporte com antecedência.</li>
            <li>Será possível estacionar na rua em frente à chacara.</li>
          </ul>

        <div className="general-info-subtitle">Sugestões de Hospedagem:</div>
          <ul className="general-info-list">
            <li><strong>Capela do Alto (~15 min):</strong></li>
            <li className="indent"><a href="https://www.airbnb.com.br/rooms/1367587629472932185?adults=2&check_in=2026-08-08&check_out=2026-08-09&search_mode=regular_search&source_impression_id=p3_1773027285_P3JBOI6XLoFNp3-b&previous_page_section_name=1000&federated_search_id=45cad73b-b66a-40bd-a846-2450de81bbfa" target="_blank" rel="noopener noreferrer">Pousada Sunrise Container</a> - Airbnb - R$ 600/noite - 10 km - 15 min</li>
            <li className="indent"><a href="https://www.airbnb.com.br/rooms/1116706064661613134?adults=2&check_in=2026-08-08&check_out=2026-08-09&search_mode=regular_search&source_impression_id=p3_1773028193_P36Uh9Vf8S3VF0Kw&previous_page_section_name=1001&federated_search_id=0c9acae2-b3b1-43fe-8def-ebc59e4350cc" target="_blank" rel="noopener noreferrer">Casa em Capela do Alto para 15 hóspedes</a> - Airbnb - R$ 1718/noite - 10 km - 15 min</li>
            <li className="indent"><a href="https://www.airbnb.com.br/rooms/1601450781578629389?adults=2&check_in=2026-08-08&check_out=2026-08-09&search_mode=regular_search&source_impression_id=p3_1773027818_P3XrGig-W6MphoXQ&previous_page_section_name=1001&federated_search_id=da8ddc60-ae4e-4bee-b06c-0446b0b0e727" target="_blank" rel="noopener noreferrer">Casa em Condomínio Fechado para 8 hóspedes</a> - Airbnb - R$2049/noite - 2 km - 5 min</li>
            
            <li><strong>Sorocaba (~40min):</strong></li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/sorocaba-park.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCGnNlYXJjaF9zb3JvY2FiYSBwYXJrIGhvdGVsSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKu-rjNBsACAdICJDE2ZDc4NjRkLWI0MjMtNGIwMC1iODE5LWM3NzUyNWVlNDZhMdgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&all_sr_blocks=29706517_88967897_0_1_0&checkin=2026-08-08&checkout=2026-08-09&dest_id=297065&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=29706517_88967897_0_1_0&hpos=1&matching_block_id=29706517_88967897_0_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=29706517_88967897_0_1_0__38304&srepoch=1773026639&srpvid=6a7f17e554a70260&type=total&ucfs=1&" target="_blank" rel="noopener noreferrer">Sorocaba Park Hotel</a> - 4★ - R$ 350-450/noite - 45 km - 44 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/chamonix-plaza.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCMXNlYXJjaF9pYmlzIHN0eWxlcyBob3RlbHMgc2FudGEgcm9zw6FsaWEgc29yb2NhYmFIM1gEaCCIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4ApH7uM0GwAIB0gIkMjUyZjczZDYtZjlmNi00NzMzLTllZDUtNmE2MjBkNjhmYjk52AIB4AIB&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026710&srpvid=52401808333a0285&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Ibis Styles Hotels Santa Rosália</a> - 3★ - R$ 250-350/noite - 47 km - 40 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/ibis-sorocaba.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCFHNlYXJjaF9pYmlzIHNvcm9jYWJhSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALB-7jNBsACAdICJGIyZjgzZTI2LWE1MjQtNDcwZS05NGIzLWM1MjYwMWUxYTFjMtgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026756&srpvid=8f4d1820274402d3&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Ibis Sorocaba</a> - 3★ - R$ 280-400/noite - 37 km - 33 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/ibis-budget-sorocaba.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCG3NlYXJjaF9pYmlzIGJ1ZGdldCBzb3JvY2FiYUgzWARoIIgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAagCAbgC1fu4zQbAAgHSAiRlM2E4OGJiZC03MWQ1LTQ4MjAtYjg5Yi03NTEwYmYzNzI3ZGXYAgHgAgE&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026777&srpvid=85cd182aa16d02f8&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Ibis Budget Sorocaba</a> - 2★ - R$ 200-300/noite - 38 km - 34 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/all-inn-sorocoba-sorocaba.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCF3NlYXJjaF9hbGwgaW5uIHNvcm9jYWJhSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALx-7jNBsACAdICJDdkNzUyY2YwLTBkZmMtNDhhNC04MGNmLTI1MmJmZGQ0ZjRkM9gCAeACAQ&ucfs=1&arphpl=1&checkin=2026-08-08&checkout=2026-08-09&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=popularity&srpvid=4a341838aced01d0&srepoch=1773026805&soh=1&from=searchresults#no_availability_msg" target="_blank" rel="noopener noreferrer">All Inn Sorocaba</a> - 3★ - R$ 350-450/noite - 50 km - 45 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/transamerica-flat-the-first.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCJnNlYXJjaF90cmFuc2FtZXJpY2EgZXhlY3V0aXZlIHNvcm9jYWJhSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKK_LjNBsACAdICJDc4NGYxMjc0LTQxYTAtNDE3Ny04ZTllLWM2OGYxMTY5MzFjN9gCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026830&srpvid=0a9e1845154901b3&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Transamerica Executive Sorocaba</a> - 4★ - R$ 380-500/noite - 37 km - 32 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/shelton-inn-sorocaba.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCF3NlYXJjaF9kYW4gaW5uIHNvcm9jYWJhSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKK_LjNBsACAdICJGM5NDJlODlmLTcyMjktNGQ4NC1hNGI2LWUyMDNlNDZhZThiZNgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026837&srpvid=67c418453c73022d&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Dan Inn Sorocaba</a> - 3★ - R$ 300-450/noite - 39 km - 39 min</li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/novotel-sorocaba.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCF3NlYXJjaF9ub3ZvdGVsIHNvcm9jYWJhSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKL_LjNBsACAdICJGYzZjI1NGRlLWRmMDMtNGNhMS04NDM4LTVlMGMyNWQxZGNlZNgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026897&srpvid=c650184590f9014a&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Novotel Sorocaba</a> - 4★ - R$ 550-700/noite - 38 km - 34 min</li>

            <li><strong>Araçoiaba da Serra (~30 min):</strong></li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/fazenda-reviver.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCJnNlYXJjaF9ob3RlbCBmYXplbmRhIGVzdMOibmNpYSByZXZpdmVySDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKT_bjNBsACAdICJDM0OTAyYjljLWM1ZTEtNGMyNC1iNjY1LTMyN2RhNWRjZWJiMtgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773026968&srpvid=f0df18899afa00b1&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Hotel Fazenda Estância Reviver - Pensão Completa</a> - 4★ - R$ 900-1000/noite - 20 km - 27 min</li>

            <li><strong>Tatuí (~35 min):</strong></li>
            <li className="indent"><a href="https://www.booking.com/hotel/br/colonial-flat.pt-br.html?aid=304142&label=gen173nr-10CAQoggJCL3NlYXJjaF9yZWRlIHVuaWhvdGVsIGhvdGVsIGNvbG9uaWFsIGZsYXQgdGF0dcOtSDNYBGggiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKN_rjNBsACAdICJGU3MTU5Yjc3LTMxOGYtNGJlNC04ZDUwLTUzNWRhMDQ3MjRhMtgCAeACAQ&sid=0e23c7a422525ea66847dce70af052d6&checkin=2026-08-08&checkout=2026-08-09&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1773027089&srpvid=440f18c6a3230c3d&type=total&ucfs=1&#no_availability_msg" target="_blank" rel="noopener noreferrer">Rede UniHotel - Hotel Colonial Flat</a> - 3★ - R$ 350/noite - 38 km - 37 min</li>
            <li className="indent"><a href="https://hoteldelfiol.com.br/" target="_blank" rel="noopener noreferrer">Hotel Del Fiol</a> - 3★ - R$ 270-350/noite - 39 km - 33 min</li>
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
