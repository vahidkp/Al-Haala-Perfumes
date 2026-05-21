import type { Product, Category, Note, ProductVariant } from '@/types'

export const categories: Category[] = [
  {
    id: 'cat-oud',
    slug: 'oud',
    name: 'Oud Perfumes',
    image: '/images/category-oud.png',
    description: 'Deep, resinous, unforgettable.',
  },
  {
    id: 'cat-attar',
    slug: 'attar',
    name: 'Attar / Perfume Oil',
    image: '/images/category-attar.png',
    description: 'Pure, concentrated, traditional.',
  },
  {
    id: 'cat-bakhoor',
    slug: 'bakhoor',
    name: 'Bakhoor',
    image: '/images/category-bakhoor.png',
    description: 'Ritual incense for the home.',
  },
  {
    id: 'cat-gifts',
    slug: 'gifts',
    name: 'Gift Sets',
    image: '/images/category-gifts.png',
    description: 'Curated luxury, beautifully presented.',
  },
  {
    id: 'cat-new',
    slug: 'new',
    name: 'New Arrivals',
    image: '/images/category-new.png',
    description: 'The latest from the atelier.',
  },
  {
    id: 'cat-all',
    slug: '',
    name: 'All Collections',
    image: '/images/category-all.png',
    description: 'Browse the full range.',
  },
]

const findCategory = (slug: string): Category =>
  categories.find((c) => c.slug === slug) ?? categories[0]

type MakeArgs = {
  id: string
  slug: string
  name: string
  price?: number
  compareAtPrice?: number
  images?: string[]
  category?: string
  badges?: Product['badges']
  inspiredBy?: string
  orientation?: Product['orientation']
  fragranceFamily?: string
  concentration?: Product['concentration']
  notes?: Product['notes']
  isFeaturedOfWeek?: boolean
  description?: string
  tagline?: string
  daysOld?: number
  giftBoxAvailable?: boolean
  tags?: string[]
}

// Secondary gallery shots, reused across products to give the PDP a 2-3 image gallery.
const GALLERY_FALLBACKS = [
  '/images/hero-story.png',
  '/images/note-heart.png',
  '/images/delight-perfumes.png',
]

const makeProduct = (args: MakeArgs): Product => {
  const price = args.price ?? 1499
  const productHero = `/images/product-${args.slug}.png`
  const imageUrls = args.images ?? [productHero, ...GALLERY_FALLBACKS]
  const images = imageUrls.map((url) => ({
    url,
    alt: args.name,
  }))

  const variants: ProductVariant[] = [
    {
      id: `${args.id}-v1`,
      volume: '100ml',
      price,
      stock: 50,
      sku: `${args.slug}-100ml`,
    },
    {
      id: `${args.id}-v2`,
      volume: '50ml',
      price: Math.round(price * 0.65),
      stock: 30,
      sku: `${args.slug}-50ml`,
    },
    {
      id: `${args.id}-v3`,
      volume: '12ml Attar',
      price: Math.round(price * 0.4),
      stock: 80,
      sku: `${args.slug}-12ml`,
    },
  ]

  const createdAt = new Date(
    Date.now() - (args.daysOld ?? 0) * 24 * 60 * 60 * 1000
  ).toISOString()

  const defaultNotes: Product['notes'] = {
    opening: [
      { name: 'Bergamot', icon: '🍊' },
      { name: 'Pink Pepper', icon: '⚡' },
      { name: 'Cardamom', icon: '✦' },
    ],
    heart: [
      { name: 'Rose', icon: '🌹' },
      { name: 'Saffron', icon: '✧' },
      { name: 'Oud', icon: '🌲' },
    ],
    dryDown: [
      { name: 'Amber', icon: '◉' },
      { name: 'Musk', icon: '◈' },
      { name: 'Vanilla', icon: '⟡' },
    ],
  }

  return {
    id: args.id,
    slug: args.slug,
    name: args.name,
    tagline: args.tagline ?? 'Where tradition meets modern luxury',
    description:
      args.description ??
      'A luminous fragrance that opens with sparkling citrus and spice before settling into a rich oud heart, balanced by creamy base notes that linger long on the skin. Each composition is hand-blended by our master perfumer in small batches.',
    price,
    compareAtPrice: args.compareAtPrice,
    currency: 'AED',
    images,
    variants,
    category: findCategory(args.category ?? 'oud'),
    tags: args.tags ?? ['oud', args.orientation ?? 'unisex'],
    badges: args.badges ?? [],
    inspiredBy: args.inspiredBy,
    orientation: args.orientation ?? 'unisex',
    fragranceFamily: args.fragranceFamily ?? 'Oriental Woody',
    concentration: args.concentration ?? 'EDP',
    notes: args.notes ?? defaultNotes,
    relatedProducts: [],
    giftBoxAvailable: args.giftBoxAvailable ?? true,
    giftBoxPrice: 99,
    isFeaturedOfWeek: args.isFeaturedOfWeek ?? false,
    seoTitle: `${args.name} — AR-Rahmani Perfumes`,
    seoDescription: args.tagline ?? `${args.name} from AR-Rahmani.`,
    createdAt,
  }
}

export const mockProducts: Product[] = [
  makeProduct({
    id: '1',
    slug: 'oud-al-rahmani',
    name: 'Oud Al Rahmani',
    price: 2799,
    badges: ['bestseller', 'fragrance-of-week'],
    isFeaturedOfWeek: true,
    inspiredBy: 'Kilian',
    orientation: 'unisex',
    fragranceFamily: 'Oriental Woody',
    concentration: 'EDP Intense',
    daysOld: 7,
  }),
  makeProduct({
    id: '2',
    slug: 'amber-nights',
    name: 'Amber Nights',
    price: 1899,
    badges: ['new'],
    inspiredBy: 'Montale',
    orientation: 'unisex',
    fragranceFamily: 'Amber Oriental',
    daysOld: 2,
  }),
  makeProduct({
    id: '3',
    slug: 'rose-royale',
    name: 'Rose Royale',
    price: 1699,
    badges: ['bestseller'],
    orientation: 'women',
    fragranceFamily: 'Floral Oriental',
    daysOld: 14,
  }),
  makeProduct({
    id: '4',
    slug: 'cedar-and-musk',
    name: 'Cedar & Musk',
    price: 1399,
    badges: [],
    orientation: 'men',
    fragranceFamily: 'Woody Aromatic',
    daysOld: 21,
  }),
  makeProduct({
    id: '5',
    slug: 'mystic-attar',
    name: 'Mystic Attar',
    price: 999,
    badges: ['bestseller'],
    concentration: 'Attar',
    category: 'attar',
    daysOld: 30,
  }),
  makeProduct({
    id: '6',
    slug: 'desert-bloom',
    name: 'Desert Bloom',
    price: 2099,
    compareAtPrice: 2599,
    badges: ['sale', 'new'],
    orientation: 'women',
    fragranceFamily: 'Floral',
    daysOld: 4,
  }),
  makeProduct({
    id: '7',
    slug: 'black-oud',
    name: 'Black Oud',
    price: 2999,
    badges: ['featured', 'bestseller'],
    orientation: 'men',
    fragranceFamily: 'Smoky Woody',
    concentration: 'EDP Extrait',
    inspiredBy: 'Tom Ford',
    daysOld: 10,
  }),
  makeProduct({
    id: '8',
    slug: 'saffron-dreams',
    name: 'Saffron Dreams',
    price: 1799,
    badges: ['bestseller'],
    orientation: 'women',
    fragranceFamily: 'Spicy Oriental',
    inspiredBy: 'Maison Francis',
    daysOld: 18,
  }),
  makeProduct({
    id: '9',
    slug: 'midnight-oud',
    name: 'Midnight Oud',
    price: 2499,
    badges: ['new'],
    orientation: 'men',
    fragranceFamily: 'Smoky Oud',
    daysOld: 1,
  }),
  makeProduct({
    id: '10',
    slug: 'royal-bakhoor',
    name: 'Royal Bakhoor',
    price: 799,
    badges: ['bestseller'],
    orientation: 'unisex',
    category: 'bakhoor',
    fragranceFamily: 'Resinous Smoky',
    daysOld: 45,
  }),
  makeProduct({
    id: '11',
    slug: 'jasmine-attar',
    name: 'Jasmine Attar',
    price: 1199,
    badges: [],
    orientation: 'women',
    category: 'attar',
    concentration: 'Attar',
    fragranceFamily: 'White Floral',
    daysOld: 25,
  }),
  makeProduct({
    id: '12',
    slug: 'gift-set-noir',
    name: 'Noir Gift Set',
    price: 4499,
    compareAtPrice: 5299,
    badges: ['sale', 'featured'],
    category: 'gifts',
    fragranceFamily: 'Collection',
    daysOld: 6,
  }),
]

export const mockFeaturedProducts = mockProducts.filter(
  (p) => p.isFeaturedOfWeek || p.badges.includes('new')
)

export const mockBestSellers = mockProducts.filter((p) =>
  p.badges.includes('bestseller')
)
