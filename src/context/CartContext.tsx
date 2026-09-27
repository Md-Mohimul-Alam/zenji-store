import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type {
  CartItem,
  Product,
  ProductSize,
} from '../types/product'

export interface CartContextType {
  items: CartItem[]
  cartCount: number
  subtotal: number
  isCartOpen: boolean

  addToCart: (
    product: Product,
    size: ProductSize,
  ) => void

  removeFromCart: (
    productId: number,
    size: ProductSize,
  ) => void

  increaseQuantity: (
    productId: number,
    size: ProductSize,
  ) => void

  decreaseQuantity: (
    productId: number,
    size: ProductSize,
  ) => void

  openCart: () => void
  closeCart: () => void
}

export const CartContext = createContext<
  CartContextType | undefined
>(undefined)

interface CartProviderProps {
  children: ReactNode
}

/**
 * Load and validate cart data from localStorage.
 */
function getInitialCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem('zenji-cart')

    if (!savedCart) {
      return []
    }

    const parsedCart: unknown = JSON.parse(savedCart)

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart.filter(
      (item): item is CartItem => {
        if (
          typeof item !== 'object' ||
          item === null ||
          !('product' in item) ||
          !('size' in item) ||
          !('quantity' in item)
        ) {
          return false
        }

        const cartItem = item as Partial<CartItem>

        return (
          typeof cartItem.product?.id === 'number' &&
          typeof cartItem.product?.name === 'string' &&
          typeof cartItem.product?.price === 'number' &&
          typeof cartItem.size === 'string' &&
          typeof cartItem.quantity === 'number' &&
          cartItem.quantity > 0
        )
      },
    )
  } catch {
    return []
  }
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] =
    useState<CartItem[]>(getInitialCart)

  const [isCartOpen, setIsCartOpen] =
    useState(false)

  /**
   * Save cart whenever items change.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        'zenji-cart',
        JSON.stringify(items),
      )
    } catch {
      // Cart still works if localStorage is unavailable.
    }
  }, [items])

  /**
   * Add product to cart.
   */
  const addToCart = (
    product: Product,
    size: ProductSize,
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id &&
          item.size === size
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          product,
          size,
          quantity: 1,
        },
      ]
    })

    setIsCartOpen(true)
  }

  /**
   * Remove an item completely.
   */
  const removeFromCart = (
    productId: number,
    size: ProductSize,
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size
          ),
      ),
    )
  }

  /**
   * Increase quantity.
   */
  const increaseQuantity = (
    productId: number,
    size: ProductSize,
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId &&
        item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
  }

  /**
   * Decrease quantity.
   * Remove item when quantity reaches zero.
   */
  const decreaseQuantity = (
    productId: number,
    size: ProductSize,
  ) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId &&
          item.size === size
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  /**
   * Total number of products in cart.
   */
  const cartCount = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0,
    )
  }, [items])

  /**
   * Calculate cart subtotal.
   */
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        item.product.price * item.quantity,
      0,
    )
  }, [items])

  /**
   * Cart drawer controls.
   */
  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const value: CartContextType = {
    items,
    cartCount,
    subtotal,
    isCartOpen,

    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,

    openCart,
    closeCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}