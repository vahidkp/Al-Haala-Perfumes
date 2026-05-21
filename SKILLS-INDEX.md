# AR-Rahmani Perfumes — Antigravity Skills Index

**Project:** AR-Rahmani Perfumes E-Commerce Website  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Sanity CMS · Zustand  
**Design Direction:** Dark / Luxury — inspired by Yusuf Bhai Fragrances & Afnan Perfumes  
**Pages in scope:** Homepage · Collection Page · Product Detail Page

---

## Skill Execution Order

Run skills in this exact sequence. Each skill depends on the ones before it.

```
skill-01-setup.md          ← Run first, always
skill-02-layout.md         ← Depends on 01
skill-03-ui-components.md  ← Depends on 01
skill-07-cms-data.md       ← Depends on 01 (can run parallel with 02/03)
skill-04-homepage.md       ← Depends on 02, 03
skill-05-collection-page.md ← Depends on 02, 03
skill-06-product-page.md   ← Depends on 02, 03
skill-08-cart-deploy.md    ← Run last
```

---

## Skill Map

| File | Name | What it builds | Trigger phrases |
|---|---|---|---|
| `skill-01-setup.md` | ar-rahmani-setup | Next.js scaffold, Tailwind config with design tokens, global CSS, fonts, TypeScript types, cart store | "set up project", "scaffold", "initialize", "design tokens", "Tailwind config" |
| `skill-02-layout.md` | ar-rahmani-layout | AnnouncementBar (marquee), Navbar (sticky blur, mobile menu), Footer (4-col, social, newsletter) | "navbar", "header", "footer", "announcement bar", "layout components" |
| `skill-03-ui-components.md` | ar-rahmani-ui-components | Button (4 variants), SectionHeader, ProductCard, HorizontalScroller, TrustBar, CountdownTimer, AccordionItem | "product card", "button", "UI components", "trust bar", "countdown", "accordion", "horizontal scroller" |
| `skill-04-homepage.md` | ar-rahmani-homepage | HeroSection, FeaturedStrip, CategoryGrid, BestSellers, EditorialBanner, ScentedDelights, NewsletterSection, page composition | "homepage", "hero", "best sellers", "category grid", "editorial banner", "featured strip" |
| `skill-05-collection-page.md` | ar-rahmani-collection-page | CollectionHero, FilterBar (sticky pills + sort), ProductGrid, load-more, empty state, URL-synced filters | "collection page", "shop page", "filter bar", "product listing", "sort dropdown" |
| `skill-06-product-page.md` | ar-rahmani-product-page | ImageGallery, ProductInfo (variants, qty, gift box, timer, CTAs), NoteExplorer, StoryBanner, FAQSection, RelatedProducts | "product page", "PDP", "product detail", "image gallery", "note explorer", "gift box", "volume selector" |
| `skill-07-cms-data.md` | ar-rahmani-cms-data | Sanity client, all schemas (product, category, siteSettings), GROQ queries, mock data file, studio route | "Sanity", "CMS", "data layer", "GROQ", "schema", "mock data", "queries" |
| `skill-08-cart-deploy.md` | ar-rahmani-cart-deploy | CartDrawer (slide-in, qty controls, free shipping bar), sitemap, robots.txt, next.config.ts, Vercel deployment, pre-launch checklist | "cart", "cart drawer", "deploy", "Vercel", "launch", "sitemap", "performance" |

---

## Design System Quick Reference

### Colors
| Token | Hex | Usage |
|---|---|---|
| obsidian | `#0D0D0D` | Page backgrounds |
| charcoal | `#1A1A1A` | Card/section backgrounds |
| slate-dark | `#2A2A2A` | Borders, dividers |
| gold | `#C9A84C` | Primary accent, CTAs, highlights |
| gold-light | `#E8C97A` | Hover states |
| cream | `#F5EFE0` | Body text |
| muted | `#888888` | Labels, meta |

### Typography
| Role | Font | Weight |
|---|---|---|
| Display / Headings | Cormorant Garamond | 300–700 (italic for accent) |
| Body / UI / Labels | DM Sans | 300–600 |

### Motion
- Entrance: `fade-up y:30→0, 0.7s easeOut`
- Grid stagger: `0.08s per item`
- Card hover: `scale(1.03) + gold border, 0.3s`
- Parallax banners: Framer Motion `useScroll + useTransform`

---

## Component Dependency Tree

```
RootLayout
├── AnnouncementBar         [skill-02]
├── Navbar                  [skill-02]
│   └── useCart             [skill-01]
├── CartDrawer              [skill-08]
│   └── useCart             [skill-01]
├── page.tsx (Homepage)     [skill-04]
│   ├── HeroSection
│   ├── FeaturedStrip
│   │   ├── SectionHeader   [skill-03]
│   │   ├── HorizontalScroller [skill-03]
│   │   └── ProductCard     [skill-03]
│   ├── CategoryGrid
│   ├── BestSellers
│   │   └── ProductCard     [skill-03]
│   ├── EditorialBanner (×2)
│   ├── ScentedDelights
│   ├── TrustBar            [skill-03]
│   └── NewsletterSection
├── collections/page.tsx    [skill-05]
│   ├── CollectionHero
│   ├── FilterBar
│   └── ProductGrid
│       └── ProductCard     [skill-03]
└── products/[slug]/page.tsx [skill-06]
    ├── ProductHero
    │   ├── ImageGallery
    │   └── ProductInfo
    │       ├── CountdownTimer [skill-03]
    │       └── AccordionItem  [skill-03]
    ├── NoteExplorer
    ├── StoryBanner
    ├── TrustBar            [skill-03]
    ├── RelatedProducts
    │   └── ProductCard     [skill-03]
    └── FAQSection
        └── AccordionItem   [skill-03]
Footer                      [skill-02]
```

---

## Data Flow

```
Sanity CMS (skill-07)
    │
    ├── getAllProducts()         → /collections page
    ├── getFeaturedProducts()   → Homepage FeaturedStrip
    ├── getBestSellers()        → Homepage BestSellers
    ├── getProductBySlug(slug)  → /products/[slug] page
    └── getRelatedProducts()    → PDP RelatedProducts

Mock data (skill-07)
    └── Used in place of Sanity during development
        until CMS content is populated

useCart (skill-01)
    ├── Navbar (badge count)
    ├── CartDrawer (items, total)
    └── ProductInfo (addItem)
```

---

## Key Files Reference

```
src/
├── app/
│   ├── layout.tsx                  ← skill-01 (updated by skill-02, skill-08)
│   ├── page.tsx                    ← skill-04
│   ├── sitemap.ts                  ← skill-08
│   ├── robots.ts                   ← skill-08
│   ├── collections/
│   │   ├── page.tsx                ← skill-05
│   │   └── CollectionClient.tsx    ← skill-05
│   ├── products/[slug]/
│   │   └── page.tsx                ← skill-06
│   └── studio/[[...tool]]/
│       └── page.tsx                ← skill-07
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx     ← skill-02
│   │   ├── Navbar.tsx              ← skill-02
│   │   ├── Footer.tsx              ← skill-02
│   │   └── CartDrawer.tsx          ← skill-08
│   ├── home/
│   │   ├── HeroSection.tsx         ← skill-04
│   │   ├── FeaturedStrip.tsx       ← skill-04
│   │   ├── CategoryGrid.tsx        ← skill-04
│   │   ├── BestSellers.tsx         ← skill-04
│   │   ├── EditorialBanner.tsx     ← skill-04
│   │   ├── ScentedDelights.tsx     ← skill-04
│   │   └── NewsletterSection.tsx   ← skill-04
│   ├── collections/
│   │   ├── CollectionHero.tsx      ← skill-05
│   │   ├── FilterBar.tsx           ← skill-05
│   │   └── ProductGrid.tsx         ← skill-05
│   ├── product/
│   │   ├── ProductHero.tsx         ← skill-06
│   │   ├── ImageGallery.tsx        ← skill-06
│   │   ├── ProductInfo.tsx         ← skill-06
│   │   ├── NoteExplorer.tsx        ← skill-06
│   │   ├── StoryBanner.tsx         ← skill-06
│   │   ├── FAQSection.tsx          ← skill-06
│   │   └── RelatedProducts.tsx     ← skill-06
│   └── ui/
│       ├── Button.tsx              ← skill-03
│       ├── SectionHeader.tsx       ← skill-03
│       ├── ProductCard.tsx         ← skill-03
│       ├── HorizontalScroller.tsx  ← skill-03
│       ├── TrustBar.tsx            ← skill-03
│       ├── CountdownTimer.tsx      ← skill-03
│       └── AccordionItem.tsx       ← skill-03
├── hooks/
│   └── useCart.ts                  ← skill-01
├── lib/
│   ├── utils.ts                    ← skill-01
│   ├── sanity.ts                   ← skill-07
│   ├── queries.ts                  ← skill-07
│   └── mock-data.ts                ← skill-07
├── types/
│   └── index.ts                    ← skill-01
└── styles/
    └── globals.css                 ← skill-01

sanity/
└── schemas/
    ├── product.ts                  ← skill-07
    ├── category.ts                 ← skill-07
    └── siteSettings.ts             ← skill-07

sanity.config.ts                    ← skill-07
tailwind.config.ts                  ← skill-01
next.config.ts                      ← skill-08
vercel.json                         ← skill-08
```

---

## NPM Dependencies Summary

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "next-sanity": "^7.0.0",
    "@sanity/client": "^6.0.0",
    "@sanity/image-url": "^1.0.0",
    "@portabletext/react": "^3.0.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

---

*Skills authored for Antigravity — AR-Rahmani Perfumes project, May 2026.*
