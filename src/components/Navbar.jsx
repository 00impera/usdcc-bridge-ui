import { useState } from 'react'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'bridge', label: 'Bridge' },
  { id: 'swap', label: 'Swap' },
  { id: 'buy', label: 'Buy' },
]

export default function Navbar({ page, setPage }) {
  const [address, setAddress] = useState(null)

  async function connect() {
    if (!window.ethereum) { alert('Install MetaMask!'); return; }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAddress(accounts[0])
  }

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
      <button className="btn-iridescent" style={{fontSize:'0.7rem',padding:'8px 16px'}} onClick={connect}>
        {address ? address.slice(0,6)+'...'+address.slice(-4) : '⚡ Connect Wallet'}
      </button>
    </nav>
  )
}
