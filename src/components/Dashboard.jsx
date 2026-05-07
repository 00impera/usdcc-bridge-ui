const CONTRACTS = {
  monad: { usdcc: '0x85822c2c6F2924Bb211e0eaC24C592e7b7412036' },
  near: { usdcc: 'usdcc-token.gemsrock-nft.near' },
}

export default function Dashboard() {
  const txHistory = [
    { type: 'BRIDGE', from: 'NEAR', to: 'MONAD', amount: '1 USDCC', status: 'confirmed', time: '2h ago', hash: '0xa61a...9d32' },
    { type: 'BRIDGE', from: 'NEAR', to: 'MONAD', amount: '1 USDCC', status: 'confirmed', time: '2h ago', hash: '0xa6bb...8399' },
    { type: 'BRIDGE', from: 'MONAD', to: 'NEAR', amount: '1 USDCC', status: 'confirmed', time: '1h ago', hash: 'FCVp...wkMt' },
    { type: 'LIQUIDITY', from: 'MONAD', to: 'V4 POOL', amount: '0.01 WMON + USDCC', status: 'confirmed', time: '3h ago', hash: '0xa1f4...6808' },
  ]

  return (
    <div className="section">
      <h2 className="section-title">DASHBOARD</h2>
      <p className="section-subtitle">CROSS-CHAIN PORTFOLIO & LIVE METRICS</p>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'Forward Relayer', url: 'https://usdcc-near-monad-bridge.onrender.com', chain: 'NEAR→MONAD' },
          { label: 'Reverse Relayer', url: 'https://usdcc-reverse-relayer.onrender.com', chain: 'MONAD→NEAR' },
          { label: 'Uniswap V4 Pool', url: 'https://app.uniswap.org', chain: 'MONAD' },
          { label: 'Ref Finance Pool', url: 'https://app.ref.finance', chain: 'NEAR' },
        ].map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-dot" />
            <div>
              <div style={{ fontFamily: 'Orbitron', fontSize: '0.65rem', color: 'var(--green-toxic)', letterSpacing: '1px' }}>{s.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,229,102,0.4)' }}>{s.chain}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'USDCC on MONAD', val: '7 USDCC', sub: '0x85822...36', color: 'var(--green-toxic)' },
          { label: 'USDCC on NEAR', val: '100,002', sub: 'usdcc-token.gemsrock-nft.near', color: 'var(--gold-bright)' },
          { label: 'MON Balance', val: '~', sub: 'Monad Mainnet', color: 'var(--cyan)' },
          { label: 'Bridge Volume', val: '13 TXs', sub: 'All time', color: 'var(--purple)' },
        ].map((b, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontFamily: 'Orbitron', fontWeight: 900, color: b.color, marginBottom: '4px' }}>{b.val}</div>
            <div style={{ fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px', color: 'rgba(255,229,102,0.6)', marginBottom: '4px' }}>{b.label}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,229,102,0.3)' }}>{b.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="card-title">⬡ MONAD CONTRACTS</div>
          {[
            { label: 'USDCC Token', addr: '0x85822c2c...412036', url: 'https://monadvision.com/token/0x85822c2c6F2924Bb211e0eaC24C592e7b7412036' },
            { label: 'Pool Manager V4', addr: '0xb362A2b8...180048', url: 'https://monadvision.com/address/0xb362A2b87695a71A65092bd500fB05B558180048' },
            { label: 'WMON', addr: '0x3bd359C1...5433A', url: '#' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(200,150,12,0.1)' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,229,102,0.7)' }}>{c.label}</span>
              <a href={c.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--cyan)', textDecoration: 'none' }}>{c.addr} ↗</a>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">◎ NEAR CONTRACTS</div>
          {[
            { label: 'USDCC Token', addr: 'usdcc-token.gemsrock-nft.near', url: 'https://nearblocks.io/address/usdcc-token.gemsrock-nft.near' },
            { label: 'Bridge Contract', addr: 'monad-bridge.gemsrock-nft.near', url: '#' },
            { label: 'Ref Finance', addr: 'v2.ref-finance.near', url: 'https://app.ref.finance' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(200,150,12,0.1)' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,229,102,0.7)' }}>{c.label}</span>
              <a href={c.url} target="_blank" rel="noreferrer" style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--purple)', textDecoration: 'none' }}>{c.addr.slice(0,20)}... ↗</a>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">📋 RECENT TRANSACTIONS</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(200,150,12,0.2)' }}>
                {['Type','Route','Amount','Hash','Time','Status'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'Orbitron', fontSize: '0.6rem', letterSpacing: '1px', color: 'rgba(255,229,102,0.4)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {txHistory.map((tx, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--cyan)', fontFamily: 'Orbitron', fontSize: '0.65rem' }}>{tx.type}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,229,102,0.7)' }}>{tx.from} → {tx.to}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--gold-bright)', fontWeight: 700 }}>{tx.amount}</td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: 'var(--purple)' }}>{tx.hash}</td>
                  <td style={{ padding: '10px 12px', color: 'rgba(255,229,102,0.4)' }}>{tx.time}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: 'rgba(57,255,20,0.1)', color: 'var(--green-toxic)', border: '1px solid rgba(57,255,20,0.3)', borderRadius: '4px', padding: '2px 8px', fontSize: '0.65rem', fontFamily: 'Orbitron' }}>✓ {tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
