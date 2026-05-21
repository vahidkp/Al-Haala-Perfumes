import { sanityFetch, sanityEnabled } from './sanity'
import { mockProducts, mockFeaturedProducts, mockBestSellers } from './mock-data'
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
  "slug": slug.current,
  name,
  "image": image.asset->url,
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
  "currency": "AED",
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
  seoTitle,
  seoDescription
}`

// ── Queries (with mock fallback) ────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (!sanityEnabled) return mockProducts
  const query = `*[_type == "product"] | order(_createdAt desc) ${PRODUCT_CARD_FRAGMENT}`
  const result = await sanityFetch<Product[]>(query)
  return result && result.length ? result : mockProducts
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!sanityEnabled) {
    return mockProducts.find((p) => p.slug === slug) ?? null
  }
  const query = `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_FULL_FRAGMENT}`
  const result = await sanityFetch<Product | null>(query, { slug })
  if (result) return result
  return mockProducts.find((p) => p.slug === slug) ?? null
}

export async function getRelatedProducts(
  productId: string,
  categorySlug: string,
  limit = 4
): Promise<Product[]> {
  if (!sanityEnabled) {
    return mockProducts
      .filter((p) => p.id !== productId && p.category.slug === categorySlug)
      .slice(0, limit)
  }
  const query = `*[_type == "product" && _id != $productId && category->slug.current == $categorySlug][0...$limit] ${PRODUCT_CARD_FRAGMENT}`
  const result = await sanityFetch<Product[]>(query, {
    productId,
    categorySlug,
    limit,
  })
  if (result && result.length) return result
  return mockProducts
    .filter((p) => p.id !== productId && p.category.slug === categorySlug)
    .slice(0, limit)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!sanityEnabled) return mockFeaturedProducts
  const query = `*[_type == "product" && isFeaturedOfWeek == true] | order(_createdAt desc)[0...6] ${PRODUCT_CARD_FRAGMENT}`
  const result = await sanityFetch<Product[]>(query)
  return result && result.length ? result : mockFeaturedProducts
}

export async function getBestSellers(): Promise<Product[]> {
  if (!sanityEnabled) return mockBestSellers
  const query = `*[_type == "product" && "bestseller" in badges] | order(_createdAt desc)[0...8] ${PRODUCT_CARD_FRAGMENT}`
  const result = await sanityFetch<Product[]>(query)
  return result && result.length ? result : mockBestSellers
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  if (!sanityEnabled) {
    return mockProducts.filter((p) => p.category.slug === categorySlug)
  }
  const query = `*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) ${PRODUCT_CARD_FRAGMENT}`
  const result = await sanityFetch<Product[]>(query, { categorySlug })
  return result && result.length
    ? result
    : mockProducts.filter((p) => p.category.slug === categorySlug)
}
