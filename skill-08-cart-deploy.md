---
name: ar-rahmani-cart-deploy
description: Build the Cart Drawer slide-in component for AR-Rahmani Perfumes, and set up the Vercel deployment configuration, environment variables, sitemap, robots.txt, and performance optimisations. Triggers: "build cart drawer", "create cart", "cart slide-in", "deploy to Vercel", "set up deployment", "vercel config", "sitemap", "performance", "launch checklist".
---

## Goal
Build the CartDrawer component (slide-in from right, accessible, animated) and configure the project for production deployment on Vercel.

---

## Component — CartDrawer (`src/components/layout/CartDrawer.tsx`)

Slide-in cart panel from the right edge. Opens on cart icon click or after "Add to Cart".

```tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart()
  const count = itemCount()
  const cartTotal = total()

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-charcoal flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-gold" />
                <h2 className="font-display text-xl font-medium text-white">
                  Your Cart
                </h2>
                {count > 0 && (
                  <span className="font-body text-xs font-medium text-muted">
                    ({count} {count === 1 ? 'item' : 'items'})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-cream/60 hover:text-gold transition-colors"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Items ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-center py-16">
                  <ShoppingBag size={48} strokeWidth={0.8} className="text-cream/20" />
                  <div>
                    <p className="font-display text-2xl font-light italic text-cream/40">
                      Your cart is empty
                    </p>
                    <p className="font-body text-sm text-muted mt-2">
                      Discover our collection of premium fragrances.
                    </p>
                  </div>
                  <Link href="/collections" onClick={closeCart}>
                    <Button variant="outline" size="md">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 py-4 border-b border-slate-dark last:border-0"
                  >
                    {/* Product image */}
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-obsidian">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base font-medium text-white line-clamp-2">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">
                        {item.volume}
                        {item.giftBox && ' · Gift Box'}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-0 border border-slate-dark">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            aria-label="Decrease"
                            className="w-7 h-7 flex items-center justify-center text-cream/60 hover:text-gold hover:bg-obsidian transition-colors"
                          >
                            <Minus size={10} strokeWidth={2} />
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center font-body text-xs text-cream border-x border-slate-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            aria-label="Increase"
                            className="w-7 h-7 flex items-center justify-center text-cream/60 hover:text-gold hover:bg-obsidian transition-colors"
                          >
                            <Plus size={10} strokeWidth={2} />
                          </button>
                        </div>

                        <p className="font-body text-sm font-medium text-cream">
                          {formatPrice(item.price * item.quantity, 'INR')}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      aria-label={`Remove ${item.name}`}
                      className="text-cream/30 hover:text-gold transition-colors self-start mt-1"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* ── Footer / Checkout ── */}
            {items.length > 0 && (
              <div className="border-t border-slate-dark px-6 py-6 space-y-4">

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted uppercase tracking-widest">Subtotal</span>
                  <span className="font-body text-lg font-medium text-cream">
                    {formatPrice(cartTotal, 'INR')}
                  </span>
                </div>

                {/* Free shipping progress */}
                {cartTotal < 999 && (
                  <div>
                    <p className="font-body text-xs text-muted mb-2">
                      Add {formatPrice(999 - cartTotal, 'INR')} more for free delivery
                    </p>
                    <div className="h-1 bg-slate-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${Math.min(100, (cartTotal / 999) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tax note */}
                <p className="font-body text-xs text-muted">
                  Taxes and shipping calculated at checkout.
                </p>

                {/* Checkout CTA */}
                <Button variant="primary" size="lg" fullWidth>
                  Proceed to Checkout
                </Button>

                <button
                  onClick={closeCart}
                  className="w-full font-body text-xs text-muted hover:text-cream transition-colors text-center tracking-widest uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
```

Add CartDrawer to root layout inside `<body>`:
```tsx
import CartDrawer from '@/components/layout/CartDrawer'
// ...
<CartDrawer />
```

---

## Sitemap (`src/app/sitemap.ts`)

```typescript
import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arrahmani.com'

  const products = await getAllProducts()

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    ...productEntries,
  ]
}
```

## Robots (`src/app/robots.ts`)

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arrahmani.com'
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

---

## `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' }, // dev only
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

export default config
```

---

## Vercel Deployment

### Environment Variables (set in Vercel dashboard)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxx
NEXT_PUBLIC_SITE_URL=https://arrahmani.com
```

### `vercel.json` (project root)

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "rewrites": [
    { "source": "/studio/:path*", "destination": "/studio/:path*" }
  ]
}
```

### Deploy Commands

```bash
# First deploy
npm i -g vercel
vercel --prod

# Subsequent deploys (via git push — auto)
git add .
git commit -m "feat: initial deployment"
git push origin main
```

---

## Pre-Launch Checklist

### Performance
- [ ] Run `npm run build` — no errors, no type errors
- [ ] Lighthouse score > 85 (Performance, Accessibility, SEO)
- [ ] LCP < 2.5s on product page (hero image optimised)
- [ ] No layout shift (CLS < 0.1) — all image dimensions defined
- [ ] `next/image` used on all images
- [ ] Fonts loaded with `next/font` (no FOUT)

### SEO
- [ ] `<title>` and `<meta description>` on all 3 pages
- [ ] `og:image` set on product pages
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] JSON-LD Product schema added to PDP

### Accessibility
- [ ] All icon-only buttons have `aria-label`
- [ ] Cart drawer has `role="dialog"` and `aria-modal="true"`
- [ ] Focus trapped in mobile menu and cart drawer when open
- [ ] Keyboard navigation works on filter pills
- [ ] Color contrast passes WCAG AA (gold on obsidian)

### Content
- [ ] All 3 placeholder images replaced with client's product images in Sanity
- [ ] Hero image uploaded and set in Site Settings
- [ ] At least 8 products created in Sanity with all fields
- [ ] Categories created (Oud, Attar, Bakhoor, Gifts, New)
- [ ] FAQ answers customised for client

### Client Handoff
- [ ] Sanity Studio access: invite client at `arrahmani.sanity.io`
- [ ] Record Loom walkthrough: how to add/edit products in Studio
- [ ] README written with local dev commands
- [ ] Domain pointed to Vercel (nameservers or CNAME)
- [ ] SSL certificate active on custom domain

---

## Verification Checklist — Cart Drawer
- [ ] Cart opens on cart icon click in navbar
- [ ] Cart opens automatically when item added to cart
- [ ] Escape key closes the drawer
- [ ] Backdrop click closes the drawer
- [ ] Body scroll is locked when drawer is open
- [ ] Quantity +/- updates correctly, removes at 0
- [ ] Remove button (×) removes item instantly
- [ ] Free delivery progress bar fills correctly toward ₹999
- [ ] Subtotal updates reactively with quantity changes
- [ ] Empty state shows "Shop Now" CTA
- [ ] Cart state persists across page reload (localStorage)
- [ ] Drawer slides in from right (not left) on all screen sizes
