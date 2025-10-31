import { LineChart, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'


export default function Navbar() {
    const { pathname } = useLocation()
    return (
      <div className="header">
        <div className="row">
          <LineChart size={22} />
          <h1>StockPulse</h1>
        </div>
  
        <div className="row" style={{ gap: 14 }}>
          <NavButton to="/" active={pathname === "/"}>Home</NavButton>
          <NavButton to="/stock" active={pathname.startsWith("/stock")}>Stock</NavButton>
  
          {/* Profile icon button */}
          <button
            className="btn ghost"
            style={{
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            title="Profile"
          >
            <User size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    )
  }
  

function NavButton({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`btn ${active ? '' : 'ghost'}`}
      style={{textDecoration:'none'}}
    >
      {children}
    </Link>
  )
}
