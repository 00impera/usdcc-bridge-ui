const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'bridge', label: 'Bridge' },
  { id: 'swap', label: 'Swap' },
  { id: 'buy', label: 'Buy' },
]

export default function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">USDCC BRIDGE</div>
      <ul className="navbar-links">
        {LINKS.map(function(l) {
          return (
            <li key={l.id}>
              <a href="#" className={page === l.id ? 'active' : ''} onClick={function(e){ e.preventDefault(); setPage(l.id); }}>{l.label}</a>
            </li>
          )
        })}
      </ul>
      <button className="btn-iridescent" style={{fontSize:'0.7rem',padding:'8px 16px'}}>Connect Wallet</button>
    </nav>
  )
}
