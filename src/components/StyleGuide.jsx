import { User, Camera, Square, Plus, X } from 'lucide-react'

export default function StyleGuide() {
  return (
    <div>
      <h2>Style Guide</h2>
      <p className="small">Colors, fonts, and icons used across StockPulse.</p>

      <section style={{marginTop: 16}}>
        <h3>Color Scheme</h3>
        <div className="row" style={{flexWrap: 'wrap', gap: 12, marginTop: 8}}>
          {[
            ['Primary','--primary'],
            ['Secondary','--secondary'],
            ['Accent 1','--accent1'],
            ['Accent 2','--accent2'],
            ['Accent 3','--accent3'],
            ['Success','--success'],
            ['Error','--error'],
          ].map(([label, varname]) => (
            <Swatch key={label} label={label} cssVar={varname} />
          ))}
        </div>
      </section>

      <section style={{marginTop: 20}}>
        <h3>Fonts</h3>
        <div className="row" style={{gap: 24, alignItems:'flex-end'}}>
          <div>
            <div style={{fontFamily:'Outfit', fontWeight:700, fontSize:24}}>Outfit 700 (Headers)</div>
            <div style={{fontFamily:'Outfit', fontWeight:500, fontSize:18}}>Outfit 500</div>
          </div>
          <div>
            <div style={{fontFamily:'Inter', fontWeight:600, fontSize:20}}>Inter 600</div>
            <div style={{fontFamily:'Inter', fontWeight:400, fontSize:16}}>Inter 400 (Body)</div>
          </div>
        </div>
      </section>

      <section style={{marginTop: 20}}>
        <h3>Iconography (Lucide)</h3>
        <div className="row" style={{gap: 18, marginTop: 8}}>
          <X /><User /><Camera /><Square /><Plus />
        </div>
      </section>
    </div>
  )
}

function Swatch({ label, cssVar }) {
  return (
    <div style={{width: 130}}>
      <div
        style={{
          width: '100%',
          height: 48,
          borderRadius: 10,
          background: `var(${cssVar})`,
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      />
      <div className="small" style={{marginTop:6}}>{label}</div>
    </div>
  )
}
