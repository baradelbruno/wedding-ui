import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import GuestConfirmation from './pages/GuestConfirmation'
import GiftList from './pages/GiftList'
import GeneralInfo from './pages/GeneralInfo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirmar-presenca" element={<GuestConfirmation />} />
        <Route path="/lista-presentes" element={<GiftList />} />
        <Route path="/informacoes-gerais" element={<GeneralInfo />} />
      </Routes>
    </Router>
  )
}

export default App
