import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'
import logo from '../Assets/logo.png'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        {/* Hamburger Menu Icon - Only on mobile when scrolled and menu closed */}
        {isScrolled && !isMobileMenuOpen && (
          <button 
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Wedding Logo" className="logo-image" />
        </div>
        
        {isHomePage ? (
          <nav className={`nav-buttons ${isScrolled ? 'hide-on-mobile-scrolled' : ''}`}>
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
          <nav className={`nav-buttons ${isScrolled ? 'hide-on-mobile-scrolled' : ''}`}>
            <button 
              className="nav-button back-button"
              onClick={() => navigate('/')}
            >
              ← Voltar
            </button>
          </nav>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay" 
            onClick={toggleMobileMenu}
            role="button"
            tabIndex={0}
            aria-label="Fechar menu"
          ></div>
          <nav className="mobile-menu" role="navigation" aria-label="Menu principal">
            <div className="mobile-menu-header">
              <img src={logo} alt="Logo" className="mobile-menu-logo" />
              <button 
                className="close-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="mobile-menu-content">
              {isHomePage ? (
                <>
                  <button 
                    className="nav-button primary"
                    onClick={() => handleNavigation('/confirmar-presenca')}
                  >
                    <span className="nav-button-text">Confirmar Presença</span>
                  </button>
                  <button 
                    className="nav-button secondary"
                    onClick={() => handleNavigation('/lista-presentes')}
                  >
                    <span className="nav-button-text">Lista de Presentes</span>
                  </button>
                  <button 
                    className="nav-button secondary"
                    onClick={() => handleNavigation('/informacoes-gerais')}
                  >
                    <span className="nav-button-text">Informações Gerais</span>
                  </button>
                </>
              ) : (
                <button 
                  className="nav-button back-button"
                  onClick={() => handleNavigation('/')}
                >
                  <span className="nav-button-text">← Voltar</span>
                </button>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}

export default Header
