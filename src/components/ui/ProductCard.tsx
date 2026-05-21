'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Heart } from 'lucide-react'
import { cn, formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
  index?: number
  showInspiredBy?: boolean
  /** "light" = white card on cream bg (default). "dark" = forest card on forest bg. */
  theme?: 'light' | 'dark'
}

const badgePillStyles: Record<string, string> = {
  bestseller: 'bg-forest text-cream',
  new: 'bg-cream-warm text-forest',
  sale: 'bg-sale text-white',
  featured: 'bg-forest text-cream',
  'fragrance-of-week': 'bg-cream-warm text-forest border border-forest/20',
}

const badgeLabels: Record<string, string> = {
  bestseller: 'Best Seller',
  new: 'New',
  sale: 'Sale',
  featured: 'Featured',
  'fragrance-of-week': 'Fragrance of the Week',
}

export default function ProductCard({
  product,
  priority = false,
  index = 0,
  showInspiredBy = true,
  theme = 'light',
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const primaryImage = product.images[0]
  const primaryVariant = product.variants[0]
  const badge = product.badges[0]

  const displayPrice = formatPrice(product.price, product.currency)
  const comparePrice = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, product.currency)
    : null

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!primaryVariant) return
    addItem({
      productId: product.id,
      variantId: primaryVariant.id,
      quantity: 1,
      giftBox: false,
      name: product.name,
      image: primaryImage?.url ?? '',
      price: primaryVariant.price,
      volume: primaryVariant.volume,
    })
  }

  const isDark = theme === 'dark'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col h-full',
        isDark
          ? 'bg-forest-light text-cream'
          : 'bg-cream-paper text-ink'
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          'relative block aspect-square w-full overflow-hidden',
          isDark ? 'bg-forest-deep' : 'bg-cream-warm'
        )}
      >
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                'font-body text-[9px] font-bold tracking-widest uppercase px-2.5 py-1',
                badgePillStyles[badge] ?? 'bg-forest text-cream'
              )}
            >
              {badgeLabels[badge] ?? badge}
            </span>
          </div>
        )}

        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-3 right-3 z-10">
            <span className="font-body text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 bg-sale text-white">
              {Math.round(
                (1 - product.price / product.compareAtPrice) * 100
              )}% Off
            </span>
          </div>
        )}

        <button
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted((v) => !v)
          }}
          className="absolute bottom-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/95 border border-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-forest text-forest' : 'text-ink'}
          />
        </button>

        {primaryImage?.url ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-mute/40 font-display text-3xl tracking-widest">
            {product.name?.[0] ?? 'AR'}
          </div>
        )}
      </Link>

      <div className="px-3 py-3 lg:px-5 lg:py-5 flex-1 flex flex-col gap-1.5 text-center">
        {showInspiredBy && (
          <p
            className={cn(
              'font-body text-[9px] font-semibold tracking-widest uppercase min-h-[14px]',
              isDark ? 'text-cream/60' : 'text-ink-mute'
            )}
          >
            {product.inspiredBy ? `Inspired by ${product.inspiredBy}` : ' '}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={cn(
              'font-display text-[13px] md:text-[15px] font-medium tracking-[0.1em] md:tracking-[0.18em] uppercase leading-snug line-clamp-2 transition-colors',
              isDark
                ? 'text-cream hover:text-white'
                : 'text-ink hover:text-forest'
            )}
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mt-1">
          <span
            className={cn(
              'font-body text-[12px] md:text-[13px] font-medium whitespace-nowrap',
              isDark ? 'text-cream/90' : 'text-ink'
            )}
          >
            From {displayPrice}
          </span>
          {comparePrice && (
            <span
              className={cn(
                'font-body text-[11px] md:text-[12px] line-through whitespace-nowrap',
                isDark ? 'text-cream/40' : 'text-ink-mute'
              )}
            >
              {comparePrice}
            </span>
          )}
        </div>

        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={handleQuickAdd}
          className={cn(
            'mt-auto mx-auto font-body text-[10px] font-medium tracking-widest uppercase px-4 lg:px-5 py-2 whitespace-nowrap transition-all',
            isDark
              ? 'border border-cream/30 text-cream hover:bg-cream hover:text-forest'
              : 'border border-forest/40 text-forest hover:bg-forest hover:text-cream'
          )}
        >
          <Plus size={12} strokeWidth={2} className="inline mr-1" />
          Add to Cart
        </button>
      </div>
    </motion.article>
  )
}
