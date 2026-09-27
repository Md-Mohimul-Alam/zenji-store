import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type {
  CartItem,
  Product,
  ProductSize,
} from '../types/product'

interface CartContextType {
  items: CartItem[]
  cartCount: number
  subtotal: number
  isCartOpen: boolean

  addToCart: (product: Product, size: ProductSize) => void
  removeFromCart: (productId: number, size: ProductSize) => void
  increaseQuantity: (productId: number, size: ProductSize) => void
  decreaseQuantity: (productId: number, size: ProductSize) => void

  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, size: ProductSize) => {
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

  const cartCount = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  )

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0,
      ),
    [items],
  )

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

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside a CartProvider',
    )
  }

  return context
}