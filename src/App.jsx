import { useState } from 'react'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Bridge from './components/Bridge'
import Swap from './components/Swap'
import BuyCard from './components/BuyCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Ticker from './components/Ticker'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar page={page} setPage={setPage} />
      <Ticker />
      <main className="app-main">
        {page === 'home'      && <Hero setPage={setPage} />}
        {page === 'dashboard' && <Dashboard />}
        {page === 'bridge'    && <Bridge />}
        {page === 'swap'      && <Swap />}
        {page === 'buy'       && <BuyCard />}
      </main>
      <Footer />
    </div>
  )
}
