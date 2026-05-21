---
name: ar-rahmani-homepage
description: Build all homepage sections for AR-Rahmani Perfumes — HeroSection, FeaturedStrip (Fragrance of the Week), CategoryGrid, BestSellers, EditorialBanners, SocialStrip, and the full page composition. Use after skill-02-layout and skill-03-ui-components. Triggers: "build the homepage", "create hero section", "build best sellers section", "create category grid", "build editorial banners", "fragrance of the week section", "build homepage sections", "social proof strip".
---

## Goal
Build all homepage section components and the final page composition at `src/app/page.tsx`. Each section is independently animated and scroll-triggered.

---

## Component 1 — HeroSection (`src/components/home/HeroSection.tsx`)

Full-viewport hero with staggered editorial text reveal. Background image with gradient overlay.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl?: string
}

// Word-by-word stagger helper
function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export default function HeroSection({
  headline = 'The Essence of Arabia',
  subheadline = 'Handcrafted Ouds, Attars & Bakhoor born from ancient tradition',
  ctaLabel = 'Explore Collection',
  ctaHref = '/collections',
  imageUrl = '/images/hero-bg.jpg',
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="AR-Rahmani Perfumes — Hero"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/50 to-obsidian/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-ar text-center flex flex-col items-center">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="eyebrow mb-4"
        >
          New Collection
        </motion.span>

        {/* Headline */}
        <h1 className="font-display font-light italic text-white leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(52px, 8vw, 108px)' }}
        >
          <AnimatedHeadline text={headline} />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="font-body text-cream/70 max-w-md leading-relaxed mb-10"
          style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href={ctaHref}>
            <Button variant="outline" size="lg">
              {ctaLabel}
            </Button>
          </Link>
          <a
            href="#collections"
            className="font-body text-sm font-medium tracking-widest uppercase text-cream/60 hover:text-gold transition-colors duration-200 flex items-center gap-2"
          >
            Our Story
            <ChevronDown size={14} strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} strokeWidth={1} className="text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

---

## Component 2 — FeaturedStrip (`src/components/home/FeaturedStrip.tsx`)

"Fragrance of the Week" horizontal scrollable product strip.

```tsx
import SectionHeader from '@/components/ui/SectionHeader'
import HorizontalScroller from '@/components/ui/HorizontalScroller'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface FeaturedStripProps {
  products: Product[]
}

export default function FeaturedStrip({ products }: FeaturedStripProps) {
  return (
    <section className="section-y bg-obsidian" id="collections">
      <div className="container-ar">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            eyebrow="Fragrance of the Week"
            heading="This Week's Highlight"
          />
          <a
            href="/collections"
            className="font-body text-xs font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors shrink-0 hidden sm:block"
          >
            View All →
          </a>
        </div>

        <HorizontalScroller gap={20}>
          {products.map((product, i) => (
            <div key={product.id} className="shrink-0 w-[200px] sm:w-[240px]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  )
}
```

---

## Component 3 — CategoryGrid (`src/components/home/CategoryGrid.tsx`)

Image-based category navigation tiles in a responsive grid.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  { name: 'Oud Perfumes', slug: 'oud', image: '/images/cat-oud.jpg' },
  { name: 'Attar / Perfume Oil', slug: 'attar', image: '/images/cat-attar.jpg' },
  { name: 'Bakhoor', slug: 'bakhoor', image: '/images/cat-bakhoor.jpg' },
  { name: 'Gift Sets', slug: 'gifts', image: '/images/cat-gifts.jpg' },
  { name: 'New Arrivals', slug: 'new', image: '/images/cat-new.jpg' },
  { name: 'Collections', slug: '', image: '/images/cat-all.jpg' },
]

export default function CategoryGrid() {
  return (
    <section className="section-y bg-charcoal">
      <div className="container-ar">
        <div className="text-center mb-12">
          <span className="eyebrow">Shop By Category</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Find Your Scent
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <Link
                href={`/collections${cat.slug ? `?category=${cat.slug}` : ''}`}
                className="group relative block overflow-hidden bg-obsidian"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent transition-opacity duration-300 group-hover:from-obsidian/60" />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-all duration-300" />

                {/* Category name */}
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-display text-xl md:text-2xl font-medium italic text-white leading-tight group-hover:text-gold transition-colors duration-200">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Component 4 — BestSellers (`src/components/home/BestSellers.tsx`)

4-column best seller product grid with section header and view-all CTA.

```tsx
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

interface BestSellersProps {
  products: Product[]
}

export default function BestSellers({ products }: BestSellersProps) {
  return (
    <section className="section-y bg-obsidian">
      <div className="container-ar">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Our Collection"
            heading="Best Sellers"
          />
          <Link href="/collections" className="hidden sm:block">
            <Button variant="ghost" size="sm">View All →</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12 sm:hidden">
          <Link href="/collections">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

---

## Component 5 — EditorialBanner (`src/components/home/EditorialBanner.tsx`)

Reusable full-bleed editorial banner used for "For Men", "For Women", collection spotlights.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'

interface EditorialBannerProps {
  eyebrow?: string
  heading: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl: string
  imageAlt: string
  textAlign?: 'left' | 'right' | 'center'
  height?: string
}

export default function EditorialBanner({
  eyebrow,
  heading,
  ctaLabel = 'Shop Now',
  ctaHref = '/collections',
  imageUrl,
  imageAlt,
  textAlign = 'left',
  height = '60vh',
}: EditorialBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const alignStyles = {
    left: 'items-end justify-start text-left pl-[8%]',
    right: 'items-end justify-end text-right pr-[8%]',
    center: 'items-center justify-center text-center',
  }

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height }}>

      {/* Parallax image */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-obsidian/10" />
      </motion.div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col pb-12 ${alignStyles[textAlign]}`}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-sm"
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-[1.05] mb-6">
            {heading}
          </h2>
          <Link href={ctaHref}>
            <Button variant="outline" size="md">{ctaLabel}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Component 6 — ScentedDelights (`src/components/home/ScentedDelights.tsx`)

3-column category card row for Perfumes / Bakhoor / Home.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const delights = [
  { label: 'Perfumes', href: '/collections?category=oud', image: '/images/delight-perfumes.jpg' },
  { label: 'Bakhoor', href: '/collections?category=bakhoor', image: '/images/delight-bakhoor.jpg' },
  { label: 'Attar Oils', href: '/collections?category=attar', image: '/images/delight-attar.jpg' },
]

export default function ScentedDelights() {
  return (
    <section className="section-y bg-charcoal">
      <div className="container-ar">
        <div className="text-center mb-12">
          <span className="eyebrow">Explore</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Scented Delights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {delights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden bg-obsidian"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-display text-3xl font-medium italic text-white">
                    {item.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Component 7 — NewsletterSection (`src/components/home/NewsletterSection.tsx`)

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: connect to email service
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="section-y bg-charcoal border-t border-slate-dark">
      <div className="container-ar">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="eyebrow">Newsletter</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">
            Be First to Know
          </h2>
          <p className="font-body text-base text-cream/60 mb-10">
            Join for exclusive launches, seasonal offers, and fragrance stories delivered to your inbox.
          </p>

          {submitted ? (
            <p className="font-body text-sm text-gold tracking-widest uppercase">
              ✦ You're on the list. Welcome.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-obsidian border border-slate-dark border-r-0 sm:border-r-0 px-5 py-3.5 font-body text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Page Composition (`src/app/page.tsx`)

```tsx
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedStrip from '@/components/home/FeaturedStrip'
import CategoryGrid from '@/components/home/CategoryGrid'
import BestSellers from '@/components/home/BestSellers'
import EditorialBanner from '@/components/home/EditorialBanner'
import ScentedDelights from '@/components/home/ScentedDelights'
import NewsletterSection from '@/components/home/NewsletterSection'
import TrustBar from '@/components/ui/TrustBar'

// Mock data — replace with Sanity fetch
import { mockProducts, mockFeaturedProducts } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedStrip products={mockFeaturedProducts} />
      <CategoryGrid />
      <BestSellers products={mockProducts} />
      <EditorialBanner
        eyebrow="Our Collection"
        heading="For Men"
        ctaHref="/collections?category=men"
        imageUrl="/images/banner-men.jpg"
        imageAlt="AR-Rahmani Men's Collection"
        textAlign="left"
        height="65vh"
      />
      <BestSellers products={mockProducts.filter(p => p.orientation === 'men')} />
      <EditorialBanner
        eyebrow="Our Collection"
        heading="For Women"
        ctaHref="/collections?category=women"
        imageUrl="/images/banner-women.jpg"
        imageAlt="AR-Rahmani Women's Collection"
        textAlign="right"
        height="65vh"
      />
      <ScentedDelights />
      <TrustBar />
      <NewsletterSection />
    </>
  )
}
```

---

## Verification Checklist
- [ ] Hero text animates word-by-word on page load
- [ ] Hero scroll indicator bounces continuously
- [ ] Featured strip arrows appear on hover, scroll the strip
- [ ] Category grid images zoom on hover with gold border
- [ ] Best sellers stagger-animate on scroll into view
- [ ] Editorial banners have parallax on background image
- [ ] Men/Women banners alternate text alignment
- [ ] Newsletter form shows success message after submit
- [ ] Trust bar renders 2-col mobile, 4-col desktop
- [ ] No layout shift (CLS) on image load
