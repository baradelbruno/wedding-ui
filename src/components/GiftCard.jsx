import PropTypes from 'prop-types'
import './GiftCard.css'

function GiftCard({ gift, onClick }) {
  const isPurchased = gift.purchases && gift.purchases.length > 0
  
  return (
    <div className="gift-card" onClick={() => onClick(gift)}>
      <div className="gift-card-image">
        {gift.imageUrl ? (
          <img 
            src={gift.imageUrl} 
            alt={gift.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem'
            }}
          />
        ) : (
          <div className="gift-card-placeholder">
            <span>📦</span>
          </div>
        )}
        {isPurchased && (
          <div className="gift-card-badge">Reservado</div>
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
          <span className="gift-card-price">
            R$ {gift.price.toFixed(2).replace('.', ',')}
          </span>
          <button className="gift-card-button">
            {isPurchased ? 'Ver Detalhes' : 'Comprar'}
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
