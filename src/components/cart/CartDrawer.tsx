import { useEffect } from 'react'
import { ShoppingBag, X } from 'lucide-react'

import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

function CartDrawer() {
  const {
    items,
    cartCount,
    subtotal,
    isCartOpen,
    closeCart,
  } = useCart()

  // Close cart with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart()
      }
    }

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isCartOpen, closeCart])

  // Prevent background scrolling while cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isCartOpen}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={closeCart}
        tabIndex={isCartOpen ? 0 : -1}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
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

            <h2 className="text-sm font-bold uppercase tracking-[0.18em]">
              Your Cart
            </h2>

            <span className="text-xs text-white/40">
              ({cartCount})
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              size={38}
              strokeWidth={1}
              className="mb-5 text-white/30"
            />

            <h3 className="text-xl font-bold uppercase">
              Your cart is empty
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">
              Find a piece from the current drop and make it yours.
            </p>

            <button
              type="button"
              onClick={closeCart}
              className="mt-7 border border-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.size}`}
                  item={item}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="shrink-0 border-t border-white/10 bg-[#0a0a0a] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Subtotal
                </span>

                <span className="text-xl font-bold">
                  A${subtotal.toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-white/40">
                Shipping and taxes calculated at checkout.
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