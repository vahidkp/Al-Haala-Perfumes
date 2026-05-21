---
name: ar-rahmani-cms-data
description: Set up Sanity CMS schemas, the Sanity client, GROQ queries, and mock data for AR-Rahmani Perfumes. Covers the full data layer — product schema, category schema, site settings, FAQ, editorial banners, and all GROQ queries consumed by the three pages. Use after skill-01-setup. Triggers: "set up Sanity", "create Sanity schema", "set up CMS", "create data queries", "set up mock data", "GROQ queries", "product schema", "Sanity studio", "data layer", "CMS integration".
---

## Goal
Set up the complete data layer: Sanity v3 studio, all schemas, the Next.js Sanity client, typed GROQ queries, and a mock data file for development before CMS content is ready.

---

## Step 1 — Install and Initialize Sanity Studio

```bash
# In the Next.js project root
npm install next-sanity @sanity/image-url @sanity/vision
npx sanity@latest init --env .env.local
```

Choose: new project → name "AR-Rahmani" → dataset "production" → no template

Add to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

---

## Step 2 — Sanity Client (`src/lib/sanity.ts`)

```typescript
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {})
}
```

---

## Step 3 — GROQ Queries (`src/lib/queries.ts`)

```typescript
import { sanityFetch } from './sanity'
import type { Product } from '@/types'

// ── Fragments ──────────────────────────────────────

const IMAGE_FRAGMENT = `{
  "url": asset->url,
  "alt": alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

const CATEGORY_FRAGMENT = `{
  "id": _id,
  slug,
  name,
  "image": image${IMAGE_FRAGMENT}.url,
  description
}`

const VARIANT_FRAGMENT = `{
  "id": _key,
  volume,
  price,
  compareAtPrice,
  stock,
  sku
}`

const NOTE_FRAGMENT = `{ name, icon }`

const PRODUCT_CARD_FRAGMENT = `{
  "id": _id,
  "slug": slug.current,
  name,
  tagline,
  price,
  compareAtPrice,
  "currency": "INR",
  "images": images[]${IMAGE_FRAGMENT},
  "variants": variants[]${VARIANT_FRAGMENT},
  "category": category->${CATEGORY_FRAGMENT},
  tags,
  badges,
  inspiredBy,
  orientation,
  fragranceFamily,
  concentration,
  giftBoxAvailable,
  giftBoxPrice,
  isFeaturedOfWeek,
  "createdAt": _createdAt
}`

const PRODUCT_FULL_FRAGMENT = `{
  ${PRODUCT_CARD_FRAGMENT.slice(1, -1)},
  description,
  "notes": {
    "opening": notes.opening[]${NOTE_FRAGMENT},
    "heart": notes.heart[]${NOTE_FRAGMENT},
    "dryDown": notes.dryDown[]${NOTE_FRAGMENT}
  },
  relatedProducts[]->{ "id": _id, "slug": slug.current },
  seoTitle,
  seoDescription
}`

// ── Queries ────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) ${PRODUCT_CARD_FRAGMENT}`
  return sanityFetch<Product[]>(query)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_FULL_FRAGMENT}`
  return sanityFetch<Product | null>(query, { slug })
}

export async function getRelatedProducts(
  productId: string,
  categorySlug: string,
  limit = 4
): Promise<Product[]> {
  const query = `*[_type == "product" && _id != $productId && category->slug == $categorySlug][0...$limit] ${PRODUCT_CARD_FRAGMENT}`
  return sanityFetch<Product[]>(query, { productId, categorySlug, limit })
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && isFeaturedOfWeek == true] | order(_createdAt desc)[0...6] ${PRODUCT_CARD_FRAGMENT}`
  return sanityFetch<Product[]>(query)
}

export async function getBestSellers(): Promise<Product[]> {
  const query = `*[_type == "product" && "bestseller" in badges] | order(_createdAt desc)[0...8] ${PRODUCT_CARD_FRAGMENT}`
  return sanityFetch<Product[]>(query)
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const query = `*[_type == "product" && category->slug == $categorySlug] | order(_createdAt desc) ${PRODUCT_CARD_FRAGMENT}`
  return sanityFetch<Product[]>(query, { categorySlug })
}
```

---

## Step 4 — Sanity Schemas

Create schema files at `sanity/schemas/`:

### `sanity/schemas/product.ts`

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

const noteField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Note Name', type: 'string' }),
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
        ],
      }),
    ],
  })

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({ name: 'price', title: 'Base Price (₹)', type: 'number', validation: (R) => R.required().positive() }),
    defineField({ name: 'compareAtPrice', title: 'Compare At Price (₹)', type: 'number' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'asset', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        ],
      })],
    }),
    defineField({
      name: 'variants',
      title: 'Variants (Volume)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'volume', title: 'Volume (e.g. 100ml)', type: 'string' }),
          defineField({ name: 'price', title: 'Price (₹)', type: 'number' }),
          defineField({ name: 'compareAtPrice', title: 'Compare At (₹)', type: 'number' }),
          defineField({ name: 'stock', title: 'Stock', type: 'number' }),
          defineField({ name: 'sku', title: 'SKU', type: 'string' }),
        ],
      })],
    }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { value: 'bestseller', title: 'Best Seller' },
          { value: 'new', title: 'New' },
          { value: 'sale', title: 'Sale' },
          { value: 'featured', title: 'Featured' },
          { value: 'fragrance-of-week', title: 'Fragrance of the Week' },
        ],
      },
    }),
    defineField({ name: 'inspiredBy', title: 'Inspired By Brand', type: 'string' }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: { list: ['men', 'women', 'unisex'], layout: 'radio' },
    }),
    defineField({ name: 'fragranceFamily', title: 'Fragrance Family', type: 'string' }),
    defineField({
      name: 'concentration',
      title: 'Concentration',
      type: 'string',
      options: { list: ['EDP', 'EDP Intense', 'EDP Extrait', 'EDT', 'Attar'] },
    }),
    defineField({
      name: 'notes',
      title: 'Fragrance Notes',
      type: 'object',
      fields: [
        noteField('opening', 'Opening Notes (Top)'),
        noteField('heart', 'Heart Notes (Mid)'),
        noteField('dryDown', 'Dry-Down Notes (Base)'),
      ],
    }),
    defineField({ name: 'giftBoxAvailable', title: 'Gift Box Available?', type: 'boolean', initialValue: false }),
    defineField({ name: 'giftBoxPrice', title: 'Gift Box Price (₹)', type: 'number' }),
    defineField({ name: 'isFeaturedOfWeek', title: 'Fragrance of the Week?', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0.asset', subtitle: 'category.name' },
  },
})
```

### `sanity/schemas/category.ts`

```typescript
import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Category Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
})
```

### `sanity/schemas/siteSettings.ts`

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'announcementMessages',
      title: 'Announcement Bar Messages',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'These rotate in the top announcement bar',
    }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'string' }),
    defineField({ name: 'heroCta', title: 'Hero CTA Button Label', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string' }),
    defineField({ name: 'newsletterHeadline', title: 'Newsletter Section Headline', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (with country code)', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
```

### `sanity/schemaTypes/index.ts`

```typescript
import { product } from './product'
import { category } from './category'
import { siteSettings } from './siteSettings'

export const schemaTypes = [product, category, siteSettings]
```

---

## Step 5 — Mock Data for Development (`src/lib/mock-data.ts`)

Paste this and import in pages until Sanity content is ready.

```typescript
import type { Product } from '@/types'

const mockCategory = {
  id: 'cat-1',
  slug: 'oud',
  name: 'Oud Perfumes',
  image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=400',
}

const makeProduct = (overrides: Partial<Product> & { id: string; name: string; slug: string }): Product => ({
  price: 1499,
  compareAtPrice: undefined,
  currency: 'INR',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600',
      alt: overrides.name,
    },
  ],
  variants: [
    { id: 'v1', volume: '100ml', price: overrides.price ?? 1499, stock: 50, sku: `${overrides.slug}-100ml` },
    { id: 'v2', volume: '50ml', price: Math.round((overrides.price ?? 1499) * 0.65), stock: 30, sku: `${overrides.slug}-50ml` },
  ],
  category: mockCategory,
  tags: ['oud', 'men'],
  badges: ['bestseller'],
  inspiredBy: undefined,
  orientation: 'unisex',
  fragranceFamily: 'Oriental Woody',
  concentration: 'EDP',
  notes: {
    opening: [{ name: 'Bergamot', icon: '🍊' }, { name: 'Pink Pepper', icon: '⚡' }],
    heart: [{ name: 'Rose', icon: '🌹' }, { name: 'Oud', icon: '🌲' }],
    dryDown: [{ name: 'Amber', icon: '◉' }, { name: 'Musk', icon: '◈' }, { name: 'Vanilla', icon: '⟡' }],
  },
  giftBoxAvailable: true,
  giftBoxPrice: 99,
  isFeaturedOfWeek: false,
  description: 'A luminous fragrance that opens with sparkling citrus and spice before settling into a rich oud heart, balanced by creamy base notes that linger long on the skin.',
  tagline: 'Where tradition meets modern luxury',
  createdAt: new Date().toISOString(),
  ...overrides,
})

export const mockProducts: Product[] = [
  makeProduct({ id: '1', name: 'Oud Al Rahmani', slug: 'oud-al-rahmani', price: 2199, badges: ['bestseller'], isFeaturedOfWeek: true }),
  makeProduct({ id: '2', name: 'Amber Nights', slug: 'amber-nights', price: 1799, badges: ['new'], inspiredBy: 'Kilian' }),
  makeProduct({ id: '3', name: 'Rose Royale', slug: 'rose-royale', price: 1599, badges: ['bestseller'], orientation: 'women' }),
  makeProduct({ id: '4', name: 'Cedar & Musk', slug: 'cedar-musk', price: 1299, badges: [], orientation: 'men' }),
  makeProduct({ id: '5', name: 'Mystic Attar', slug: 'mystic-attar', price: 899, badges: ['bestseller'], concentration: 'Attar' }),
  makeProduct({ id: '6', name: 'Desert Bloom', slug: 'desert-bloom', price: 1999, badges: ['new'], compareAtPrice: 2499 }),
  makeProduct({ id: '7', name: 'Black Oud', slug: 'black-oud', price: 2799, badges: ['featured'], orientation: 'men' }),
  makeProduct({ id: '8', name: 'Saffron Dreams', slug: 'saffron-dreams', price: 1699, badges: ['bestseller'], orientation: 'women' }),
]

export const mockFeaturedProducts = mockProducts.filter((p) => p.isFeaturedOfWeek || p.badges.includes('new'))
```

---

## Step 6 — Studio Route (`src/app/studio/[[...tool]]/page.tsx`)

```tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### `sanity.config.ts` (project root)

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'ar-rahmani',
  title: 'AR-Rahmani Perfumes CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

---

## Verification Checklist
- [ ] `npm run dev` with Sanity env vars — no client errors
- [ ] `/studio` route loads Sanity Studio in browser
- [ ] Can create a Product document with all fields in the Studio
- [ ] Can create Category documents and reference from product
- [ ] `getAllProducts()` returns data from Sanity
- [ ] `getProductBySlug('test-slug')` returns correct product
- [ ] Mock data file exports correctly and pages render without Sanity
- [ ] `urlFor(image)` generates correct image URL
- [ ] Site Settings document is singleton (only one editable)
- [ ] ISR `revalidate = 3600` set on all data-fetching pages
