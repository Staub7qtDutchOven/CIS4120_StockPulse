import { useParams } from 'react-router-dom'
import useStockData from '../hooks/useStockData'
import StockChart from './StockChart'
import DiscussionFeed from './DiscussionFeed'

export default function StockPage({ symbol: propSymbol }) {
  const params = useParams()
  const symbol = (params.symbol || propSymbol || 'NVDA').toUpperCase()
  const { series, latest, changePct, loading } = useStockData(symbol)

  const up = (changePct ?? 0) >= 0
  const priceText = loading
    ? 'Loading…'
    : `$${(latest ?? 0).toFixed(2)} • ${(changePct >= 0 ? '+' : '')}${(changePct ?? 0).toFixed(2)}%`

  return (
    <div className="grid" style={{marginTop:16}}>
      <div className="card">
        <h3 style={{marginBottom:8}}>{symbol}</h3>
        <div className={`badge ${up ? 'price-up' : 'price-down'}`} style={{marginBottom:10}}>
          {priceText}
        </div>
        <StockChart series={series} />
      </div>
      <div className="card">
        <DiscussionFeed />
      </div>
    </div>
  )
}
