import './HomePage.css'
import Header from '../components/Header'
import mainImage from '../Assets/main-image.jpg'

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="photo-placeholder">
          <img src={mainImage} alt="Wedding Photo" className="main-image" />
        </div>
      </main>
    </div>
  )
}

export default HomePage
