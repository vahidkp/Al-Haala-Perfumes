'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface AfnanProductCardProps {
  product: Product
  saleLabel?: string
}

/** Afnan-style card: red sale ribbon top-left, large square image, name + dual pricing.
 *  Prefers a v2-styled cutout at /images/v2/product-{slug}.png; falls back to the
 *  original Yusuf product image if the v2 file is missing. */
export default function AfnanProductCard({ product, saleLabel = 'Eid Sale' }: AfnanProductCardProps) {
  const v2Src = `/images/v2/product-${product.slug}.png`
  const fallbackSrc = product.images[0]?.url
  const [src, setSrc] = useState(v2Src)

  const hasCompare =
    product.compareAtPrice && product.compareAtPrice > product.price
  const computedCompare = hasCompare
    ? product.compareAtPrice!
    : Math.round(product.price * 1.25)

  return (
    <article className="group flex flex-col bg-white border border-black/5 h-full">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-[#f7f5f0]"
      >
        <span className="absolute top-0 left-0 z-10 bg-[#e02323] text-white font-body text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5">
          {saleLabel}
        </span>
        {src && (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={() => {
              if (src !== fallbackSrc && fallbackSrc) setSrc(fallbackSrc)
            }}
          />
        )}
      </Link>

      <div className="px-3 py-4 text-center flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-ink line-clamp-2 group-hover:text-[#e02323] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap justify-center items-baseline gap-x-2 gap-y-0.5">
          <span className="font-body text-[13px] font-semibold text-[#e02323] whitespace-nowrap">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="font-body text-[11px] line-through text-ink-mute whitespace-nowrap">
            {formatPrice(computedCompare, product.currency)}
          </span>
        </div>
      </div>
    </article>
  )
}
