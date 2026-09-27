import { createContext } from 'react'

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