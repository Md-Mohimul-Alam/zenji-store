import {
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

import { CartContext } from './cart-context'

interface CartProviderProps {
  children: ReactNode
}

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

  useEffect(() => {
    try {
      localStorage.setItem(
        'zenji-cart',
        JSON.stringify(items),
      )
    } catch {
      // Continue without persistence if storage is unavailable.
    }
  }, [items])

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

  const cartCount = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0,
    )
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total +
        item.product.price * item.quantity,
      0,
    )
  }, [items])

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const value = {
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