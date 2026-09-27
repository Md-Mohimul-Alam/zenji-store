import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 1,
    name: 'Blue Flame Tee',
    collection: 'THE_ORIGIN_DROP',
    price: 33.99,
    originalPrice: 39.99,
    image: '/images/products/blue-flame.webp',
    alt: 'Black oversized Blue Flame graphic streetwear tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
  },

  {
    id: 2,
    name: 'Bushido Tee',
    collection: 'THE_ORIGIN_DROP',
    price: 39.99,
    image: '/images/products/bushido.webp',
    alt: 'Black oversized Bushido Japanese-inspired graphic tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW',
  },

  {
    id: 3,
    name: 'Demon Blood Tee',
    collection: 'THE_ORIGIN_DROP',
    price: 33.99,
    originalPrice: 39.99,
    image: '/images/products/demon-blood.webp',
    alt: 'Black oversized Demon Blood graphic streetwear tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
  },

  {
    id: 4,
    name: 'Domain Expansion Tee',
    collection: 'THE_ORIGIN_DROP',
    price: 39.99,
    image: '/images/products/domain-expansion.webp',
    alt: 'Black oversized Domain Expansion graphic streetwear tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },

  // =========================================
  // NEW PRODUCTS
  // =========================================

  {
    id: 5,
    name: 'Crimson Oni Tee',
    collection: 'THE_ONI_DROP',
    price: 42.99,
    image: '/images/products/crimson-oni.webp',
    alt: 'Black oversized Crimson Oni Japanese demon graphic tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW',
  },

  {
    id: 6,
    name: 'Ronin Spirit Tee',
    collection: 'THE_ONI_DROP',
    price: 39.99,
    originalPrice: 44.99,
    image: '/images/products/ronin-spirit.webp',
    alt: 'Black oversized Ronin Spirit samurai graphic streetwear tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
  },

  {
    id: 7,
    name: 'Tokyo Phantom Tee',
    collection: 'NIGHT_ARCHIVE',
    price: 44.99,
    image: '/images/products/tokyo-phantom.webp',
    alt: 'Black oversized Tokyo Phantom Japanese streetwear graphic tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW',
  },

  {
    id: 8,
    name: 'Fallen Angel Tee',
    collection: 'NIGHT_ARCHIVE',
    price: 39.99,
    originalPrice: 46.99,
    image: '/images/products/fallen-angel.webp',
    alt: 'Black oversized Fallen Angel anime-inspired graphic streetwear tee',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'LIMITED',
  },
]