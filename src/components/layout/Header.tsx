import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'

import { useCart } from '../../hooks/useCart'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { cartCount, openCart } = useCart()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape,
      )
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-start lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>

          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl uppercase tracking-[-0.05em] sm:text-3xl"
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

          {/* Cart button */}
          <button
            id="cart-button"
            type="button"
            onClick={openCart}
            className="relative flex h-10 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag
              size={21}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <span className="hidden text-xs font-medium uppercase tracking-[0.15em] sm:inline">
              Cart
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${
          isMenuOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={isMenuOpen ? 0 : -1}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        />

        {/* Menu panel */}
        <div
          id="mobile-navigation"
          className={`absolute left-0 top-0 flex h-full w-[90%] max-w-[380px] flex-col bg-[#0a0a0a] transition-transform duration-300 ease-out ${
            isMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >
          {/* Menu header */}
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <span className="font-display text-2xl uppercase">
              ZENJI
            </span>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X
                size={19}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Navigation links */}
          <nav
            className="flex flex-1 flex-col justify-center px-6"
            aria-label="Mobile navigation"
          >
            <a
              href="#shop"
              onClick={closeMenu}
              className="flex items-center justify-between border-t border-white/10 py-6"
            >
              <span className="font-display text-4xl uppercase">
                Shop
              </span>

              <span className="text-xs text-white/25">
                01
              </span>
            </a>

            <a
              href="#story"
              onClick={closeMenu}
              className="flex items-center justify-between border-t border-white/10 py-6"
            >
              <span className="font-display text-4xl uppercase">
                Story
              </span>

              <span className="text-xs text-white/25">
                02
              </span>
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="flex items-center justify-between border-y border-white/10 py-6"
            >
              <span className="font-display text-4xl uppercase">
                About
              </span>

              <span className="text-xs text-white/25">
                03
              </span>
            </a>
          </nav>

          {/* Menu footer */}
          <div className="border-t border-white/10 p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/30">
              Limited Release / Australia
            </p>

            <p className="mt-2 text-xs text-white/50">
              Wear Your Story.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header