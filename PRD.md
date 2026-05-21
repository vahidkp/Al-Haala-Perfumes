# Product Requirements Document
## AR-Rahmani Perfumes — E-Commerce Website

**Version:** 1.0  
**Date:** May 2026  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Shadcn/ui · Framer Motion  
**Scope:** Three core pages — Homepage, Collection/Shop Page, Product Detail Page  
**Design Direction:** Dark / Luxury — inspired by Yusuf Bhai Fragrances & Afnan Perfumes

---

## 1. Project Overview

AR-Rahmani Perfumes is a premium fragrance brand offering Ouds, Attars, Perfume Oils, and Bakhoor. The client needs a dark-luxury e-commerce website that positions their products as aspirational, high-quality, and desirable online. The site must be editable (headless CMS), performant, and conversion-optimised.

### Business Goals
- Establish a credible, premium online presence
- Enable 24/7 product discovery and sales
- Build brand trust through rich storytelling and visual hierarchy
- Compete with mid-to-high-tier fragrance brands in visual quality

### Design Philosophy
The site takes cues from both inspirations:
- **Yusuf Bhai:** Deep forest-green + cream palette, editorial large typography, clean product-first layouts, subtle category dividers, warm leather/wood lifestyle imagery
- **Afnan:** Full-bleed hero imagery, cinematic product photography sections, bold collection banners, icon-row trust signals, fragrance note explorers

The AR-Rahmani aesthetic fuses both: **deep charcoal/obsidian backgrounds**, **warm gold/amber accents**, cream secondary text, and carefully spaced editorial sections. Typography leans serif-display for headings, clean sans for body.

---

## 2. Design System

### 2.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-obsidian` | `#0D0D0D` | Primary background |
| `--color-charcoal` | `#1A1A1A` | Card/section backgrounds |
| `--color-slate` | `#2A2A2A` | Borders, dividers |
| `--color-gold` | `#C9A84C` | Primary accent, CTAs, highlights |
| `--color-gold-light` | `#E8C97A` | Hover states, shimmer |
| `--color-cream` | `#F5EFE0` | Body text, secondary elements |
| `--color-white` | `#FFFFFF` | Headlines, nav |
| `--color-muted` | `#888888` | Labels, meta text |

### 2.2 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | `Cormorant Garamond` | 300–700 | Italic variants for accent phrases |
| Headings H2–H3 | `Cormorant Garamond` | 500 | Uppercase tracking |
| Body / UI | `DM Sans` | 300–400 | Clean, readable |
| Labels / Tags | `DM Sans` | 500 | Uppercase, wide tracking |
| Price | `DM Sans` | 600 | Tabular numbers |

Google Fonts import: `Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600`

### 2.3 Spacing & Layout

- Max content width: `1440px`
- Container padding: `24px` (mobile) → `80px` (desktop)
- Section vertical rhythm: `80px` (mobile) → `140px` (desktop)
- Grid: 12-column, 24px gutters
- Breakpoints: `sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px` · `2xl: 1440px`

### 2.4 Motion Principles

- All entrance animations: fade-up with `y: 30px → 0`, duration `0.7s`, ease `easeOut`
- Stagger delay on grids: `0.08s` per item
- Hover on cards: `scale(1.03)` + subtle gold border reveal, `0.3s`
- Hero text: staggered word-by-word reveal on load
- Scroll-triggered sections via Framer Motion `whileInView` with `once: true`

---

## 3. Site Architecture

```
/                         ← Homepage
/collections              ← Shop / Collection Listing Page
/products/[slug]          ← Product Detail Page
```

Supporting (scaffolded but not in scope):
```
/cart
/checkout
/about
/contact
```

---

## 4. Page Specifications

---

### 4.1 Page 1: Homepage (`/`)

The homepage is the brand's primary impression. It combines cinematic hero storytelling, curated product discovery, category navigation, editorial banners, and social proof. Modelled closely after Yusuf Bhai's homepage structure with Afnan's cinematic full-bleed banner treatment.

---

#### 4.1.1 Announcement Bar

**Location:** Fixed top, above header  
**Height:** `40px`  
**Style:** Dark gold background (`#C9A84C`), charcoal text, centered  
**Content:** Rotating marquee of 3 messages:
- "Free delivery on orders above ₹999"
- "New Arrivals — Premium Oud Collection Now Live"
- "Authentically crafted Arabian fragrances"

**Behaviour:** Auto-scrolling ticker (CSS marquee animation), no JS required

---

#### 4.1.2 Navigation Header

**Position:** Sticky, below announcement bar  
**Background:** `rgba(13,13,13,0.92)` with `backdrop-filter: blur(12px)`  
**Height:** `72px` desktop, `60px` mobile

**Left:** Brand wordmark — "AR-RAHMANI" in Cormorant Garamond, 22px, letter-spacing wide  
**Center:** Nav links — Home · Collections · Gifts · Bakhoor · Attar · About  
**Right:** Search icon · Account icon · Cart icon (with badge)

**Mobile:** Hamburger → full-screen dark overlay menu with staggered link reveal

**Active state:** Gold underline (`2px solid --color-gold`)  
**Hover:** Text shifts to `--color-gold`, transition `0.2s`

---

#### 4.1.3 Hero Section

**Height:** `100vh` minimum  
**Layout:** Full-bleed background image/video with centered editorial text overlay

**Background:** Hero campaign image (dark, moody — oud/amber lifestyle shot)  
**Overlay:** `linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.7) 100%)`

**Content (centered, vertically middle):**
```
[Label tag] — NEW COLLECTION
[H1 Display] — "The Essence
               of Arabia"           ← Cormorant Garamond, 96px desktop / 52px mobile, italic
[Subtext] — "Handcrafted Ouds, Attars & Bakhoor
             born from ancient tradition"   ← DM Sans 18px, cream, 500px max-width
[CTA Button] — "Explore Collection"  ← Gold border + text, hover: fill gold
[Secondary CTA] — "Our Story ↓"    ← Text only, cream
```

**Animation:**
- Label fades in first (0.3s delay)
- H1 words reveal one by one (0.1s stagger each word)
- Subtext fades up (0.8s delay)
- CTAs fade up (1.0s delay)

**Scroll indicator:** Animated chevron-down at bottom center

---

#### 4.1.4 "Fragrance of the Week" / Featured Strip

**Layout:** Full-width section, dark background  
**Style:** Matches Yusuf Bhai's "Fragrance of the Week" horizontal scroll strip

**Header:**
- Eyebrow label: `FRAGRANCE OF THE WEEK` (gold, uppercase, tracked)
- H2: "This Week's Highlight"

**Content:** Horizontal scrollable row of 5–6 product cards  
Each card:
- Square product image (1:1)
- Product name (Cormorant, 16px)
- Price (DM Sans, 14px, muted)
- `+` quick-add button (bottom right)
- Hover: scale + gold ring

**Navigation:** Arrow buttons left/right (ghost style)

---

#### 4.1.5 Category Navigation Grid

**Layout:** 2×3 or 3×2 grid (desktop), horizontal scroll (mobile)  
**Style:** Matches Afnan's icon-based category row, but larger and more editorial

**Categories:**
1. Oud Perfumes
2. Attar / Perfume Oil
3. Bakhoor
4. Gift Sets
5. New Arrivals
6. Collections

Each tile:
- Background: lifestyle/product image with dark overlay
- Category name centered (Cormorant, 24px, white)
- Subtle gold border on hover, scale(1.02)
- Aspect ratio: `3/4` (portrait)

---

#### 4.1.6 Best Sellers Section

**Header:**
- Eyebrow: `OUR COLLECTION` (gold)
- H2: "Best Sellers"
- Right-aligned: "View All →" link

**Layout:** 4-column grid (desktop) → 2-column (tablet) → 1-column (mobile)  
**Product Card (Standard):**
- Image: 4:5 aspect ratio, dark background
- Badge: "BEST SELLER" or "NEW" pill (gold or cream)
- Product Name: Cormorant 18px
- Inspired by tag (if applicable): DM Sans 12px, muted
- Price: DM Sans 16px, white
- Sale price: struck-through in muted, new price in gold
- Add to cart `+` button (absolute, bottom right, gold circle)

**Animation:** Staggered card entrance on scroll

---

#### 4.1.7 Full-Bleed Editorial Banner — For Men

**Layout:** Full-width image banner, 60vh height  
**Image:** Dark, moody masculine lifestyle/product shot  
**Overlay text (bottom-left positioned):**
```
[Eyebrow] OUR COLLECTION
[H2] "For Men"
[CTA] "Shop Now →"
```
**Style:** Text overlaid on left third of image, right portion shows imagery clearly  
**Hover:** Subtle parallax on background image

---

#### 4.1.8 Collection Highlight — Attar / Perfume Oil

**Layout:** Alternating 2-col split — image left, content right (then reversed on next)  
**Image:** Warm amber/golden lifestyle shot  
**Content:**
```
[Eyebrow] PERFUME OIL (ATTAR)
[H2] "Timeless Attars, Bottled"
[Body] 2–3 lines of brand copy
[CTA] "Explore Attars →"
```
**Style:** Generous padding, the content side has subtle grain texture overlay

---

#### 4.1.9 Full-Bleed Editorial Banner — For Women

Same pattern as 4.1.7 but feminine/floral imagery, right-aligned text block.

---

#### 4.1.10 "Scented Delights" Category Cards

**Layout:** 3-column card row  
**Cards:** Large image-first with category label beneath  
1. Perfumes
2. Candles / Bakhoor
3. Wax / Home

Similar to Yusuf Bhai's "Scented Delights" section. Each card links to its collection page.

---

#### 4.1.11 Signature Collection / Brand Story Banner

**Layout:** Full-bleed dark section  
**Background:** Deep dark with subtle noise texture  
**Content (centered):**
```
[Eyebrow] THE ESSENCE OF AR-RAHMANI
[H2] "A Legacy Woven in Fragrance"
[Body] Brand story paragraph (3–4 lines)
[CTA] "Discover Our Story"
```
**Visual:** Floating product bottle image on right side with glow/shadow treatment

---

#### 4.1.12 Instagram / Social Proof Strip

**Layout:** Full-width horizontal scroll of 6 square social images  
**Header:** `FOLLOW US @ARRAHMANI`  
**Each tile:** Image with Instagram icon on hover + overlay tint  
**CTA below:** "Follow on Instagram →"

---

#### 4.1.13 Trust / Services Row

**Layout:** 4-column icon row on dark/charcoal background  
**Items:**
1. 🚚 Free Delivery Above ₹999
2. ✦ Premium Quality Guaranteed
3. 🎁 Luxury Gift Packaging
4. 🔄 Easy Returns
Each: Icon (SVG) + short label + 1-line description  
Style: Matches Yusuf Bhai's bottom icon row treatment

---

#### 4.1.14 Newsletter Section

**Background:** Dark charcoal with gold accent line at top  
**Content:**
```
[Eyebrow] NEWSLETTER
[H2] "Be First to Know"
[Body] Join for exclusive launches, offers, and fragrance stories
[Input + Button] Email input → "Subscribe" (gold button)
```

---

#### 4.1.15 Footer

**Layout:** 4-column desktop, stacked mobile  
**Columns:**
1. **AR-Rahmani** — Logo + tagline + social icons (Instagram, WhatsApp, Facebook, TikTok)
2. **Information** — FAQ · About Us · Careers · Shipping & Return · Privacy Policy
3. **Customer Service** — Contact Us · Track Order · Wholesale Inquiry · Store Locator
4. **Shop** — Oud Perfumes · Attar · Bakhoor · Gift Sets · New Arrivals

**Bottom bar:** © 2026 AR-Rahmani Perfumes · All Rights Reserved · [Payment icons]

---

### 4.2 Page 2: Collection / Shop Page (`/collections`)

The shop page allows users to browse all products with filtering and sorting. Inspired by both Afnan's product listing structure and Yusuf Bhai's clean category navigation.

---

#### 4.2.1 Page Hero / Banner

**Height:** `40vh`  
**Content:** Collection name (Cormorant display) + breadcrumb  
**Background:** Lifestyle image with heavy dark overlay  
**Layout:** Centered title — "Our Collection" or dynamic per category

---

#### 4.2.2 Filter & Sort Bar

**Position:** Sticky below header  
**Background:** `--color-charcoal` with bottom border  
**Left side — Filter Pills:**
- All
- Oud Perfumes
- Attar
- Bakhoor
- Gift Sets
- For Men
- For Women
- Unisex
- New Arrivals

Active pill: Gold background + dark text  
Inactive: Ghost with cream text

**Right side — Sort Dropdown:**
- Featured
- Price: Low to High
- Price: High to Low
- Newest First
- Best Selling

**Mobile:** Filter pills become horizontal scroll, sort collapses to icon button

---

#### 4.2.3 Results Count + Active Filters

Below filter bar: `Showing 24 of 48 products` (DM Sans, muted)  
Active filter tags: removable chips

---

#### 4.2.4 Product Grid

**Desktop:** 4 columns  
**Tablet:** 2–3 columns  
**Mobile:** 2 columns  
**Gap:** `24px`

**Product Card (same as homepage standard card, see 4.1.6)** plus:
- Quick View button on hover (slide up from bottom of card)
- Wishlist heart icon (top right)
- "Inspired by [Brand]" badge if applicable

**Load More:** "Load More Products" button at bottom (ghost style, gold border) OR infinite scroll toggle

---

#### 4.2.5 Empty State

If no products match filter: centered illustration + "No products found" message + "Clear Filters" CTA.

---

### 4.3 Page 3: Product Detail Page (`/products/[slug]`)

The richest page — combining structured purchase information (Yusuf Bhai style) with cinematic storytelling (Afnan's note-explorer treatment below the fold).

---

#### 4.3.1 Breadcrumb

`Home > Collections > [Product Name]`  
DM Sans, 13px, muted

---

#### 4.3.2 Product Gallery + Info (Above the Fold)

**Layout:** 50/50 split — gallery left, info right (desktop) · stacked (mobile)

**LEFT — Product Gallery:**
- Main image: full-width within panel, 1:1 aspect ratio
- Thumbnail strip: 4–5 small images below, scrollable
- Image zoom on hover (CSS transform scale)
- Mobile: swipeable image carousel

**RIGHT — Product Info:**

```
[Badge row] "FRAGRANCE OF THE WEEK" pill · "INSPIRED BY [BRAND]" pill
[H1] Product Name (Cormorant, 36px desktop)
[Price] ₹XXXX.00  [strikethrough if on sale]
[Tax note] Tax excluded.

[Attribute chips — horizontal row]
• Orientation: Unisex / Men / Women
• Fragrance Family: Oriental / Floral / Woody etc.
• Concentration: EDP / EDP Intense / Attar

[Volume Selector]
  [ 100ml ]  [ 50ml ]  [ 12ml Attar ]
  Pill buttons, selected = gold filled

[Quantity Selector]
  [ − ]  [ 1 ]  [ + ]

[Gift Box Add-on Card]
  ┌─────────────────────────────────────────┐
  │ [Thumbnail]  GIFT BOX                   │
  │              Luxury packaging with      │
  │              signature finishing.       │
  │              ₹99.00              [ ☐ ] │
  └─────────────────────────────────────────┘

[ADD TO CART button] — full width, gold border/text
[BUY IT NOW button] — full width, gold filled, dark text

[Frequently Bought Together]
  Small card: companion product + price + add icon

[Delivery Information Box]
  ✦ Get it by [Date] within [Region]
  Next cutoff in: [HH:MM:SS countdown]

[New Customer Banner]
  Soft bordered box: "First order? Use code WELCOME for 5% off"

[Trust Icons Row — inline]
  🌿 No Toxics · 🚚 Free Delivery ₹999+ · 🔒 Secure Payments
```

---

#### 4.3.3 Product Description (Below Gallery Row)

**Left side:** Long-form product description  
- Bold product name lead  
- 2–3 paragraph narrative about the scent profile  
- **Bold inline** key notes  

**Right side (or below on mobile):** Accordion sections  
- DISCLAIMER  
- FRAGRANCE CARE & STORAGE  
- HOW TO USE  
Each accordion: + toggle, smooth height animation

---

#### 4.3.4 "Discover The Notes" Section

**Full-width editorial section** — inspired directly by Afnan's note explorer  
**Background:** Immersive nature/landscape imagery (dark, atmospheric)  
**Header:** "Discover The Notes" · "Explore the fragrance journey from top to base"

**3-column note cards (overlaid on image background):**

| Opening Notes | Heart Notes | Dry-Down Notes |
|---|---|---|
| [Top note icons] | [Mid note icons] | [Base note icons] |
| Note 1 | Note 1 | Note 1 |
| Note 2 | Note 2 | Note 2 |

Each note has a small icon (leaf, flower, wood etc.) + name  
Cards have dark glassmorphism treatment (`rgba(13,13,13,0.7)` + `backdrop-filter: blur`)

---

#### 4.3.5 Brand Story / Storytelling Banner

**Full-bleed section** — Afnan style cinematic layout  
**Left:** Lifestyle/product image  
**Right:** Editorial copy
```
[Eyebrow] THE ESSENCE OF AR-RAHMANI
[H2] "A Symphony of Oud and Tradition"
[Body] 3–4 lines of fragrance story prose
```

---

#### 4.3.6 "Goes Well With" / Complementary Products

**Header:** "Goes Well With"  
**Layout:** 2–3 product cards, horizontal  
Each card: same standard product card

---

#### 4.3.7 Frequently Asked Questions

**Layout:** Accordion list, full-width max `800px` centered  
**Default questions:**
1. What is the refund policy?
2. How long does it take until I get my order?
3. Do we ship internationally?
4. Will I receive a tracking link?
5. I have a complaint about my order — what do I do?

Each: Smooth expand/collapse with Framer Motion height animation

---

#### 4.3.8 Related Products

**Header:** "Related Products"  
**Layout:** 4-column product grid (same standard card)  
**Logic:** Same category, or manually curated in CMS

---

#### 4.3.9 Footer

Same as homepage footer (shared component).

---

## 5. Component Library

| Component | Description |
|---|---|
| `<AnnouncementBar />` | Marquee ticker, configurable messages |
| `<Navbar />` | Sticky, blur, responsive with mobile menu |
| `<HeroSection />` | Full-bleed, animated editorial hero |
| `<ProductCard />` | Standard card — image, name, price, add-to-cart |
| `<ProductGrid />` | Responsive grid with stagger animation |
| `<HorizontalScroller />` | Touch/drag scrollable product row with arrows |
| `<CategoryGrid />` | Image-based category navigation tiles |
| `<EditorialBanner />` | Full-bleed or split-column editorial CTA banner |
| `<NoteExplorer />` | 3-column fragrance note display with glassmorphism |
| `<AccordionItem />` | Animated expand/collapse item |
| `<FilterBar />` | Sticky pill filters + sort dropdown |
| `<ImageGallery />` | Thumbnail + main image viewer |
| `<VolumeSelector />` | Pill button group for variant selection |
| `<QuantitySelector />` | +/− quantity control |
| `<GiftBoxAddon />` | Opt-in add-on card with checkbox |
| `<CountdownTimer />` | Real-time HH:MM:SS delivery cutoff |
| `<TrustBar />` | Icon + text trust signals row |
| `<NewsletterSection />` | Email capture with gold CTA |
| `<SocialStrip />` | Instagram image grid |
| `<Footer />` | 4-column footer with social icons |

---

## 6. Data Model

### Product
```typescript
interface Product {
  id: string
  slug: string
  name: string
  tagline?: string
  description: string  // Rich text
  price: number
  compareAtPrice?: number
  currency: string     // 'INR'
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: string[]
  badges: ('bestseller' | 'new' | 'sale' | 'featured')[]
  inspiredBy?: string  // e.g. "Kilian", "Montale"
  orientation: 'men' | 'women' | 'unisex'
  fragranceFamily: string
  concentration: string
  notes: {
    opening: Note[]
    heart: Note[]
    dryDown: Note[]
  }
  relatedProducts: string[]  // Product IDs
  giftBoxAvailable: boolean
  giftBoxPrice?: number
  isFeaturedOfWeek: boolean
  seoTitle: string
  seoDescription: string
  createdAt: string
}

interface ProductVariant {
  id: string
  volume: string      // '100ml', '50ml', '12ml'
  price: number
  stock: number
  sku: string
}

interface Note {
  name: string
  icon?: string       // Emoji or SVG name
}
```

### Category
```typescript
interface Category {
  id: string
  slug: string
  name: string
  image: string
  description?: string
}
```

---

## 7. CMS Integration (Sanity)

Use Sanity.io as headless CMS for all editable content. The client must be able to edit without developer involvement.

### Editable via CMS:
- All products (full schema)
- Hero section image, headline, subheadline, CTA text
- Announcement bar messages
- Featured/Best Seller product selections
- Editorial banner images and copy
- Category tiles (images + names)
- Newsletter section copy
- FAQ questions and answers
- Footer links and social handles

### Sanity Schemas to create:
- `product`
- `category`
- `heroSection`
- `editorialBanner`
- `announcementBar`
- `siteSettings`
- `faqItem`

---

## 8. Technical Requirements

### 8.1 Next.js App Router Structure
```
src/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, providers)
│   ├── page.tsx                ← Homepage
│   ├── collections/
│   │   └── page.tsx            ← Shop listing
│   └── products/
│       └── [slug]/
│           └── page.tsx        ← Product detail
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedStrip.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── BestSellers.tsx
│   │   ├── EditorialBanner.tsx
│   │   ├── SocialStrip.tsx
│   │   └── NewsletterSection.tsx
│   ├── collections/
│   │   ├── FilterBar.tsx
│   │   └── ProductGrid.tsx
│   ├── product/
│   │   ├── ImageGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── NoteExplorer.tsx
│   │   ├── StoryBanner.tsx
│   │   └── FAQSection.tsx
│   └── ui/
│       ├── ProductCard.tsx
│       ├── Button.tsx
│       ├── AccordionItem.tsx
│       ├── CountdownTimer.tsx
│       └── TrustBar.tsx
├── lib/
│   ├── sanity.ts
│   ├── queries.ts
│   └── utils.ts
├── hooks/
│   ├── useCart.ts
│   └── useCountdown.ts
├── types/
│   └── index.ts
└── styles/
    └── globals.css
```

### 8.2 Performance
- Images: `next/image` with priority on hero, lazy elsewhere
- Fonts: `next/font` with `display: swap`
- ISR: `revalidate: 3600` on product and collection pages
- LCP target: < 2.5s
- CLS target: < 0.1

### 8.3 State Management
- Cart: Zustand store, persisted to localStorage
- Filters: URL search params (shareable, SEO-friendly)

### 8.4 Accessibility
- All interactive elements keyboard navigable
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` respected (disable animations)
- Colour contrast WCAG AA minimum on all text

### 8.5 SEO
- Dynamic `<title>` and `<meta description>` per page via Sanity
- `og:image` per product
- JSON-LD structured data for products (Product schema)
- Sitemap generated at build time

---

## 9. Animations Specification

| Section | Animation | Trigger | Duration |
|---|---|---|---|
| Hero headline | Word-by-word stagger up | Page load | 0.1s/word |
| Hero CTA | Fade up | 1.0s after load | 0.5s |
| Featured strip cards | Stagger fade-in | On scroll enter | 0.08s each |
| Category grid tiles | Scale up from 0.95 | On scroll enter | 0.5s stagger |
| Best seller cards | Fade up, stagger | On scroll enter | 0.08s each |
| Editorial banners | Parallax scroll on bg image | Scroll | Continuous |
| Note Explorer cards | Fade up, stagger | On scroll enter | 0.15s each |
| Product card hover | `scale(1.03)` + gold border | Hover | 0.3s |
| Filter bar | Slide down on scroll up, hide on scroll down | Scroll direction | 0.3s |
| Mobile menu | Full-screen overlay + stagger links | Toggle | 0.4s |
| Accordion | Height expand/collapse | Click | 0.35s |

---

## 10. Deployment

- **Platform:** Vercel
- **Domain:** Client's custom domain (e.g. `arrahmani.com`)
- **Environment Variables:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `NEXT_PUBLIC_SITE_URL`
- **Preview deployments:** Auto on every git push (Vercel default)
- **Analytics:** Vercel Analytics (free tier) + optional Google Analytics 4

---

## 11. Deliverable Checklist

### Design Phase
- [ ] Homepage mockup (Antigravity / Figma)
- [ ] Collection page mockup
- [ ] Product detail page mockup
- [ ] Mobile responsive mockups for all 3
- [ ] Design system tokens exported

### Development Phase
- [ ] Next.js project scaffolded with all dependencies
- [ ] Global layout (Navbar + Footer) implemented
- [ ] Sanity schema created and studio deployed
- [ ] Homepage all sections developed
- [ ] Collection page with filter/sort
- [ ] Product detail page all sections
- [ ] Cart drawer (slide-in from right)
- [ ] Responsive across all breakpoints
- [ ] Performance audit (Lighthouse > 85)
- [ ] CMS content populated with sample products
- [ ] Deployed to Vercel

### Handoff
- [ ] Sanity Studio access given to client
- [ ] Short video walkthrough of CMS editing
- [ ] README with local dev setup instructions

---

*Document prepared for AR-Rahmani Perfumes website project, May 2026.*
