// Simple plausible intraday line for demos
export function mockSeries() {
    const base = 142.0
    const pts = []
    let t = new Date()
    t.setMinutes(t.getMinutes() - 45)
    let cur = base
    for (let i = 0; i < 8; i++) {
      cur = cur + (Math.random() * 1.2 - 0.4) // tiny random walk
      pts.push({ time: timeLabel(new Date(t)), price: parseFloat(cur.toFixed(2)) })
      t.setMinutes(t.getMinutes() + 6)
    }
    return pts
  }
  
  function timeLabel(d) {
    const hh = d.getHours().toString().padStart(2,'0')
    const mm = d.getMinutes().toString().padStart(2,'0')
    return `${hh}:${mm}`
  }
  