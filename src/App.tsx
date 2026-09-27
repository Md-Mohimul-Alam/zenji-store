import { useState } from 'react'

import AnnouncementBar from './components/layout/AnnouncementBar'
import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import ProductGrid from './components/home/ProductGrid'
import BrandStory from './components/home/BrandStory'
import FeatureStrip from './components/home/FeatureStrip'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import CustomCursor from './components/ui/CustomCursor'
import IntroLoader from './components/ui/IntroLoader'
import ProductShowcase from './components/home/ProductShowcase'
import ScrollProgress from './components/ui/ScrollProgress'
function App() {
  const [introComplete, setIntroComplete] =
    useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <IntroLoader
        onComplete={() =>
          setIntroComplete(true)
        }
      />

      <div
        className={
          introComplete
            ? 'opacity-100'
            : 'opacity-100'
        }
      >
        <AnnouncementBar />

        <Header />

        <main>
          <Hero />

          <ProductGrid />

          <ProductShowcase />

          <BrandStory />

          <FeatureStrip />
        </main>

        <Footer />

        <CartDrawer />

        <CustomCursor />
        <ScrollProgress />
      </div>
    </div>
  )
}

export default App