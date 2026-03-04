import PropTypes from 'prop-types'
import { getFullImageUrl } from '../utils/imageUtils'
import './GiftCard.css'

function GiftCard({ gift, onClick }) {
  const fullImageUrl = getFullImageUrl(gift.imageUrl)
  const showPrice = typeof gift.price === 'number' && gift.price !== 0
  
  return (
    <div className="gift-card" onClick={() => onClick(gift)}>
      <div className="gift-card-image">
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
            <div className="gift-card-placeholder">
              <span>📦</span>
            </div>
          </>
        ) : (
          <div className="gift-card-placeholder show-placeholder">
            <span>📦</span>
          </div>
        )}
      </div>
      
      <div className="gift-card-content">
        <h3 className="gift-card-title">{gift.name}</h3>
        {gift.description && (
          <p className="gift-card-description">
            {gift.description.length > 80 
              ? `${gift.description.substring(0, 80)}...` 
              : gift.description}
          </p>
        )}
        <div className="gift-card-footer">
          {showPrice && (
            <span className="gift-card-price">
              R$ {gift.price.toFixed(2).replace('.', ',')}
            </span>
          )}
          <button className="gift-card-button">
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

GiftCard.propTypes = {
  gift: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    purchases: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default GiftCard
