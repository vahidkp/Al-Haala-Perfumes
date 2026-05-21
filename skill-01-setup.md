---
name: ar-rahmani-setup
description: Scaffold the AR-Rahmani Perfumes Next.js project with design system, global styles, fonts, Tailwind config, and base layout components. Use this skill FIRST before any other AR-Rahmani skill. Triggers: "set up the project", "scaffold AR-Rahmani", "create the Next.js project", "initialize the project", "set up design tokens", "set up Tailwind config".
---

## Goal
Scaffold the complete AR-Rahmani Perfumes Next.js 14 (App Router) project with all base configuration: Tailwind design tokens, global CSS variables, Google Fonts via next/font, TypeScript types, and the root layout.

## Tech Stack
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS v3
- Framer Motion
- Zustand (cart state)
- Sanity v3 (headless CMS)
- next/font (Google Fonts)
- Shadcn/ui (select components)

## Step 1 — Initialize Project

```bash
npx create-next-app@latest ar-rahmani --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ar-rahmani
npm install framer-motion zustand @sanity/client @portabletext/react next-sanity
npm install lucide-react clsx tailwind-merge
npx shadcn-ui@latest init
```

## Step 2 — tailwind.config.ts

Replace the generated config with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0D0D0D',
        charcoal: '#1A1A1A',
        slate: {
          dark: '#2A2A2A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark: '#A8873A',
        },
        cream: '#F5EFE0',
        muted: '#888888',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
```

## Step 3 — Global CSS (`src/styles/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ── */
:root {
  --color-obsidian: #0D0D0D;
  --color-charcoal: #1A1A1A;
  --color-slate: #2A2A2A;
  --color-gold: #C9A84C;
  --color-gold-light: #E8C97A;
  --color-gold-dark: #A8873A;
  --color-cream: #F5EFE0;
  --color-white: #FFFFFF;
  --color-muted: #888888;

  --font-display: var(--font-cormorant);
  --font-body: var(--font-dm-sans);

  --container-padding-x: clamp(24px, 5vw, 80px);
  --section-padding-y: clamp(64px, 10vw, 140px);
  --border-radius-card: 2px;
}

/* ── Base Reset ── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-obsidian);
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ── Typography Utilities ── */
.font-display {
  font-family: var(--font-display);
}

.text-gold {
  color: var(--color-gold);
}

.text-cream {
  color: var(--color-cream);
}

.text-muted {
  color: var(--color-muted);
}

/* ── Grain texture overlay utility ── */
.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* ── Gold border accent ── */
.gold-border-top {
  border-top: 1px solid var(--color-gold);
}

.gold-border-bottom {
  border-bottom: 1px solid var(--color-gold);
}

/* ── Horizontal scrollbar hide ── */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ── Container ── */
.container-ar {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--container-padding-x);
}

/* ── Section spacing ── */
.section-y {
  padding-block: var(--section-padding-y);
}

/* ── Eyebrow label ── */
.eyebrow {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold);
  display: block;
  margin-bottom: 12px;
}

/* ── Glassmorphism card ── */
.glass-dark {
  background: rgba(13, 13, 13, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 168, 76, 0.15);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Step 4 — Root Layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | AR-Rahmani Perfumes',
    default: 'AR-Rahmani Perfumes — Authentic Arabian Fragrances',
  },
  description: 'Premium Ouds, Attars, Bakhoor and Perfume Oils. Handcrafted Arabian fragrances delivered to your door.',
  openGraph: {
    siteName: 'AR-Rahmani Perfumes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-obsidian text-cream font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

## Step 5 — TypeScript Types (`src/types/index.ts`)

```typescript
export interface ProductImage {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Note {
  name: string
  icon?: string
}

export interface ProductVariant {
  id: string
  volume: string
  price: number
  compareAtPrice?: number
  stock: number
  sku: string
}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
  description?: string
}

export type ProductBadge = 'bestseller' | 'new' | 'sale' | 'featured' | 'fragrance-of-week'
export type Orientation = 'men' | 'women' | 'unisex'
export type Concentration = 'EDP' | 'EDP Intense' | 'Attar' | 'EDP Extrait' | 'EDT'

export interface Product {
  id: string
  slug: string
  name: string
  tagline?: string
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: string[]
  badges: ProductBadge[]
  inspiredBy?: string
  orientation: Orientation
  fragranceFamily: string
  concentration: Concentration
  notes: {
    opening: Note[]
    heart: Note[]
    dryDown: Note[]
  }
  relatedProducts?: string[]
  giftBoxAvailable: boolean
  giftBoxPrice?: number
  isFeaturedOfWeek: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: string
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  giftBox: boolean
  name: string
  image: string
  price: number
  volume: string
}

export interface SiteSettings {
  announcementMessages: string[]
  heroHeadline: string
  heroSubheadline: string
  heroCta: string
  heroImage: string
  instagramHandle: string
  newsletterHeadline: string
}
```

## Step 6 — Utility Helpers (`src/lib/utils.ts`)

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}
```

## Step 7 — Cart Store (`src/hooks/useCart.ts`)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        )
        if (existing) {
          get().updateQuantity(item.productId, item.variantId, existing.quantity + item.quantity)
        } else {
          set((s) => ({ items: [...s.items, item] }))
        }
        set({ isOpen: true })
      },

      removeItem: (productId, variantId) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),

      updateQuantity: (productId, variantId, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: Math.max(0, qty) }
              : i
          ).filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      total: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'ar-rahmani-cart' }
  )
)
```

## Verification Checklist
- [ ] `npm run dev` starts without errors on `localhost:3000`
- [ ] Fonts load correctly (Cormorant + DM Sans visible in DevTools)
- [ ] Tailwind gold/obsidian colors available (check in browser)
- [ ] TypeScript strict mode passes (`npm run build`)
- [ ] Cart persists across page reload (check localStorage)
