import { createThirdwebClient } from 'thirdweb'
import { PayEmbed } from 'thirdweb/react'
import { defineChain } from 'thirdweb/chains'

const client = createThirdwebClient({ clientId: '821819db832d1a313ae3b1a62fbeafb7' })
const monad = defineChain(143)

export default function BuyCard() {
  return (
    <div className="section">
      <h2 className="section-title">BUY WITH CARD</h2>
      <p className="section-subtitle">VISA · MASTERCARD · APPLE PAY · GOOGLE PAY</p>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="grid-2">
          <div>
            <PayEmbed
              client={client}
              theme="dark"
              payOptions={{
                mode: "fund_wallet",
                prefillBuy: {
                  chain: monad,
                  amount: "10",
                },
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card">
              <div className="card-title">🔄 BUY → BRIDGE FLOW</div>
              {[
                { n: '01', t: 'Buy MON with Card', d: 'Use Visa/Mastercard to buy MON on Monad via Thirdweb' },
                { n: '02', t: 'Swap MON → USDCC', d: 'Trade on Uniswap V4 WMON/USDCC pool on Monad' },
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

            <div className="card" style={{ border: '1px solid rgba(57,255,20,0.3)' }}>
              <div className="card-title" style={{ color: 'var(--green-toxic)' }}>🔒 Safe TimeLock Vault</div>
              <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Premium time-locked vault system with advanced security.
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
                <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: i < 3 ? '1px solid rgba(200,150,12,0.08)' : 'none', textDecoration: 'none' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color, flexShrink: 0 }} />
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
