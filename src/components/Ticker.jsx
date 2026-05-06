export default function Ticker() {
  const items = [
    { label: 'USDCC/WMON', val: '$1.00', dir: 'up' },
    { label: 'MON/USD', val: '$0.031', dir: 'up' },
    { label: 'NEAR/USD', val: '$2.14', dir: 'up' },
    { label: 'Bridge NEAR→MONAD', val: 'LIVE', dir: 'up' },
    { label: 'Bridge MONAD→NEAR', val: 'LIVE', dir: 'up' },
    { label: 'Uniswap V4 MONAD', val: 'ACTIVE', dir: 'up' },
    { label: 'Ref Finance NEAR', val: 'ACTIVE', dir: 'up' },
  ]
  return (
    <div className="ticker-bar" style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99 }}>
      <div className="ticker-inner">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="ticker-item">
            <span style={{ color: 'rgba(255,229,102,0.5)' }}>{it.label}: </span>
            <span className={it.dir}>{it.val}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
