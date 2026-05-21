'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface DiscoveryKitCardProps {
  product: Product
}

/** Discovery Kit card that prefers /images/v2/product-{slug}.png and falls back
 *  to the original product image when the v2 cutout is missing. */
export default function DiscoveryKitCard({ product }: DiscoveryKitCardProps) {
  const v2Src = `/images/v2/product-${product.slug}.png`
  const fallbackSrc = product.images[0]?.url
  const [src, setSrc] = useState(v2Src)

  const compare =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice
      : Math.round(product.price * 1.3)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white border border-ink/10"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f7f5f0]">
        <span className="absolute top-0 left-0 z-10 bg-[#e02323] text-white font-body text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5">
          Eid Sale
        </span>
        {src && (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={() => {
              if (src !== fallbackSrc && fallbackSrc) setSrc(fallbackSrc)
            }}
          />
        )}
      </div>
      <div className="px-5 py-5 text-center">
        <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-ink mb-2">
          {product.name}
        </p>
        <div className="flex justify-center items-baseline gap-2">
          <span className="font-body text-[13px] font-semibold text-[#e02323] whitespace-nowrap">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="font-body text-[11px] line-through text-ink-mute whitespace-nowrap">
            {formatPrice(compare, product.currency)}
          </span>
        </div>
      </div>
    </Link>
  )
}
