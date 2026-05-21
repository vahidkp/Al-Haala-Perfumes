export interface ProductImage {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Note {
  name: string
  icon?: string
}

export interface ProductVariant {
  id: string
  volume: string
  price: number
  compareAtPrice?: number
  stock: number
  sku: string
}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
  description?: string
}

export type ProductBadge =
  | 'bestseller'
  | 'new'
  | 'sale'
  | 'featured'
  | 'fragrance-of-week'

export type Orientation = 'men' | 'women' | 'unisex'

export type Concentration =
  | 'EDP'
  | 'EDP Intense'
  | 'Attar'
  | 'EDP Extrait'
  | 'EDT'

export interface Product {
  id: string
  slug: string
  name: string
  tagline?: string
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: string[]
  badges: ProductBadge[]
  inspiredBy?: string
  orientation: Orientation
  fragranceFamily: string
  concentration: Concentration
  notes: {
    opening: Note[]
    heart: Note[]
    dryDown: Note[]
  }
  relatedProducts?: string[]
  giftBoxAvailable: boolean
  giftBoxPrice?: number
  isFeaturedOfWeek: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: string
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  giftBox: boolean
  name: string
  image: string
  price: number
  volume: string
}

export interface SiteSettings {
  announcementMessages: string[]
  heroHeadline: string
  heroSubheadline: string
  heroCta: string
  heroImage: string
  instagramHandle: string
  newsletterHeadline: string
}
