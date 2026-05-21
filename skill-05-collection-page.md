---
name: ar-rahmani-collection-page
description: Build the Collection / Shop listing page for AR-Rahmani Perfumes — page hero banner, sticky filter bar with pill filters and sort dropdown, product grid with stagger animation, and load-more functionality. Use after skill-03-ui-components. Triggers: "build the shop page", "build collection page", "create product listing", "build filter bar", "product grid page", "collections page", "shop listing page".
---

## Goal
Implement the full `/collections` page — a filterable, sortable product listing with a page hero, sticky filter bar, animated product grid, and load-more UX.

---

## Page File (`src/app/collections/page.tsx`)

Server component that fetches products and passes to client layout.

```tsx
import type { Metadata } from 'next'
import CollectionClient from './CollectionClient'
import { getAllProducts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse AR-Rahmani\'s full range of Ouds, Attars, Bakhoor, Gift Sets and more.',
}

export const revalidate = 3600

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string }
}) {
  const products = await getAllProducts()

  return (
    <CollectionClient
      allProducts={products}
      initialCategory={searchParams.category ?? 'all'}
      initialSort={searchParams.sort ?? 'featured'}
    />
  )
}
```

---

## Client Component (`src/app/collections/CollectionClient.tsx`)

```tsx
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

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'bestselling'

function sortProducts(products: Product[], sort: string): Product[] {
  switch (sort as SortKey) {
    case 'price-asc':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...products].sort((a, b) => b.price - a.price)
    case 'newest':
      return [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case 'bestselling':
      return [...products].filter((p) => p.badges.includes('bestseller'))
        .concat(products.filter((p) => !p.badges.includes('bestseller')))
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
      const params = new URLSearchParams(searchParams.toString())
      if (category !== 'all') params.set('category', category)
      else params.delete('category')
      if (sort !== 'featured') params.set('sort', sort)
      else params.delete('sort')
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
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

      <section className="section-y bg-obsidian">
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
                    className="font-body text-xs font-medium tracking-widest uppercase px-10 py-4 border border-gold/60 text-gold hover:bg-gold hover:text-obsidian transition-all duration-200"
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
      <p className="font-display text-3xl font-light italic text-cream/40">
        No products found
      </p>
      <p className="font-body text-sm text-muted">
        Try adjusting your filters to see more results.
      </p>
      <button
        onClick={onClear}
        className="font-body text-xs font-medium tracking-widest uppercase text-gold border border-gold/50 px-8 py-3 hover:bg-gold hover:text-obsidian transition-all duration-200"
      >
        Clear Filters
      </button>
    </div>
  )
}
```

---

## Component — CollectionHero (`src/components/collections/CollectionHero.tsx`)

Page hero banner with collection title and product count.

```tsx
'use client'

import { motion } from 'framer-motion'

interface CollectionHeroProps {
  title: string
  count: number
}

// Capitalize and humanize slug
function humanize(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function CollectionHero({ title, count }: CollectionHeroProps) {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden bg-charcoal"
      style={{ height: '40vh', minHeight: '280px' }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A84C 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative z-10 container-ar">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2 font-body text-xs text-muted tracking-wider">
            <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
            <li className="text-slate-dark">›</li>
            <li className="text-cream/60">{humanize(title)}</li>
          </ol>
        </nav>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-light italic text-white mb-3"
        >
          {humanize(title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-body text-sm text-muted"
        >
          {count} {count === 1 ? 'product' : 'products'}
        </motion.p>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-obsidian to-transparent" />
    </section>
  )
}
```

---

## Component — FilterBar (`src/components/collections/FilterBar.tsx`)

Sticky pill-based category filter + sort dropdown. Hides on scroll down, reveals on scroll up.

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Oud Perfumes', value: 'oud' },
  { label: 'Attar', value: 'attar' },
  { label: 'Bakhoor', value: 'bakhoor' },
  { label: 'Gift Sets', value: 'gifts' },
  { label: 'For Men', value: 'men' },
  { label: 'For Women', value: 'women' },
  { label: 'Unisex', value: 'unisex' },
  { label: 'New Arrivals', value: 'new' },
]

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Best Selling', value: 'bestselling' },
]

interface FilterBarProps {
  activeCategory: string
  activeSort: string
  resultCount: number
  onCategoryChange: (cat: string) => void
  onSortChange: (sort: string) => void
}

export default function FilterBar({
  activeCategory,
  activeSort,
  resultCount,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const sortRef = useRef<HTMLDivElement>(null)

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < 100 || current < lastScrollY.current)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeSortLabel = sortOptions.find((o) => o.value === activeSort)?.label ?? 'Featured'

  return (
    <div
      className={cn(
        'sticky z-40 bg-charcoal border-b border-slate-dark transition-transform duration-300',
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
      style={{ top: '72px' }} // height of navbar
    >
      <div className="container-ar py-4">
        <div className="flex items-center justify-between gap-4">

          {/* ── Category Pills ── */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  'shrink-0 font-body text-[11px] font-medium tracking-widest uppercase px-4 py-2 border transition-all duration-200 whitespace-nowrap',
                  activeCategory === cat.value
                    ? 'bg-gold text-obsidian border-gold'
                    : 'bg-transparent text-cream/70 border-slate-dark hover:border-gold/50 hover:text-gold'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Sort Dropdown ── */}
          <div ref={sortRef} className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 font-body text-[11px] font-medium tracking-widest uppercase text-cream/70 hover:text-gold transition-colors whitespace-nowrap"
            >
              {activeSortLabel}
              <ChevronDown
                size={12}
                strokeWidth={2}
                className={cn('transition-transform duration-200', sortOpen && 'rotate-180')}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-charcoal border border-slate-dark shadow-2xl z-50">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { onSortChange(opt.value); setSortOpen(false) }}
                    className={cn(
                      'w-full text-left px-4 py-3 font-body text-xs tracking-wide hover:bg-obsidian transition-colors',
                      activeSort === opt.value ? 'text-gold' : 'text-cream/70'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Result count */}
        <p className="font-body text-[11px] text-muted mt-2">
          Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </div>
  )
}
```

---

## Component — ProductGrid (`src/components/collections/ProductGrid.tsx`)

Responsive animated product grid.

```tsx
'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      key={products.length} // re-trigger on filter change
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          showInspiredBy
        />
      ))}
    </motion.div>
  )
}
```

---

## Verification Checklist
- [ ] Page hero shows breadcrumb + animated title
- [ ] Filter bar is sticky below navbar
- [ ] Filter bar hides on scroll down, reveals on scroll up
- [ ] Active category pill has gold filled style
- [ ] Inactive pill shows gold border on hover
- [ ] Category change filters products instantly without page reload
- [ ] Sort dropdown opens/closes, closes on outside click
- [ ] URL updates with `?category=` and `?sort=` params on filter change
- [ ] Product grid fades in on filter change
- [ ] "Load More" button shows remaining count
- [ ] Empty state shows with "Clear Filters" button
- [ ] All filters work on mobile with horizontal scroll
