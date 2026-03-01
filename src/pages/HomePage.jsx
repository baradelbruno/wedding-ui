import { useNavigate } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          Logo
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
          <span>Photo placeholder</span>
        </div>
      </main>
    </div>
  )
}

export default HomePage
