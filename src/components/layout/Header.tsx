import { Menu, ShoppingBag } from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        
        {/* Mobile menu */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-start lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-black tracking-[-0.05em] sm:text-3xl"
          aria-label="ZENJI home"
        >
          ZENJI
        </a>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          <a
            href="#shop"
            className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
          >
            Shop
          </a>

          <a
            href="#story"
            className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
          >
            Our Story
          </a>

          <a
            href="#about"
            className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
          >
            About
          </a>
        </nav>

        {/* Cart */}
        <button
          type="button"
          className="relative flex h-10 items-center gap-2"
          aria-label="Open shopping cart"
        >
          <ShoppingBag size={21} strokeWidth={1.5} />

          <span className="hidden text-xs font-medium uppercase tracking-[0.15em] sm:inline">
            Cart
          </span>

          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
            0
          </span>
        </button>

      </div>
    </header>
  )
}

export default Header