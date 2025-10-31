import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import StockPage from './components/StockPage'
import StyleGuide from './components/StyleGuide' // accessible directly, but not linked

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<StockPage symbol="NVDA" />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
        {/* Hidden route for A5 evidence; not shown in the app navigation */}
        <Route path="/style" element={<StyleGuide />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
