import { useState } from 'react'

const TOKENS = [
  { symbol: 'WMON', name: 'Wrapped MON', color: '#a259ff' },
  { symbol: 'USDCC', name: 'USD Coin Cross-Chain', color: '#00eaff' },
]

export default function Swap() {
  const [tokenIn, setTokenIn] = useState(0)
  const [tokenOut, setTokenOut] = useState(1)
  const [amountIn, setAmountIn] = useState('')

  const flip = () => { setTokenIn(tokenOut); setTokenOut(tokenIn) }
  const estimated = amountIn ? (parseFloat(amountIn) * 32).toFixed(4) : ''

  return (
    <div className="section">
      <h2 className="section-title">SWAP</h2>
      <p className="section-subtitle">UNISWAP V4 · MONAD MAINNET · 1% FEE TIER</p>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div className="card">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            {['Uniswap V4', 'Ref Finance'].map((dex, i) => (
              <button key={i} className={`tab-btn ${i === 0 ? 'active' : ''}`} style={{ flex: 1, padding: '8px' }}>
                {dex}
              </button>
            ))}
          </div>

          {/* Token In */}
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginBottom: '4px', border: '1px solid rgba(200,150,12,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label">YOU PAY</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,229,102,0.4)' }}>Balance: —</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="token-select" style={{ minWidth: '110px', borderColor: `${TOKENS[tokenIn].color}44` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: TOKENS[tokenIn].color, boxShadow: `0 0 6px ${TOKENS[tokenIn].color}`, display: 'inline-block' }} />
                {TOKENS[tokenIn].symbol}
              </div>
              <input className="input-field" placeholder="0.0" value={amountIn} onChange={e => setAmountIn(e.target.value)} type="number" style={{ fontSize: '1.3rem', fontWeight: 700 }} />
            </div>
          </div>

          <div className="arrow-down" onClick={flip}>⇅</div>

          {/* Token Out */}
          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginTop: '4px', border: '1px solid rgba(200,150,12,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label">YOU RECEIVE</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,229,102,0.4)' }}>Balance: —</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="token-select" style={{ minWidth: '110px', borderColor: `${TOKENS[tokenOut].color}44` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: TOKENS[tokenOut].color, boxShadow: `0 0 6px ${TOKENS[tokenOut].color}`, display: 'inline-block' }} />
                {TOKENS[tokenOut].symbol}
              </div>
              <input className="input-field" placeholder="0.0" value={estimated} readOnly style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--green-toxic)' }} />
            </div>
          </div>

          {/* Route Info */}
          {amountIn && (
            <div style={{ margin: '1rem 0', padding: '12px', background: 'rgba(162,89,255,0.05)', border: '1px solid rgba(162,89,255,0.2)', borderRadius: '10px', fontSize: '0.78rem' }}>
              {[
                { label: 'Rate', val: `1 ${TOKENS[tokenIn].symbol} = 32 ${TOKENS[tokenOut].symbol}` },
                { label: 'Pool', val: 'Uniswap V4 · WMON/USDCC · 1%' },
                { label: 'Price Impact', val: '< 0.01%' },
                { label: 'Pool Manager', val: '0xb362A2b8...180048' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: 'rgba(255,229,102,0.45)', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>{r.label}</span>
                  <span style={{ color: 'rgba(255,229,102,0.8)', fontFamily: 'monospace' }}>{r.val}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn-iridescent" style={{ width: '100%', marginTop: '0.5rem' }}>
            ⇄ SWAP {TOKENS[tokenIn].symbol} → {TOKENS[tokenOut].symbol}
          </button>

          <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(0,234,255,0.04)', border: '1px solid rgba(0,234,255,0.15)', borderRadius: '8px', fontSize: '0.72rem', color: 'rgba(0,234,255,0.7)', textAlign: 'center', fontFamily: 'Orbitron', letterSpacing: '1px' }}>
            ℹ SWAP VIA UNISWAP V4 APP → 
            <a href="https://app.uniswap.org" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', marginLeft: '6px' }}>app.uniswap.org ↗</a>
          </div>
        </div>

        {/* Pool Info */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem' }}>📊 POOL INFO · USDCC/WMON</div>
          <div className="grid-2">
            {[
              { label: 'Chain', val: 'Monad Mainnet' },
              { label: 'DEX', val: 'Uniswap V4' },
              { label: 'Fee Tier', val: '1%' },
              { label: 'Tick Spacing', val: '200' },
              { label: 'token0', val: 'WMON' },
              { label: 'token1', val: 'USDCC' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '4px 0', borderBottom: '1px solid rgba(200,150,12,0.08)' }}>
                <span style={{ color: 'rgba(255,229,102,0.45)', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>{p.label}</span>
                <span style={{ color: 'var(--gold-bright)' }}>{p.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
