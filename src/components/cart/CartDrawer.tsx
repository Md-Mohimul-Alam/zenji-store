import { useEffect, useRef } from 'react'
import { ShoppingBag, X } from 'lucide-react'

import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'

function CartDrawer() {
  const {
    items,
    cartCount,
    subtotal,
    isCartOpen,
    closeCart,
  } = useCart()

  const drawerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isCartOpen) {
      return
    }

    const previousActiveElement =
      document.activeElement as HTMLElement | null

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const drawer = drawerRef.current

      if (!drawer) {
        return
      }

      const focusableElements =
        drawer.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled])',
            'a[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        )

      if (focusableElements.length === 0) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )

      const cartButton =
        document.getElementById('cart-button')

      if (cartButton instanceof HTMLElement) {
        cartButton.focus()
      } else {
        previousActiveElement?.focus()
      }
    }
  }, [isCartOpen, closeCart])

  // Prevent page scrolling when cart is open
  useEffect(() => {
    if (!isCartOpen) {
      return
    }

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [isCartOpen])

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        isCartOpen
          ? 'pointer-events-auto'
          : 'pointer-events-none'
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeCart}
      />

      {/* Cart drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <ShoppingBag
              size={20}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <h2
              id="cart-title"
              className="text-sm font-bold uppercase tracking-[0.18em]"
            >
              Your Cart
            </h2>

            <span
              className="text-xs text-white/40"
              aria-label={`${cartCount} items`}
            >
              ({cartCount})
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close shopping cart"
            className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X
              size={19}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              size={38}
              strokeWidth={1}
              className="mb-5 text-white/30"
              aria-hidden="true"
            />

            <h3 className="text-xl font-bold uppercase">
              Your cart is empty
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">
              Find a piece from the current drop and
              make it yours.
            </p>

            <button
              type="button"
              onClick={closeCart}
              className="mt-7 border border-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.size}`}
                  item={item}
                />
              ))}
            </div>

            {/* Cart summary */}
            <div className="shrink-0 border-t border-white/10 bg-[#0a0a0a] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Subtotal
                </span>

                <span
                  className="text-xl font-bold"
                  aria-live="polite"
                >
                  A${subtotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/40">
                Shipping and taxes calculated at
                checkout.
              </p>

              <button
                type="button"
                disabled
                className="mt-6 flex min-h-14 w-full cursor-not-allowed items-center justify-center bg-white text-xs font-bold uppercase tracking-[0.2em] text-black opacity-80"
              >
                Checkout — Demo Only
              </button>

              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.15em] text-white/30">
                No real payment will be processed
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer