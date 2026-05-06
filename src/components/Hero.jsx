export default function Hero({ setPage }) {
  return (
    <div className="hero" style={{ paddingTop: '40px' }}>
      <div className="hero-badge">
        <span className="live-dot"></span>LIVE ON MONAD + NEAR MAINNET
      </div>

      <h1 className="hero-title">
        <span className="gold">USDCC</span><br />
        <span className="green">CROSS-CHAIN</span><br />
        <span style={{ color: 'rgba(255,229,102,0.8)', fontSize: '0.5em', letterSpacing: '6px' }}>BRIDGE & DeFi STATION</span>
      </h1>

      <p className="hero-subtitle">
        The first fully autonomous bidirectional stablecoin bridge between NEAR Protocol and Monad.
        Mint, burn, swap and buy with card — all in one interface.
      </p>

      <div className="hero-stats">
        {[
          { val: '100K+', label: 'USDCC Minted' },
          { val: '2', label: 'Chains Live' },
          { val: '24/7', label: 'Bridge Uptime' },
          { val: '<15s', label: 'Bridge Speed' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="hero-buttons">
        <button className="btn-iridescent" onClick={() => setPage('bridge')}>
          ⚡ Launch Bridge
        </button>
        <button className="btn-gold" onClick={() => setPage('buy')}>
          💳 Buy With Card
        </button>
        <button className="btn-toxic" onClick={() => setPage('swap')}>
          ⇄ Swap
        </button>
      </div>

      <div style={{ marginTop: '4rem', width: '100%', maxWidth: '900px' }}>
        <div className="divider" />
        <div className="grid-3">
          {[
            { icon: '🔗', title: 'NEAR → MONAD', desc: 'Burn USDCC on NEAR, mint on Monad in under 15 seconds. Fully automated relayer.' },
            { icon: '↩', title: 'MONAD → NEAR', desc: 'Burn on Monad, receive on NEAR. Bidirectional bridge running 24/7 on Render.' },
            { icon: '🛡', title: 'Safe TimeLock', desc: 'Premium time-locked vault system with advanced security and Cyberlux interface.' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{f.icon}</div>
              <div className="card-title" style={{ fontSize: '0.75rem' }}>{f.title}</div>
              <p style={{ color: 'rgba(255,229,102,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
              {f.title === 'Safe TimeLock' && (
                <button className="btn-iridescent" style={{ marginTop: '1rem', fontSize: '0.65rem', padding: '8px 16px' }}
                  onClick={() => window.open('https://safedeposittimelock.pages.dev/', '_blank')}>
                  Access TimeLock →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
