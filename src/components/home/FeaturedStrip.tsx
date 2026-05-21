import SectionHeader from '@/components/ui/SectionHeader'
import HorizontalScroller from '@/components/ui/HorizontalScroller'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface FeaturedStripProps {
  products: Product[]
  eyebrow?: string
  heading?: string
  body?: string
  theme?: 'light' | 'dark'
}

export default function FeaturedStrip({
  products,
  eyebrow = 'Curation',
  heading = 'Fragrance of the Week',
  body = 'Discover the curated edit of fragrances and perfumes hand-tipped specially for you',
  theme = 'light',
}: FeaturedStripProps) {
  if (!products.length) return null
  const isDark = theme === 'dark'
  return (
    <section
      className={isDark ? 'bg-forest text-cream' : 'bg-cream'}
      id="featured"
    >
      <div className="container-ar py-16 lg:py-20">
        <div className="flex flex-col items-center mb-12">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            body={body}
            align="center"
            theme={theme}
          />
        </div>

        {/* Mobile / tablet: horizontal scroll. Desktop: centered 4-up grid. */}
        <div className="lg:hidden">
          <HorizontalScroller gap={16}>
            {products.map((product, i) => (
              <div
                key={product.id}
                className="shrink-0 w-[180px] sm:w-[220px]"
              >
                <ProductCard product={product} index={i} theme={theme} />
              </div>
            ))}
          </HorizontalScroller>
        </div>

        <div className="hidden lg:grid grid-cols-4 gap-5 max-w-5xl mx-auto">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
