import Header from '../components/Header'
import './GiftList.css'

function GiftList() {
  return (
    <div className="gift-list-page">
      <Header />
      
      <div className="content-wrapper">
        <div>
          <h1>Lista de Presentes</h1>
        </div>

        <div className="card">
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          Em breve você poderá vizualizar a lista de presentes aqui!
        </p>
      </div>
      </div>
    </div>
  )
}

export default GiftList
