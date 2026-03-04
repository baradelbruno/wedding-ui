import { useState } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode'
import { getFullImageUrl } from '../utils/imageUtils'
import './GiftModal.css'

function GiftModal({ gift, onClose, onPurchase }) {
  const [purchaseData, setPurchaseData] = useState({
    purchasedBy: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState('form')
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('')

  const fullImageUrl = getFullImageUrl(gift.imageUrl)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPurchaseData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContinuePurchase = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const purchase = await onPurchase(gift.id, purchaseData)

      const pixPaymentCode = (purchase?.pixCode || '').trim()
      if (!pixPaymentCode) {
        alert('PIX não configurado para este presente.')
        return
      }

      const dataUrl = await QRCode.toDataURL(pixPaymentCode, {
        width: 280,
        margin: 1,
      })

      setQrCodeDataUrl(dataUrl)
      setStep('pix')
    } catch (error) {
      console.error('Erro ao comprar presente:', error)
      alert('Erro ao processar compra. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target.className === 'gift-modal-backdrop') {
      onClose()
    }
  }

  return (
    <div className="gift-modal-backdrop" onClick={handleBackdropClick}>
      <div className="gift-modal">
        <button className="gift-modal-close" onClick={onClose}>×</button>
        
        <div className="gift-modal-content">
          <div className="gift-modal-image">
            {fullImageUrl ? (
              <>
                <img 
                  src={fullImageUrl} 
                  alt={gift.name}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling?.classList.add('show-placeholder')
                  }}
                />
                <div className="gift-modal-placeholder">
                  <span>📦</span>
                </div>
              </>
            ) : (
              <div className="gift-modal-placeholder show-placeholder">
                <span>📦</span>
              </div>
            )}
          </div>

          <div className="gift-modal-info">
            <h2>{gift.name}</h2>
            {gift.description && (
              <p className="gift-modal-description">{gift.description}</p>
            )}
            
            <div className="gift-modal-price">
              <span className="price-label">Valor:</span>
              <span className="price-value">R$ {gift.price.toFixed(2).replace('.', ',')}</span>
            </div>

            {step === 'form' ? (
              <form className="gift-modal-form" onSubmit={handleContinuePurchase}>
                <h3>Comprar este Presente</h3>
                
                <div className="form-group">
                  <label htmlFor="purchasedBy">Seu Nome *</label>
                  <input
                    type="text"
                    id="purchasedBy"
                    name="purchasedBy"
                    value={purchaseData.purchasedBy}
                    onChange={handleInputChange}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={purchaseData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={purchaseData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <button 
                  type="submit" 
                  className="gift-modal-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : 'Continuar compra'}
                </button>
              </form>
            ) : (
              <div className="gift-modal-pix">
                <h3>Pagamento via PIX</h3>
                <p className="gift-modal-pix-instructions">Escaneie o QR Code para concluir o pagamento.</p>
                {qrCodeDataUrl ? (
                  <img className="gift-modal-pix-qr" src={qrCodeDataUrl} alt="QR Code PIX" />
                ) : (
                  <p className="gift-modal-pix-instructions">Gerando QR Code...</p>
                )}
                <button type="button" className="gift-modal-submit" onClick={onClose}>
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

GiftModal.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    purchases: PropTypes.array,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onPurchase: PropTypes.func.isRequired,
}

export default GiftModal
