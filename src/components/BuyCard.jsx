import { PayEmbed } from 'thirdweb/react'
import { createThirdwebClient } from 'thirdweb'
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
          {/* Thirdweb PayEmbed */}
          <div>
            <div className="card" style={{ marginBottom: '1rem' }}>
              <div className="card-title">💳 BUY CRYPTO WITH CARD</div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,229,102,0.55)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                Purchase MON or USDC directly with your card. Powered by Thirdweb Payments.
              </p>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(200,150,12,0.2)', boxShadow: '0 0 30px rgba(162,89,255,0.1)' }}>
              <PayEmbed
                client={client}
                theme="dark"
                payOptions={{
                  mode: "fund_wallet",
                  prefillBuy: {
                    chain: monad,
                    amount: "10",
                  },
                  onPurchaseSuccess: (tx) => {
                    console.log("Payment success:", tx)
                  },
                }}
              />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card">
              <div className="card-title">🔄 BUY → BRIDGE FLOW</div>
              <div style={{ position: 'relative', paddingLeft: '20px' }}>
                {[
                  { step: '01', title: 'Buy MON with Card', desc: 'Use Visa/Mastercard to buy MON on Monad via Thirdweb' },
                  { step: '02', title: 'Swap MON → USDCC', desc: 'Trade MON for USDCC on Uniswap V4 pool on Monad' },
                  { step: '03', title: 'Bridge to NEAR', desc: 'Call burnAndBridge → receive USDCC on NEAR in 15s' },
                  { step: '04', title: 'Trade on Ref Finance', desc: 'Swap USDCC for NEAR or other tokens on RHEA Finance' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < 3 ? '1px solid rgba(200,150,12,0.1)' : 'none' }}>
                    <div style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'var(--green-toxic)', fontWeight: 900, minWidth: '24px' }}>{s.step}</div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'var(--gold-bright)', marginBottom: '3px' }}>{s.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(255,229,102,0.5)', lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-title">🔗 QUICK LINKS</div>
              {[
                { label: 'Uniswap V4 Monad', url: 'https://app.uniswap.org', color: 'var(--purple)' },
                { label: 'Ref Finance (NEAR)', url: 'https://app.ref.finance', color: 'var(--cyan)' },
                { label: 'MonadVision Explorer', url: 'https://monadvision.com', color: 'var(--gold-bright)' },
                { label: 'NEAR Blocks', url: 'https://nearblocks.io', color: 'var(--pink)' },
                { label: 'Safe TimeLock Vault', url: 'https://safedeposittimelock.pages.dev/', color: 'var(--green-toxic)' },
              ].map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(200,150,12,0.08)' : 'none', textDecoration: 'none', transition: 'all 0.2s' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.color}` }} />
                  <span style={{ color: l.color, fontSize: '0.82rem', fontFamily: 'Orbitron', fontSize: '0.68rem', letterSpacing: '1px' }}>{l.label}</span>
                  <span style={{ marginLeft: 'auto', color: 'rgba(255,229,102,0.3)', fontSize: '0.8rem' }}>↗</span>
                </a>
              ))}
            </div>

            {/* Safe Deposit TimeLock Card */}
            <div className="card" style={{ border: '1px solid rgba(57,255,20,0.3)', boxShadow: '0 0 20px rgba(57,255,20,0.08)' }}>
              <h2 className="card-title" style={{ color: 'var(--green-toxic)' }}>🔒 Safe Deposit TimeLock</h2>
              <p style={{ color: 'rgba(255,229,102,0.55)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Premium time-locked vault system with advanced security and Cyberlux interface.
              </p>
              <button className="btn-iridescent" style={{ width: '100%' }}
                onClick={() => window.open('https://safedeposittimelock.pages.dev/', '_blank')}>
                Access TimeLock →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
