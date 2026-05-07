export default function BuyCard() {
  return (
    <div className="section">
      <h2 className="section-title">BUY WITH CARD</h2>
      <p className="section-subtitle">VISA · MASTERCARD · APPLE PAY · GOOGLE PAY</p>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
          <div className="card-title">THIRDWEB PAY</div>
          <p style={{ color: 'rgba(255,229,102,0.6)', marginBottom: '1.5rem' }}>
            Buy MON or USDC with Visa, Mastercard, Apple Pay or Google Pay.
          </p>
          <a href="https://thirdweb.com/buy" target="_blank" rel="noreferrer">
            <button className="btn-iridescent" style={{ width: '100%' }}>Open Thirdweb Pay →</button>
          </a>
        </div>
      </div>
    </div>
  )
}
