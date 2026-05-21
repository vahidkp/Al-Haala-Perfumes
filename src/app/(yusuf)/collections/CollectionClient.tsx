'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import CollectionHero from '@/components/collections/CollectionHero'
import FilterBar from '@/components/collections/FilterBar'
import ProductGrid from '@/components/collections/ProductGrid'
import type { Product } from '@/types'

const PAGE_SIZE = 12

interface CollectionClientProps {
  allProducts: Product[]
  initialCategory: string
  initialSort: string
}

type SortKey =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'bestselling'

function sortProducts(products: Product[], sort: string): Product[] {
  switch (sort as SortKey) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price)
    case 'newest':
      return [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'bestselling':
      return [
        ...products.filter((p) => p.badges.includes('bestseller')),
        ...products.filter((p) => !p.badges.includes('bestseller')),
      ]
    default:
      return products
  }
}

export default function CollectionClient({
  allProducts,
  initialCategory,
  initialSort,
}: CollectionClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [activeSort, setActiveSort] = useState(initialSort)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateUrl = useCallback(
    (category: string, sort: string) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '')
      if (category !== 'all') params.set('category', category)
      else params.delete('category')
      if (sort !== 'featured') params.set('sort', sort)
      else params.delete('sort')
      const queryString = params.toString()
      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        { scroll: false }
      )
    },
    [pathname, router, searchParams]
  )

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
    updateUrl(cat, activeSort)
  }

  const handleSortChange = (sort: string) => {
    setActiveSort(sort)
    updateUrl(activeCategory, sort)
  }

  const filtered = useMemo(() => {
    let result = allProducts
    if (activeCategory !== 'all') {
      result = result.filter(
        (p) =>
          p.category.slug === activeCategory ||
          p.tags.includes(activeCategory) ||
          p.orientation === activeCategory
      )
    }
    return sortProducts(result, activeSort)
  }, [allProducts, activeCategory, activeSort])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <>
      <CollectionHero
        title={activeCategory === 'all' ? 'Our Collection' : activeCategory}
        count={filtered.length}
      />

      <FilterBar
        activeCategory={activeCategory}
        activeSort={activeSort}
        resultCount={filtered.length}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-ar">
          {filtered.length === 0 ? (
            <EmptyState onClear={() => handleCategoryChange('all')} />
          ) : (
            <>
              <ProductGrid products={visible} />

              {hasMore && (
                <div className="flex justify-center mt-14">
                  <button
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="font-body text-[11px] font-medium tracking-widest uppercase px-10 py-4 border border-forest text-forest hover:bg-forest hover:text-cream transition-all"
                  >
                    Load More Products ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="py-24 flex flex-col items-center gap-6 text-center">
      <p className="font-display text-3xl tracking-[0.16em] uppercase text-ink/50">
        No products found
      </p>
      <p className="font-body text-sm text-ink-mute">
        Try adjusting your filters to see more results.
      </p>
      <button
        onClick={onClear}
        className="font-body text-[11px] font-medium tracking-widest uppercase border border-forest text-forest hover:bg-forest hover:text-cream px-8 py-3 transition-all"
      >
        Clear Filters
      </button>
    </div>
  )
}
