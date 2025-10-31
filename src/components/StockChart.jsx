import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  } from 'recharts'
  
  /** series: [{ time: '09:30', price: 142.12 }, ...] */
  export default function StockChart({ series = [] }) {
    // If no data yet, draw with a tiny mock to avoid empty state jump
    const data = series?.length ? series : [
      { time: '09:30', price: 140.0 },
      { time: '10:00', price: 141.2 },
      { time: '10:30', price: 139.7 },
      { time: '11:00', price: 142.5 },
    ]
  
    return (
      <div style={{height: 320}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="time"
              tick={{ fill: '#E5EFF7' }}
              tickLine={false}
              axisLine={{ stroke: '#BFD3E0' }}
            />
            <YAxis
              tick={{ fill: '#E5EFF7' }}
              tickLine={false}
              axisLine={{ stroke: '#BFD3E0' }}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              contentStyle={{ background: '#0f1a36', border: '1px solid #2a3658', borderRadius: 8 }}
              labelStyle={{ color: '#BFD3E0' }}
              itemStyle={{ color: '#5BC0BE' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#5BC0BE"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="small" style={{marginTop: 6}}>Time (x) vs Price (y)</div>
      </div>
    )
  }
  