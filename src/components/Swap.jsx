import { useState } from 'react'

const TABS = ['Uniswap V4 (Monad)', 'Ref Finance (NEAR)']

const MONAD_TOKENS = [
  { symbol: 'WMON', name: 'Wrapped MON', color: '#a259ff' },
  { symbol: 'USDCC', name: 'USD Coin Cross-Chain', color: '#00eaff' },
]

const NEAR_TOKENS = [
  { symbol: 'NEAR', name: 'NEAR Protocol', color: '#00eaff' },
  { symbol: 'USDCC', name: 'USD Coin Cross-Chain', color: '#FFD700' },
]

export default function Swap() {
  const [tab, setTab] = useState(0)
  const [tokenIn, setTokenIn] = useState(0)
  const [tokenOut, setTokenOut] = useState(1)
  const [amountIn, setAmountIn] = useState('')

  const tokens = tab === 0 ? MONAD_TOKENS : NEAR_TOKENS
  const flip = () => { setTokenIn(tokenOut); setTokenOut(tokenIn) }
  const rate = tab === 0 ? 32 : 2.14
  const estimated = amountIn ? (parseFloat(amountIn) * rate).toFixed(4) : ''

  function openDex() {
    if (tab === 0) {
      window.open('https://app.uniswap.org/#/swap?chain=monad&inputCurrency=0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A&outputCurrency=0x85822c2c6F2924Bb211e0eaC24C592e7b7412036', '_blank')
    } else {
      window.open('https://app.ref.finance/#usdcc-token.gemsrock-nft.near|wrap.near', '_blank')
    }
  }

  return (
    <div className="section">
      <h2 className="section-title">SWAP</h2>
      <p className="section-subtitle">{tab === 0 ? 'UNISWAP V4 · MONAD MAINNET · 1% FEE' : 'REF FINANCE · NEAR PROTOCOL'}</p>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div className="card">
          <div className="tabs">
            {TABS.map((t, i) => (
              <button key={i} className={`tab-btn ${tab === i ? 'active' : ''}`} onClick={() => { setTab(i); setTokenIn(0); setTokenOut(1); setAmountIn('') }}>{t}</button>
            ))}
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginBottom: '4px', border: '1px solid rgba(200,150,12,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label">YOU PAY</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,229,102,0.4)' }}>Balance: —</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="token-select" style={{ minWidth: '110px', borderColor: `${tokens[tokenIn].color}44` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tokens[tokenIn].color, boxShadow: `0 0 6px ${tokens[tokenIn].color}`, display: 'inline-block' }} />
                {tokens[tokenIn].symbol}
              </div>
              <input className="input-field" placeholder="0.0" value={amountIn} onChange={e => setAmountIn(e.target.value)} type="number" style={{ fontSize: '1.3rem', fontWeight: 700 }} />
            </div>
          </div>

          <div className="arrow-down" onClick={flip}>⇅</div>

          <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '16px', marginTop: '4px', border: '1px solid rgba(200,150,12,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="input-label">YOU RECEIVE</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,229,102,0.4)' }}>Balance: —</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="token-select" style={{ minWidth: '110px', borderColor: `${tokens[tokenOut].color}44` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tokens[tokenOut].color, boxShadow: `0 0 6px ${tokens[tokenOut].color}`, display: 'inline-block' }} />
                {tokens[tokenOut].symbol}
              </div>
              <input className="input-field" placeholder="0.0" value={estimated} readOnly style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--green-toxic)' }} />
            </div>
          </div>

          {amountIn && (
            <div style={{ margin: '1rem 0', padding: '12px', background: 'rgba(162,89,255,0.05)', border: '1px solid rgba(162,89,255,0.2)', borderRadius: '10px', fontSize: '0.78rem' }}>
              {[
                { label: 'Rate', val: tab === 0 ? `1 ${tokens[tokenIn].symbol} ≈ ${rate} ${tokens[tokenOut].symbol}` : `1 USDCC ≈ ${rate} NEAR` },
                { label: 'DEX', val: tab === 0 ? 'Uniswap V4 · Monad' : 'Ref Finance · NEAR' },
                { label: 'Price Impact', val: '< 0.1%' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: 'rgba(255,229,102,0.45)', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>{r.label}</span>
                  <span style={{ color: 'rgba(255,229,102,0.8)', fontFamily: 'monospace' }}>{r.val}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn-iridescent" style={{ width: '100%', marginTop: '0.5rem' }} onClick={openDex}>
            ⇄ SWAP ON {tab === 0 ? 'UNISWAP V4' : 'REF FINANCE'} ↗
          </button>

          <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(0,234,255,0.04)', border: '1px solid rgba(0,234,255,0.15)', borderRadius: '8px', fontSize: '0.7rem', color: 'rgba(0,234,255,0.7)', textAlign: 'center', fontFamily: 'Orbitron', letterSpacing: '1px' }}>
            {tab === 0 ? '⬡ MONAD MAINNET · CHAIN ID 143' : '◎ NEAR PROTOCOL · MAINNET'}
          </div>
        </div>

        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem' }}>📊 POOL INFO</div>
          {tab === 0 ? (
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
          ) : (
            <div className="grid-2">
              {[
                { label: 'Chain', val: 'NEAR Mainnet' },
                { label: 'DEX', val: 'Ref Finance (RHEA)' },
                { label: 'Pair', val: 'USDCC/NEAR' },
                { label: 'Token', val: 'usdcc-token.gemsrock-nft.near' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '4px 0', borderBottom: '1px solid rgba(200,150,12,0.08)' }}>
                  <span style={{ color: 'rgba(255,229,102,0.45)', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px' }}>{p.label}</span>
                  <span style={{ color: 'var(--gold-bright)', fontSize: '0.65rem' }}>{p.val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
