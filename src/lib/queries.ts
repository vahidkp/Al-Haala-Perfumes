import { mockProducts, mockFeaturedProducts, mockBestSellers } from './mock-data'
import type { Product } from '@/types'

// Data layer — currently backed by static mock data.
// Swap these implementations when wiring a real backend.

export async function getAllProducts(): Promise<Product[]> {
  return mockProducts
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mockProducts.find((p) => p.slug === slug) ?? null
}

export async function getRelatedProducts(
  productId: string,
  categorySlug: string,
  limit = 4
): Promise<Product[]> {
  return mockProducts
    .filter((p) => p.id !== productId && p.category.slug === categorySlug)
    .slice(0, limit)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return mockFeaturedProducts
}

export async function getBestSellers(): Promise<Product[]> {
  return mockBestSellers
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return mockProducts.filter((p) => p.category.slug === categorySlug)
}
