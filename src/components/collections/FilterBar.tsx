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

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setVisible(current < 100 || current < lastScrollY.current)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeSortLabel =
    sortOptions.find((o) => o.value === activeSort)?.label ?? 'Featured'

  return (
    <div
      className={cn(
        'sticky z-40 bg-cream border-b border-forest/15 transition-transform duration-300',
        visible ? 'translate-y-0' : '-translate-y-full'
      )}
      style={{ top: '101px' }}
    >
      <div className="container-ar py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  'shrink-0 font-body text-[11px] font-medium tracking-widest uppercase px-4 py-2 border transition-all duration-200 whitespace-nowrap',
                  activeCategory === cat.value
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-cream-paper text-ink-soft border-forest/20 hover:border-forest hover:text-forest'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div ref={sortRef} className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 font-body text-[11px] font-medium tracking-widest uppercase text-ink-soft hover:text-forest transition-colors whitespace-nowrap"
            >
              {activeSortLabel}
              <ChevronDown
                size={12}
                strokeWidth={2}
                className={cn(
                  'transition-transform duration-200',
                  sortOpen && 'rotate-180'
                )}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-forest/20 shadow-xl z-50">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value)
                      setSortOpen(false)
                    }}
                    className={cn(
                      'w-full text-left px-4 py-3 font-body text-xs tracking-wide hover:bg-cream-paper transition-colors',
                      activeSort === opt.value ? 'text-forest' : 'text-ink'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="font-body text-[11px] text-ink-mute mt-2">
          Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </div>
  )
}
