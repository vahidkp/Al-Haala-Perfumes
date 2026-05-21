import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

interface DualProductBannerProps {
  products: Product[]
  collectionLabel?: string
  ctaHref?: string
  leftImage?: string
  rightImage?: string
}

/**
 * Afnan LYNKED-style banner — oversized brand wordmark in the centre with two
 * product bottles flanking it on a deep-black field.
 */
export default function DualProductBanner({
  products,
  collectionLabel = 'LYNKED',
  ctaHref = '/collections',
  leftImage,
  rightImage,
}: DualProductBannerProps) {
  const [left, right] = products
  if (!left || !right) return null
  const leftSrc = leftImage ?? left.images[0]?.url
  const rightSrc = rightImage ?? right.images[0]?.url

  return (
    <section className="relative bg-black text-cream overflow-hidden">
      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />

      <div className="relative container-ar py-16 md:py-24">
        {/* Brand wordmark — huge, behind the bottles */}
        <h2
          className="font-display tracking-[0.18em] uppercase text-white/95 leading-none text-center mb-10 md:mb-14"
          style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}
        >
          {collectionLabel}
        </h2>

        {/* Two bottles in front, on either side of the wordmark axis */}
        <div className="grid grid-cols-2 items-end gap-6 md:gap-16">
          {[
            { product: left, src: leftSrc },
            { product: right, src: rightSrc },
          ].map(({ product: p, src }, i) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className={`group flex ${i === 0 ? 'justify-end' : 'justify-start'}`}
            >
              {src && (
                <div className="relative w-44 h-56 md:w-56 md:h-72 lg:w-72 lg:h-96 transition-transform duration-700 group-hover:scale-[1.04]">
                  <Image
                    src={src}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 40vw, 280px"
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={ctaHref}
            className="font-body text-[11px] font-medium tracking-widest uppercase bg-cream text-black hover:bg-white px-8 py-3 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}
