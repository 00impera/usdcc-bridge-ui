export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 900, background: 'linear-gradient(135deg,#C8960C,#FFD700,#FFE566)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.8rem', letterSpacing: '3px' }}>
          USDCC ◆ CROSS-CHAIN BRIDGE
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {[
            { label: 'GitHub', url: 'https://github.com/00impera/usdcc-near-monad-bridge' },
            { label: 'MonadVision', url: 'https://monadvision.com/token/0x85822c2c6F2924Bb211e0eaC24C592e7b7412036' },
            { label: 'NEAR Blocks', url: 'https://nearblocks.io/address/usdcc-token.gemsrock-nft.near' },
            { label: 'TimeLock Vault', url: 'https://safedeposittimelock.pages.dev/' },
            { label: 'Ref Finance', url: 'https://app.ref.finance' },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </div>
        <div style={{ color: 'rgba(255,229,102,0.25)', fontSize: '0.7rem', letterSpacing: '2px' }}>
          © 2026 USDCC BRIDGE · NEAR + MONAD MAINNET · BUILT BY 00IMPERA
        </div>
      </div>
    </footer>
  )
}
