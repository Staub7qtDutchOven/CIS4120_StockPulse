import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TRENDING = ['NVDA','AAPL','MSFT','TSLA','AMD','GOOGL']

export default function Home() {
  const [ticker, setTicker] = useState('')
  const navigate = useNavigate()

  const go = (e) => {
    e?.preventDefault?.()
    const sym = (ticker || '').trim().toUpperCase()
    if (!sym) return
    navigate(`/stock/${encodeURIComponent(sym)}`)
  }

  return (
    <div style={{marginTop:16}}>
      <div className="card" style={{marginBottom:16}}>
        <h2 style={{marginBottom:8}}>Welcome</h2>
        <p className="small">Search a ticker to view price and join the live discussion.</p>
        <form onSubmit={go} className="row" style={{gap:10, marginTop:10}}>
          <input
            className="input"
            style={{maxWidth:260}}
            placeholder="Enter ticker (e.g., NVDA)"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
          />
          <button className="btn" type="submit">Open</button>
        </form>
      </div>

      <div className="card">
        <h3>Trending</h3>
        <div className="row" style={{flexWrap:'wrap', gap:10, marginTop:10}}>
          {TRENDING.map(t => (
            <button
              key={t}
              className="tab"
              onClick={() => navigate(`/stock/${t}`)}
              style={{border:'none'}}
              aria-label={`Open ${t}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
