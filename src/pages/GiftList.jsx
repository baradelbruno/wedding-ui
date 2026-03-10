import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GiftCard from '../components/GiftCard'
import GiftModal from '../components/GiftModal'
import StatusMessage from '../components/StatusMessage'
import { getGifts, purchaseGift } from '../services/api'
import './GiftList.css'

function GiftList() {
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGift, setSelectedGift] = useState(null)

  useEffect(() => {
    loadGifts()
  }, [])

  const loadGifts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getGifts()
      setGifts(data)
    } catch (err) {
      console.error('Erro ao carregar presentes:', err)
      setError('Não foi possível carregar a lista de presentes. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  const handleGiftClick = (gift) => {
    setSelectedGift(gift)
  }

  const handleCloseModal = () => {
    setSelectedGift(null)
  }

  const handlePurchase = async (giftId, purchaseData) => {
    const purchase = await purchaseGift(giftId, purchaseData)
    // Reload gifts to update the purchased status
    await loadGifts()
    return purchase
  }

  return (
    <div className="gift-list-page">
      <Header />
      
      <div className="content-wrapper">
        <div className="gift-list-header">
          <h1>Lista de Presentes</h1>
          <p className="gift-list-subtitle">
            Sua presença é o nosso maior presente! Mas, se desejar nos presentear, ajude-nos a tornar nossa Lua de Mel ainda mais especial.
          </p>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando presentes...</p>
          </div>
        )}

        {error && (
          <StatusMessage 
            type="error" 
            message={error}
          />
        )}

        {!loading && !error && gifts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🎁</span>
            <h3>Nenhum presente disponível</h3>
            <p>Em breve teremos presentes disponíveis para você escolher!</p>
          </div>
        )}

        {!loading && !error && gifts.length > 0 && (
          <div className="gifts-grid">
            {gifts.map(gift => (
              <GiftCard 
                key={gift.id}
                gift={gift}
                onClick={handleGiftClick}
              />
            ))}
          </div>
        )}
      </div>

      {selectedGift && (
        <GiftModal 
          gift={selectedGift}
          onClose={handleCloseModal}
          onPurchase={handlePurchase}
        />
      )}
      <Footer />
    </div>
  )
}

export default GiftList
