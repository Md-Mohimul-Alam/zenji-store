import { useEffect, useRef, useState } from 'react'
import { Check, Plus } from 'lucide-react'

import type {
  Product,
  ProductSize,
} from '../../types/product'

import { useCart } from '../../hooks/useCart'
import SizeSelector from './SizeSelector'

interface ProductCardProps {
  product: Product
}

function ProductCard({
  product,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] =
    useState<ProductSize | null>(null)

  const [isAdded, setIsAdded] = useState(false)

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null)

  const { addToCart } = useCart()

  /*
   * Clear timeout if the component unmounts.
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleAddToCart = () => {
    if (!selectedSize || product.soldOut) {
      return
    }

    addToCart(product, selectedSize)

    /*
     * Show temporary success state.
     */
    setIsAdded(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsAdded(false)
    }, 1800)
  }

  return (
    <article className="group">
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Product badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black">
            {product.badge}
          </span>
        )}

        {/* Sold out overlay */}
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/65">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="pt-5">
        <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
          {product.collection}
        </p>

        <div className="flex items-start justify-between gap-4">
          {/* Name */}
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] sm:text-base">
            {product.name}
          </h3>

          {/* Price */}
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold">
              A${product.price.toFixed(2)}
            </p>

            {product.originalPrice && (
              <p className="mt-1 text-xs text-white/35 line-through">
                A${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Size selector */}
        <div className="mt-6">
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={(size) => {
              setSelectedSize(size)
              setIsAdded(false)
            }}
          />
        </div>

        {/* Add to cart */}
        <button
          type="button"
          disabled={
            !selectedSize ||
            product.soldOut ||
            isAdded
          }
          onClick={handleAddToCart}
          aria-live="polite"
          className={`
            mt-6 flex min-h-12 w-full
            items-center justify-between
            border px-5
            text-xs font-bold uppercase
            tracking-[0.18em]
            transition-all duration-300
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white

            ${
              isAdded
                ? 'border-white bg-white text-black'
                : 'border-white'
            }

            ${
              !isAdded
                ? 'enabled:hover:bg-white enabled:hover:text-black'
                : ''
            }

            disabled:cursor-not-allowed

            ${
              !selectedSize && !isAdded
                ? 'disabled:border-white/15 disabled:text-white/25'
                : ''
            }
          `}
        >
          <span>
            {product.soldOut
              ? 'Sold Out'
              : isAdded
                ? 'Added'
                : selectedSize
                  ? 'Add to Cart'
                  : 'Select a Size'}
          </span>

          {isAdded ? (
            <Check
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />
          ) : (
            !product.soldOut && (
              <Plus
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )
          )}
        </button>
      </div>
    </article>
  )
}

export default ProductCard