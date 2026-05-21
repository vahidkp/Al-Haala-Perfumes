import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface BestSellersProps {
  products: Product[]
  eyebrow?: string
  heading?: string
  theme?: 'light' | 'dark'
  showViewAll?: boolean
}

// Tailwind needs static class names — map count → centered grid layout.
const gridByCount: Record<1 | 2 | 3 | 4, string> = {
  1: 'lg:grid-cols-1 max-w-xs',
  2: 'lg:grid-cols-2 max-w-2xl',
  3: 'lg:grid-cols-3 max-w-4xl',
  4: 'lg:grid-cols-4 max-w-5xl',
}

export default function BestSellers({
  products,
  eyebrow = 'Brand Inspirations',
  heading = 'Perfumes',
  theme = 'light',
  showViewAll = true,
}: BestSellersProps) {
  if (!products.length) return null

  const isDark = theme === 'dark'
  const visible = products.slice(0, 4)
  const colsClass = gridByCount[Math.min(visible.length, 4) as 1 | 2 | 3 | 4]

  return (
    <section className={isDark ? 'bg-forest text-cream' : 'bg-cream'}>
      <div className="container-ar py-16 lg:py-20">
        <div className="flex flex-col items-center mb-12">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            align="center"
            theme={theme}
          />
        </div>

        <div
          className={`grid grid-cols-2 gap-3 lg:gap-5 mx-auto ${colsClass}`}
        >
          {visible.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              theme={theme}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="flex justify-center mt-12">
            <Link
              href="/collections"
              className={
                isDark
                  ? 'font-body text-[11px] font-medium tracking-widest uppercase border border-cream/30 text-cream hover:bg-cream hover:text-forest px-8 py-3 transition-colors'
                  : 'font-body text-[11px] font-medium tracking-widest uppercase border border-forest/40 text-forest hover:bg-forest hover:text-cream px-8 py-3 transition-colors'
              }
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
