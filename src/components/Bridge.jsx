import { useState } from 'react'

export default function Bridge() {
  const [direction, setDirection] = useState('near-to-monad')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [status, setStatus] = useState(null)

  const isNearToMonad = direction === 'near-to-monad'

  const handleBridge = () => {
    if (!amount) return
    setStatus('pending')
    setTimeout(() => setStatus('instructions'), 1000)
  }

  return (
    <div className="section">
      <h2 className="section-title">CROSS-CHAIN BRIDGE</h2>
      <p className="section-subtitle">NEAR ↔ MONAD · FULLY AUTONOMOUS · 24/7</p>

      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* Direction Toggle */}
        <div className="tabs">
          <button className={`tab-btn ${isNearToMonad ? 'active' : ''}`} onClick={() => setDirection('near-to-monad')}>
            ◎ NEAR → ⬡ MONAD
          </button>
          <button className={`tab-btn ${!isNearToMonad ? 'active' : ''}`} onClick={() => setDirection('monad-to-near')}>
            ⬡ MONAD → ◎ NEAR
          </button>
        </div>

        <div className="card">
          {/* From */}
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="input-label">FROM</span>
              <div className="chain-badge">
                {isNearToMonad ? '◎ NEAR PROTOCOL' : '⬡ MONAD MAINNET'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div className="token-select">
                <span className="token-dot" />
                USDCC
              </div>
              <input
                className="input-field"
                placeholder="0.0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,229,102,0.35)', marginTop: '6px', textAlign: 'right' }}>
              Contract: {isNearToMonad ? 'usdcc-token.gemsrock-nft.near' : '0x85822c2c...412036'}
            </div>
          </div>

          <div className="arrow-down" onClick={() => setDirection(isNearToMonad ? 'monad-to-near' : 'near-to-monad')}>⇅</div>

          {/* To */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="input-label">TO</span>
              <div className="chain-badge">
                {isNearToMonad ? '⬡ MONAD MAINNET' : '◎ NEAR PROTOCOL'}
              </div>
            </div>
            <div className="input-group">
              <input
                className="input-field"
                placeholder={isNearToMonad ? '0x... (Monad address)' : 'account.near'}
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
              />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,229,102,0.35)', marginTop: '4px' }}>
              Receives: <span style={{ color: 'var(--green-toxic)' }}>{amount || '0'} USDCC</span> on {isNearToMonad ? 'Monad' : 'NEAR'}
            </div>
          </div>

          {/* Info */}
          <div style={{ background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: '10px', padding: '12px', marginBottom: '1.5rem' }}>
            {[
              { label: 'Bridge Fee', val: '0 USDCC' },
              { label: 'Estimated Time', val: '~15 seconds' },
              { label: 'Relayer Status', val: 'LIVE', color: 'var(--green-toxic)' },
              { label: 'Network', val: isNearToMonad ? 'NEAR → Monad' : 'Monad → NEAR' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(57,255,20,0.08)' : 'none' }}>
                <span style={{ color: 'rgba(255,229,102,0.5)', fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '1px' }}>{r.label}</span>
                <span style={{ color: r.color || 'rgba(255,229,102,0.8)', fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </div>

          <button className="btn-iridescent" style={{ width: '100%' }} onClick={handleBridge}>
            ⚡ INITIATE BRIDGE
          </button>

          {status === 'instructions' && (
            <div style={{ marginTop: '1.5rem', background: 'rgba(200,150,12,0.07)', border: '1px solid rgba(200,150,12,0.25)', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'var(--gold-bright)', letterSpacing: '1px', marginBottom: '0.8rem' }}>
                📋 BRIDGE INSTRUCTIONS
              </div>
              {isNearToMonad ? (
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,229,102,0.75)', lineHeight: 1.8 }}>
                  <p>1. Call <code style={{ color: 'var(--cyan)' }}>burn_and_bridge</code> on NEAR:</p>
                  <code style={{ display: 'block', background: 'rgba(0,0,0,0.4)', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', color: 'var(--green-toxic)', margin: '6px 0' }}>
                    near contract call-function as-transaction<br />
                    usdcc-token.gemsrock-nft.near burn_and_bridge<br />
                    {`json-args {"amount":"${amount}000000","monad_recipient":"${recipient}"}`}
                  </code>
                  <p>2. Relayer detects automatically within 15 seconds</p>
                  <p>3. USDCC minted on Monad to your address</p>
                </div>
              ) : (
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,229,102,0.75)', lineHeight: 1.8 }}>
                  <p>1. Call <code style={{ color: 'var(--cyan)' }}>burnAndBridge</code> on Monad contract</p>
                  <p>2. Address: <code style={{ color: 'var(--purple)' }}>0x85822c2c6F2924Bb211e0eaC24C592e7b7412036</code></p>
                  <p>3. Reverse relayer mints on NEAR within 15 seconds</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Relayer status */}
        <div className="card" style={{ marginTop: '1rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem' }}>⚙ RELAYER STATUS</div>
          <div className="grid-2">
            {[
              { name: 'Forward (NEAR→MONAD)', url: 'https://usdcc-near-monad-bridge.onrender.com', status: 'LIVE' },
              { name: 'Reverse (MONAD→NEAR)', url: 'https://usdcc-reverse-relayer.onrender.com', status: 'LIVE' },
            ].map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(57,255,20,0.04)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="live-dot" />
                  <div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '0.6rem', color: 'var(--green-toxic)' }}>{r.status}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,229,102,0.6)' }}>{r.name}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
