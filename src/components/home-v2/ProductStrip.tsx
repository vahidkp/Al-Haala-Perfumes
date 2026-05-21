import Link from 'next/link'
import AfnanProductCard from './AfnanProductCard'
import type { Product } from '@/types'

interface ProductStripProps {
  eyebrow?: string
  heading: string
  products: Product[]
  count?: 4 | 5
  ctaHref?: string
  ctaLabel?: string
  saleLabel?: string
}

export default function ProductStrip({
  eyebrow = 'Must Have',
  heading,
  products,
  count = 5,
  ctaHref = '/collections',
  ctaLabel = 'View All Products',
  saleLabel,
}: ProductStripProps) {
  const items = products.slice(0, count)
  if (!items.length) return null
  const colsClass = count === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-ar">
        <div className="text-center mb-10">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-ink-mute mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-display tracking-[0.16em] uppercase text-ink"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)' }}
          >
            {heading}
          </h2>
        </div>

        <div className={`grid grid-cols-2 ${colsClass} gap-3 lg:gap-5`}>
          {items.map((p) => (
            <AfnanProductCard key={p.id} product={p} saleLabel={saleLabel} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href={ctaHref}
            className="font-body text-[11px] font-medium tracking-widest uppercase border border-ink/70 text-ink hover:bg-ink hover:text-white px-7 py-3 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
