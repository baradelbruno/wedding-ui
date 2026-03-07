import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'
import logo from '../Assets/logo.png'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Wedding Logo" className="logo-image" />
        </div>
        
        {isHomePage ? (
          <nav className="nav-buttons">
            <button 
              className="nav-button primary"
              onClick={() => navigate('/confirmar-presenca')}
            >
              Confirmar Presença
            </button>
            <button 
              className="nav-button secondary"
              onClick={() => navigate('/lista-presentes')}
            >
              Lista de Presentes
            </button>
            <button 
              className="nav-button secondary"
              onClick={() => navigate('/informacoes-gerais')}
            >
              Informações Gerais
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
      </div>
    </header>
  )
}

export default Header
