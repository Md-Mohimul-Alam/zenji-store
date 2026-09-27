import { Minus, Plus, X } from 'lucide-react'

import type { CartItem as CartItemType } from '../../types/product'
import { useCart } from '../../context/CartContext'

interface CartItemProps {
  item: CartItemType
}

function CartItem({ item }: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { product, size, quantity } = item

  const itemTotal = product.price * quantity

  return (
    <div className="border-b border-white/10 py-6">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="h-32 w-24 shrink-0 overflow-hidden bg-[#151515]">
          <img
            src={product.image}
            alt={product.alt}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product information */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                {product.collection}
              </p>

              <h3 className="text-sm font-bold uppercase tracking-[0.06em]">
                {product.name}
              </h3>

              <p className="mt-2 text-xs text-white/50">
                Size: {size}
              </p>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() =>
                removeFromCart(product.id, size)
              }
              aria-label={`Remove ${product.name}, size ${size} from cart`}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={17} strokeWidth={1.5} />
            </button>
          </div>

          {/* Quantity + price */}
          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div
              className="flex h-9 items-center border border-white/20"
              aria-label={`Quantity: ${quantity}`}
            >
              <button
                type="button"
                onClick={() =>
                  decreaseQuantity(product.id, size)
                }
                aria-label={`Decrease quantity of ${product.name}`}
                className="flex h-full w-9 items-center justify-center transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <Minus size={14} />
              </button>

              <span className="flex h-full min-w-9 items-center justify-center border-x border-white/20 text-xs font-semibold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  increaseQuantity(product.id, size)
                }
                aria-label={`Increase quantity of ${product.name}`}
                className="flex h-full w-9 items-center justify-center transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <Plus size={14} />
              </button>
            </div>

            <p className="text-sm font-semibold">
              A${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem