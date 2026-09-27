import AnnouncementBar from './components/layout/AnnouncementBar'
import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import ProductGrid from './components/home/ProductGrid'
import CartDrawer from './components/cart/CartDrawer'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <AnnouncementBar />
      <Header />

      <main>
        <Hero />
        <ProductGrid />
      </main>

      <CartDrawer />
    </div>
  )
}

export default App