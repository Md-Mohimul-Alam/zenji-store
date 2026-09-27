export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Product {
  id: number
  name: string
  collection: string
  price: number
  originalPrice?: number
  image: string
  alt: string
  sizes: ProductSize[]
  badge?: string
  soldOut?: boolean
}

export interface CartItem {
  product: Product
  size: ProductSize
  quantity: number
}