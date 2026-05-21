---
name: ar-rahmani-ui-components
description: Build the shared reusable UI components for AR-Rahmani Perfumes — ProductCard, Button, HorizontalScroller, TrustBar, CountdownTimer, and SectionHeader. These are used across all three pages. Use after skill-01-setup. Triggers: "build product card", "create shared components", "build UI components", "create button component", "build trust bar", "countdown timer", "horizontal scroller".
---

## Goal
Build all reusable UI primitives that are consumed by page-level components. These must be fully typed, motion-enhanced, and styled to the dark-luxury design system.

---

## Component 1 — Button (`src/components/ui/Button.tsx`)

Four variants: `primary` (gold filled), `outline` (gold border), `ghost` (text only), `dark` (charcoal filled).

```tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-obsidian hover:bg-gold-light border border-gold',
  outline:
    'bg-transparent text-gold border border-gold hover:bg-gold hover:text-obsidian',
  ghost:
    'bg-transparent text-cream/80 border border-transparent hover:text-gold',
  dark:
    'bg-charcoal text-cream border border-slate-dark hover:border-gold hover:text-gold',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-xs',
  lg: 'px-10 py-4 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      fullWidth = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'font-body font-medium tracking-widest uppercase',
          'transition-all duration-200 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

---

## Component 2 — SectionHeader (`src/components/ui/SectionHeader.tsx`)

Reusable eyebrow + heading + optional body text block with scroll-triggered fade-up.

```tsx
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  body?: string
  align?: 'left' | 'center' | 'right'
  headingSize?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  cta?: React.ReactNode
}

const headingSizes = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl lg:text-7xl',
}

const alignMap = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

export default function SectionHeader({
  eyebrow,
  heading,
  body,
  align = 'left',
  headingSize = 'md',
  className,
  cta,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', alignMap[align], className)}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      <h2
        className={cn(
          'font-display font-light text-white leading-[1.1]',
          headingSizes[headingSize]
        )}
      >
        {heading}
      </h2>

      {body && (
        <p className="font-body text-base text-cream/60 max-w-lg leading-relaxed mt-1">
          {body}
        </p>
      )}

      {cta && <div className="mt-4">{cta}</div>}
    </motion.div>
  )
}
```

---

## Component 3 — ProductCard (`src/components/ui/ProductCard.tsx`)

The primary product card used in grids and horizontal scrollers. Includes hover quick-view and add-to-cart.

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
  index?: number
  showInspiredBy?: boolean
}

const badgeStyles: Record<string, string> = {
  bestseller: 'bg-gold text-obsidian',
  new: 'bg-cream text-obsidian',
  sale: 'bg-red-800 text-white',
  featured: 'bg-gold/20 text-gold border border-gold/40',
  'fragrance-of-week': 'bg-gold text-obsidian',
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
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const primaryImage = product.images[0]
  const primaryVariant = product.variants[0]
  const badge = product.badges[0]

  const displayPrice = formatPrice(product.price, product.currency)
  const comparePrice = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, product.currency)
    : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative"
    >
      {/* ── Image Container ── */}
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden bg-charcoal"
        style={{ aspectRatio: '4/5' }}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={cn(
              'font-body text-[9px] font-bold tracking-widest uppercase px-2.5 py-1',
              badgeStyles[badge] ?? 'bg-charcoal text-cream'
            )}>
              {badgeLabels[badge] ?? badge}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.preventDefault(); setIsWishlisted((v) => !v) }}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-gold text-gold' : 'text-cream'}
          />
        </button>

        {/* Product Image */}
        <div
          className={cn(
            'w-full h-full transition-transform duration-500 group-hover:scale-[1.04]',
            !imageLoaded && 'bg-charcoal animate-pulse'
          )}
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>

        {/* Quick view hover overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <div className="bg-obsidian/90 backdrop-blur-sm py-3 text-center">
            <span className="font-body text-xs font-medium tracking-widest uppercase text-cream">
              Quick View
            </span>
          </div>
        </div>

        {/* Gold border reveal on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-all duration-300 pointer-events-none" />
      </Link>

      {/* ── Card Info ── */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          {showInspiredBy && product.inspiredBy && (
            <p className="font-body text-[10px] font-medium tracking-widest uppercase text-gold mb-1">
              Inspired by {product.inspiredBy}
            </p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-display text-base font-medium text-white leading-tight line-clamp-2 hover:text-gold transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-body text-sm font-medium text-cream">
              {displayPrice}
            </span>
            {comparePrice && (
              <span className="font-body text-xs text-muted line-through">
                {comparePrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart quick button */}
        <button
          aria-label={`Add ${product.name} to cart`}
          className="shrink-0 w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-all duration-200 mt-1"
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>
    </motion.article>
  )
}
```

---

## Component 4 — HorizontalScroller (`src/components/ui/HorizontalScroller.tsx`)

Touch/drag scrollable product row with left/right arrow navigation. Used for "Fragrance of the Week" and other strips.

```tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HorizontalScrollerProps {
  children: React.ReactNode
  className?: string
  itemWidth?: number
  gap?: number
}

export default function HorizontalScroller({
  children,
  className,
  gap = 16,
}: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative group/scroller', className)}>
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
          'w-10 h-10 rounded-full bg-charcoal border border-slate-dark',
          'flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold',
          'transition-all duration-200 shadow-xl',
          'opacity-0 group-hover/scroller:opacity-100',
          !canScrollLeft && '!opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ gap: `${gap}px`, paddingBottom: '4px' }}
      >
        {children}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
          'w-10 h-10 rounded-full bg-charcoal border border-slate-dark',
          'flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold',
          'transition-all duration-200 shadow-xl',
          'opacity-0 group-hover/scroller:opacity-100',
          !canScrollRight && '!opacity-0 pointer-events-none'
        )}
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}
```

---

## Component 5 — TrustBar (`src/components/ui/TrustBar.tsx`)

Four-item icon row for trust signals. Used on homepage and product pages.

```tsx
'use client'

import { motion } from 'framer-motion'
import { Truck, Award, Gift, RotateCcw } from 'lucide-react'

const trustItems = [
  {
    icon: Truck,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    subtitle: 'Authenticity guaranteed',
  },
  {
    icon: Gift,
    title: 'Luxury Packaging',
    subtitle: 'Gift-ready presentation',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: '7-day hassle-free returns',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-charcoal border-y border-slate-dark py-10 lg:py-14">
      <div className="container-ar">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <item.icon size={22} strokeWidth={1.2} className="text-gold" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">
                  {item.title}
                </p>
                <p className="font-body text-xs text-muted mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Component 6 — CountdownTimer (`src/components/ui/CountdownTimer.tsx`)

Real-time HH:MM:SS countdown to order cutoff. Used on Product Detail Page.

```tsx
'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetHour?: number  // 24h format, default 20 (8 PM)
}

function getSecondsUntil(targetHour: number): number {
  const now = new Date()
  const target = new Date(now)
  target.setHours(targetHour, 0, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  return Math.floor((target.getTime() - now.getTime()) / 1000)
}

function formatTime(seconds: number): { h: string; m: string; s: string } {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return {
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  }
}

export default function CountdownTimer({ targetHour = 20 }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(() => getSecondsUntil(targetHour))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s <= 1 ? getSecondsUntil(targetHour) : s - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetHour])

  const { h, m, s } = formatTime(seconds)

  return (
    <div className="inline-flex items-center gap-1 bg-obsidian border border-slate-dark px-3 py-1.5 rounded-sm">
      <span className="font-body text-xs text-muted uppercase tracking-wider mr-2">
        Next cutoff in
      </span>
      <span className="font-body text-sm font-medium text-gold tabular-nums">
        {h}:{m}:{s}
      </span>
    </div>
  )
}
```

---

## Component 7 — AccordionItem (`src/components/ui/AccordionItem.tsx`)

Single animated accordion row. Used for FAQ and product detail accordions.

```tsx
'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export default function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn(
      'border-b border-slate-dark py-5 transition-colors duration-200',
      open && 'border-gold/30'
    )}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className={cn(
          'font-body text-sm font-medium tracking-wide transition-colors duration-200',
          open ? 'text-gold' : 'text-cream group-hover:text-gold'
        )}>
          {question}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-gold">
          {open ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-cream/60 leading-relaxed pt-4 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## Verification Checklist
- [ ] Button all 4 variants render correctly with hover states
- [ ] SectionHeader animate on scroll (fade up, once)
- [ ] ProductCard shows gold badge top-left
- [ ] ProductCard hover: image scales, quick view slides up, gold border appears
- [ ] Wishlist heart toggles filled/unfilled
- [ ] HorizontalScroller arrows appear/disappear based on scroll position
- [ ] HorizontalScroller scrolls smoothly on touch and mouse drag
- [ ] TrustBar 2-column on mobile, 4-column on desktop
- [ ] CountdownTimer counts down in real time, resets at target hour
- [ ] AccordionItem height animates smoothly open and closed
- [ ] All components respect `prefers-reduced-motion`
