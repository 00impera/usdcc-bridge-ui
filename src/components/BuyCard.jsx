export default function BuyCard() {
  return (
    <div className="section">
      <h2 className="section-title">BUY WITH CARD</h2>
      <p className="section-subtitle">POWERED BY THIRDWEB PAY</p>
      <div style={{ maxWidth: '900px', margin: '0 auto' }} className="grid-2">
        <div>
          <iframe
            src={`https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc20.html?contract=0x85822c2c6F2924Bb211e0eaC24C592e7b7412036&chain=143&clientId=821819db832d1a313ae3b1a62fbeafb7&theme=dark`}
            width="100%"
            height="600px"
            style={{ border: 'none', borderRadius: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card">
            <div className="card-title">💳 BUY MON WITH CARD</div>
            <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Buy MON directly with Visa, Mastercard, Apple Pay or Google Pay via Thirdweb.
            </p>
            <a href={`https://thirdweb.com/pay?clientId=821819db832d1a313ae3b1a62fbeafb7`} target="_blank" rel="noreferrer">
              <button className="btn-gold" style={{ width: '100%' }}>Open Thirdweb Pay ↗</button>
            </a>
          </div>
          <div className="card">
            <div className="card-title">🔒 Safe TimeLock</div>
            <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Premium time-locked vault with advanced security.
            </p>
            <button className="btn-iridescent" style={{ width: '100%' }}
              onClick={() => window.open('https://safedeposittimelock.pages.dev/', '_blank')}>
              Access TimeLock →
            </button>
          </div>
          <div className="card">
            <div className="card-title">🔗 QUICK LINKS</div>
            {[
              { label: 'Uniswap V4 Monad', url: 'https://app.uniswap.org', color: 'var(--purple)' },
              { label: 'Ref Finance NEAR', url: 'https://app.ref.finance', color: 'var(--cyan)' },
              { label: 'MonadVision', url: 'https://monadvision.com', color: 'var(--gold-bright)' },
              { label: 'NEAR Blocks', url: 'https://nearblocks.io', color: 'var(--pink)' },
            ].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(200,150,12,0.08)' : 'none', textDecoration: 'none' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color }} />
                <span style={{ color: l.color, fontFamily: 'Orbitron', fontSize: '0.68rem', letterSpacing: '1px' }}>{l.label}</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,229,102,0.3)' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
