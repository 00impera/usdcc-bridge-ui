export default function BuyCard() {
  const CLIENT_ID = '821819db832d1a313ae3b1a62fbeafb7'
  const USDCC = '0x85822c2c6F2924Bb211e0eaC24C592e7b7412036'
  
  const payUrl = `https://pay.thirdweb.com/buy?clientId=${CLIENT_ID}&chainId=143&tokenAddress=${USDCC}&theme=dark`

  return (
    <div className="section">
      <h2 className="section-title">BUY WITH CARD</h2>
      <p className="section-subtitle">VISA · MASTERCARD · APPLE PAY · GOOGLE PAY</p>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="grid-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
              <div className="card-title">BUY USDCC WITH CARD</div>
              <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Purchase USDCC directly with your Visa, Mastercard, Apple Pay or Google Pay. Powered by Thirdweb Pay — the fastest way to onboard to Monad.
              </p>
              <button className="btn-iridescent" style={{ width: '100%', fontSize: '0.8rem', padding: '14px' }}
                onClick={() => window.open(payUrl, '_blank')}>
                💳 BUY WITH CARD →
              </button>
              <div style={{ marginTop: '1rem' }}>
                <button className="btn-gold" style={{ width: '100%' }}
                  onClick={() => window.open(`https://pay.thirdweb.com/buy?clientId=${CLIENT_ID}&chainId=143&theme=dark`, '_blank')}>
                  BUY MON WITH CARD →
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">🔄 HOW IT WORKS</div>
              {[
                { n: '01', t: 'Buy MON or USDC', d: 'Pay with card via Thirdweb — arrives in your wallet in seconds' },
                { n: '02', t: 'Swap → USDCC', d: 'Trade on Uniswap V4 WMON/USDCC pool on Monad' },
                { n: '03', t: 'Bridge to NEAR', d: 'burnAndBridge → receive USDCC on NEAR in 15s' },
                { n: '04', t: 'Trade on Ref Finance', d: 'Swap USDCC on RHEA Finance on NEAR' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(200,150,12,0.08)' : 'none' }}>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: 'var(--green-toxic)', minWidth: '22px', fontWeight: 900 }}>{s.n}</span>
                  <div>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: 'var(--gold-bright)', marginBottom: '2px' }}>{s.t}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,229,102,0.5)' }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ border: '1px solid rgba(57,255,20,0.3)' }}>
              <div className="card-title" style={{ color: 'var(--green-toxic)' }}>🔒 Safe TimeLock Vault</div>
              <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Premium time-locked vault system with advanced security and Cyberlux interface.
              </p>
              <button className="btn-iridescent" style={{ width: '100%' }}
                onClick={() => window.open('https://safedeposittimelock.pages.dev/', '_blank')}>
                Access TimeLock →
              </button>
            </div>

            <div className="card">
              <div className="card-title">📊 USDCC TOKEN INFO</div>
              {[
                { label: 'Monad Contract', val: '0x85822c...412036', url: 'https://monadvision.com/token/0x85822c2c6F2924Bb211e0eaC24C592e7b7412036' },
                { label: 'NEAR Contract', val: 'usdcc-token.gemsrock-nft.near', url: 'https://nearblocks.io/address/usdcc-token.gemsrock-nft.near' },
                { label: 'Uniswap V4 Pool', val: 'WMON/USDCC · 1%', url: 'https://app.uniswap.org' },
                { label: 'Ref Finance', val: 'USDCC/NEAR', url: 'https://app.ref.finance' },
                { label: 'Bridge Relayer', val: 'LIVE 24/7', url: 'https://usdcc-near-monad-bridge.onrender.com' },
              ].map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 4 ? '1px solid rgba(200,150,12,0.08)' : 'none', textDecoration: 'none' }}>
                  <span style={{ fontFamily: 'Orbitron', fontSize: '0.6rem', color: 'rgba(255,229,102,0.5)', letterSpacing: '1px' }}>{r.label}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontFamily: 'monospace' }}>{r.val} ↗</span>
                </a>
              ))}
            </div>

            <div className="card">
              <div className="card-title">🔗 QUICK LINKS</div>
              {[
                { label: 'Thirdweb Pay', url: `https://pay.thirdweb.com/buy?clientId=${CLIENT_ID}&chainId=143&theme=dark`, color: 'var(--purple)' },
                { label: 'Uniswap V4 Monad', url: 'https://app.uniswap.org', color: 'var(--cyan)' },
                { label: 'Ref Finance NEAR', url: 'https://app.ref.finance', color: 'var(--gold-bright)' },
                { label: 'MonadVision', url: 'https://monadvision.com', color: 'var(--pink)' },
                { label: 'GitHub', url: 'https://github.com/00impera/usdcc-bridge-ui', color: 'var(--green-toxic)' },
              ].map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: i < 4 ? '1px solid rgba(200,150,12,0.08)' : 'none', textDecoration: 'none' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.color}`, flexShrink: 0 }} />
                  <span style={{ color: l.color, fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '1px' }}>{l.label}</span>
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,229,102,0.3)' }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
