import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import logo from '../Assets/logo.png'
import mainImage from '../Assets/main-image.jpg'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Wedding Logo" className="logo-image" />
        </div>
        <nav className="nav-buttons">
          <button 
            className="nav-button"
            onClick={() => navigate('/confirmar-presenca')}
          >
            Confirmar Presença
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/lista-presentes')}
          >
            Lista de Presentes
          </button>
        </nav>
      </header>
      
      <main className="main-content">
        <div className="photo-placeholder">
          <img src={mainImage} alt="Wedding Photo" className="main-image" />
        </div>
      </main>
    </div>
  )
}

export default HomePage
