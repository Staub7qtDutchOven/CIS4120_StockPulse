import { useEffect, useMemo, useState } from 'react'
import { mockSeries } from '../data/mockPrices'

/**
 * Attempts to fetch recent intraday prices for a symbol.
 * Falls back to mock data if:
 *  - no API key is provided
 *  - request fails (CORS, network, etc.)
 *
 * Usage: const { series, latest, changePct, loading } = useStockData('NVDA')
 */
export default function useStockData(symbol = 'NVDA') {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      setLoading(true)

      // Example: Finnhub (requires an API key); you can swap to any provider you prefer.
      const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY
      const url = FINNHUB_KEY
        ? `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
        : null

      try {
        if (url) {
          const r = await fetch(url)
          if (!r.ok) throw new Error('bad response')
          const data = await r.json()
          // Finnhub returns: c (current), pc (previous close). We'll synthesize a tiny series.
          const now = new Date()
          const base = data.pc ?? 100
          const cur = data.c ?? base
          const pts = [
            { time: timeLabel(offsetMin(now, -45)), price: base * 0.997 },
            { time: timeLabel(offsetMin(now, -30)), price: base * 1.002 },
            { time: timeLabel(offsetMin(now, -15)), price: (base + cur) / 2 },
            { time: timeLabel(now),                price: cur },
          ]
          if (!cancelled) setSeries(pts)
        } else {
          // Fallback mock data
          if (!cancelled) setSeries(mockSeries())
        }
      } catch (e) {
        // Fallback mock on any failure
        if (!cancelled) setSeries(mockSeries())
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => { cancelled = true }
  }, [symbol])

  const latest = useMemo(() => series.at(-1)?.price, [series])
  const first = useMemo(() => series[0]?.price, [series])

  const changePct = useMemo(() => {
    if (!latest || !first) return 0
    return ((latest - first) / first) * 100
  }, [latest, first])

  return { series, latest, changePct, loading }
}

function timeLabel(d) {
  const hh = d.getHours().toString().padStart(2,'0')
  const mm = d.getMinutes().toString().padStart(2,'0')
  return `${hh}:${mm}`
}
function offsetMin(d, m) {
  const t = new Date(d)
  t.setMinutes(t.getMinutes() + m)
  return t
}
