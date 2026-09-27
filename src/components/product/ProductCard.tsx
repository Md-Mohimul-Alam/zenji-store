import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react'
import { Check, Plus } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'motion/react'

import type {
  Product,
  ProductSize,
} from '../../types/product'
import { useCart } from '../../hooks/useCart'
import SizeSelector from './SizeSelector'
import ProductImage from './ProductImage'

interface ProductCardProps {
  product: Product
}

function ProductCard({
  product,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] =
    useState<ProductSize | null>(null)

  const [isAdded, setIsAdded] =
    useState(false)

  const timeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    )

  const { addToCart } = useCart()

  /*
   * Raw mouse-based rotation values.
   */
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  /*
   * Springs make the 3D movement feel smooth
   * instead of following the mouse instantly.
   */
  const springRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  })

  const springRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  })

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>,
  ) => {
    /*
     * Disable tilt on devices that do not
     * support a fine pointer.
     */
    if (
      !window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches
    ) {
      return
    }

    const card =
      event.currentTarget.getBoundingClientRect()

    const centerX = card.width / 2
    const centerY = card.height / 2

    const mouseX =
      event.clientX - card.left

    const mouseY =
      event.clientY - card.top

    /*
     * Keep rotation subtle.
     * Around 5–7 degrees feels premium.
     */
    const rotationY =
      ((mouseX - centerX) / centerX) * 6

    const rotationX =
      -((mouseY - centerY) / centerY) * 6

    rotateX.set(rotationX)
    rotateY.set(rotationY)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleAddToCart = () => {
    if (!selectedSize || product.soldOut) {
      return
    }

    addToCart(product, selectedSize)

    setIsAdded(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsAdded(false)
    }, 1800)
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      {/* 3D perspective container */}
      <div
        className="relative"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative will-change-transform"
        >
          {/* Product image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">
            <ProductImage
              src={product.image}
              alt={product.alt}
            />

            {/* Dark gradient */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />

            {/* Badge */}
            {product.badge && (
              <motion.span
                whileHover={{
                  scale: 1.05,
                }}
                style={{
                  transform: 'translateZ(35px)',
                }}
                className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-black"
              >
                {product.badge}
              </motion.span>
            )}

            {/* Decorative 3D line */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full"
              aria-hidden="true"
            />

            {/* Sold out overlay */}
            {product.soldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/65">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                  Sold Out
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Product information */}
      <motion.div
        className="pt-5"
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
      >
        <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/40">
          {product.collection}
        </p>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.08em] sm:text-base">
            {product.name}
          </h3>

          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold">
              A${product.price.toFixed(2)}
            </p>

            {product.originalPrice && (
              <p className="mt-1 text-xs text-white/35 line-through">
                A$
                {product.originalPrice.toFixed(2)}
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
        <motion.button
          type="button"
          disabled={
            !selectedSize ||
            product.soldOut ||
            isAdded
          }
          onClick={handleAddToCart}
          whileHover={
            selectedSize &&
            !product.soldOut &&
            !isAdded
              ? {
                  y: -2,
                  scale: 1.01,
                }
              : undefined
          }
          whileTap={
            selectedSize &&
            !product.soldOut &&
            !isAdded
              ? {
                  scale: 0.98,
                }
              : undefined
          }
          aria-live="polite"
          className={`
            mt-6 flex min-h-12 w-full
            items-center justify-between
            border px-5
            text-xs font-bold uppercase
            tracking-[0.18em]
            transition-colors duration-300
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
            <motion.span
              initial={{
                scale: 0,
                rotate: -45,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
            >
              <Check
                size={17}
                strokeWidth={2}
                aria-hidden="true"
              />
            </motion.span>
          ) : (
            !product.soldOut && (
              <Plus
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )
          )}
        </motion.button>
      </motion.div>
    </motion.article>
  )
}

export default ProductCard