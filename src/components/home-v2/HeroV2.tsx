'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'

interface HeroV2Props {
  product?: Product
  heroImage?: string
}

/**
 * Full-bleed hero — the product photograph (already shot on a blue field) covers
 * the entire section. Copy is overlaid on the left, anchored toward the bottom.
 */
export default function HeroV2({ product, heroImage }: HeroV2Props) {
  const bgImage = heroImage ?? product?.images[0]?.url

  return (
    <section className="relative overflow-hidden bg-[#0049b3] text-white min-h-[560px] md:min-h-[680px]">
      {bgImage && (
        <Image
          src={bgImage}
          alt={product?.name ?? 'AR-Rahmani signature'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      {/* Left-side gradient for copy legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003a8f]/85 via-[#0049b3]/55 to-transparent" />

      <div className="relative container-ar grid grid-cols-1 md:grid-cols-2 items-end min-h-[560px] md:min-h-[680px] py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/85 mb-4">
            The Signature Collection
          </p>
          <h1
            className="font-display tracking-[0.08em] uppercase text-white leading-[0.95] whitespace-nowrap"
            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}
          >
            AR-RAHMANI
          </h1>
          {product?.name && (
            <p
              className="font-display italic text-white/85 mt-4"
              style={{ fontSize: 'clamp(20px, 2.6vw, 32px)' }}
            >
              {product.name}
            </p>
          )}
          <div className="mt-8 flex items-center gap-3">
            <Link
              href={product ? `/products/${product.slug}` : '/collections'}
              className="font-body text-[11px] font-medium tracking-widest uppercase bg-white text-[#0049b3] hover:bg-cream px-7 py-3 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/collections"
              className="font-body text-[11px] font-medium tracking-widest uppercase border border-white/60 text-white hover:bg-white/10 px-7 py-3 transition-colors"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
