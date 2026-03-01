import { useNavigate, useLocation } from 'react-router-dom'
import './Header.css'
import logo from '../Assets/logo.png'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Wedding Logo" className="logo-image" />
      </div>
      
      {isHomePage ? (
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
      ) : (
        <nav className="nav-buttons">
          <button 
            className="nav-button back-button"
            onClick={() => navigate('/')}
          >
            ← Voltar
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
