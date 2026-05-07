import { createThirdwebClient } from 'thirdweb'
import { ConnectButton } from 'thirdweb/react'
import { defineChain } from 'thirdweb/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider } from 'thirdweb/react'

const client = createThirdwebClient({ clientId: '821819db832d1a313ae3b1a62fbeafb7' })
const monad = defineChain(143)
const queryClient = new QueryClient()

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'bridge', label: 'Bridge' },
  { id: 'swap', label: 'Swap' },
  { id: 'buy', label: 'Buy' },
]

export default function Navbar({ page, setPage }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
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
          <ConnectButton client={client} chain={monad} theme="dark" />
        </nav>
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
