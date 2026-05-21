---
name: ar-rahmani-product-page
description: Build the Product Detail Page for AR-Rahmani Perfumes — image gallery, product info panel (volume selector, quantity, gift box add-on, delivery timer, trust icons), NoteExplorer (fragrance notes), storytelling banner, FAQ accordion, and related products. Use after skill-03-ui-components. Triggers: "build product page", "create product detail page", "build product gallery", "fragrance note explorer", "product info panel", "volume selector", "gift box addon", "build PDP", "product detail".
---

## Goal
Build the full Product Detail Page (PDP) at `src/app/products/[slug]/page.tsx`. This is the richest page, combining a structured purchase interface above the fold with cinematic editorial storytelling below.

---

## Page File (`src/app/products/[slug]/page.tsx`)

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts } from '@/lib/queries'
import ProductHero from '@/components/product/ProductHero'
import NoteExplorer from '@/components/product/NoteExplorer'
import StoryBanner from '@/components/product/StoryBanner'
import FAQSection from '@/components/product/FAQSection'
import RelatedProducts from '@/components/product/RelatedProducts'
import TrustBar from '@/components/ui/TrustBar'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.tagline,
    openGraph: {
      images: [{ url: product.images[0]?.url }],
    },
  }
}

export const revalidate = 3600

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.id, product.category.slug)

  return (
    <>
      {/* Above the fold: gallery + info */}
      <ProductHero product={product} />

      {/* Fragrance note explorer */}
      <NoteExplorer notes={product.notes} />

      {/* Brand storytelling banner */}
      <StoryBanner
        heading="A Symphony of Oud and Tradition"
        body="Every AR-Rahmani fragrance is a journey — through ancient souks, cedar forests, and sun-warmed amber. We source only the finest raw materials to craft scents that are timeless, personal, and unforgettable."
        imageUrl="/images/story-banner.jpg"
      />

      {/* Trust signals */}
      <TrustBar />

      {/* Related products */}
      <RelatedProducts products={related} />

      {/* FAQ */}
      <FAQSection />
    </>
  )
}
```

---

## Component — ProductHero (`src/components/product/ProductHero.tsx`)

The main above-the-fold 50/50 split: gallery left, purchase info right.

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageGallery from './ImageGallery'
import ProductInfo from './ProductInfo'
import type { Product } from '@/types'

interface ProductHeroProps {
  product: Product
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="bg-obsidian pt-8 pb-16 lg:pt-12 lg:pb-20">
      <div className="container-ar">

        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-xs text-muted tracking-wider">
            <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
            <li className="text-slate-dark">›</li>
            <li>
              <a href="/collections" className="hover:text-gold transition-colors">
                Collections
              </a>
            </li>
            <li className="text-slate-dark">›</li>
            <li className="text-cream/60 truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        {/* 50/50 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <ProductInfo product={product} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## Component — ImageGallery (`src/components/product/ImageGallery.tsx`)

Main image + thumbnail strip with zoom on hover.

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const active = images[activeIdx]

  return (
    <div className="flex flex-col gap-4">

      {/* Main Image */}
      <div
        className={cn(
          'relative overflow-hidden bg-charcoal cursor-zoom-in',
          zoomed && 'cursor-zoom-out'
        )}
        style={{ aspectRatio: '1/1' }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        {active && (
          <Image
            src={active.url}
            alt={active.alt || productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              'object-cover transition-transform duration-500',
              zoomed ? 'scale-110' : 'scale-100'
            )}
          />
        )}

        {/* Gold corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/30 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/30 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30 pointer-events-none" />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative shrink-0 overflow-hidden bg-charcoal transition-all duration-200',
                'w-16 h-16 lg:w-20 lg:h-20',
                activeIdx === i
                  ? 'border border-gold'
                  : 'border border-slate-dark hover:border-gold/40 opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} view ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Component — ProductInfo (`src/components/product/ProductInfo.tsx`)

The full right-column purchase panel.

```tsx
'use client'

import { useState } from 'react'
import { Minus, Plus, Gift, Package } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import CountdownTimer from '@/components/ui/CountdownTimer'
import AccordionItem from '@/components/ui/AccordionItem'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductInfoProps {
  product: Product
}

const attributeIcons: Record<string, string> = {
  orientation: '⊕',
  fragranceFamily: '◈',
  concentration: '◉',
}

const productAccordions = [
  { question: 'Disclaimer', answer: 'All fragrances are inspired interpretations. AR-Rahmani Perfumes is not affiliated with the original brand. Fragrance compositions may vary slightly between batches due to natural ingredients.' },
  { question: 'Fragrance Care & Storage', answer: 'Store in a cool, dry place away from direct sunlight and heat. Keep the bottle upright with the cap tightly closed. Avoid storing in bathrooms due to humidity.' },
  { question: 'How to Use', answer: 'Apply to pulse points — wrists, neck, behind ears, and inner elbows. Spray from 15–20cm away. Layer with matching attar oil for longer-lasting sillage. Do not rub wrists together.' },
]

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [giftBox, setGiftBox] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)
  const price = selectedVariant?.price ?? product.price
  const comparePrice = selectedVariant?.price
    ? product.compareAtPrice
    : undefined

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      giftBox,
      name: product.name,
      image: product.images[0]?.url ?? '',
      price: price + (giftBox && product.giftBoxPrice ? product.giftBoxPrice : 0),
      volume: selectedVariant.volume,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isFeaturedOfWeek && (
          <span className="font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-gold text-obsidian">
            Fragrance of the Week
          </span>
        )}
        {product.inspiredBy && (
          <span className="font-body text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-gold/50 text-gold">
            Inspired by {product.inspiredBy}
          </span>
        )}
      </div>

      {/* Name & Price */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-3">
          <span className="font-body text-2xl font-medium text-cream">
            {formatPrice(price, product.currency)}
          </span>
          {comparePrice && (
            <span className="font-body text-base text-muted line-through">
              {formatPrice(comparePrice, product.currency)}
            </span>
          )}
        </div>
        <p className="font-body text-xs text-muted mt-1">Tax excluded.</p>
      </div>

      {/* Attribute pills row */}
      <div className="flex flex-wrap gap-3">
        {[
          { key: 'Orientation', value: product.orientation },
          { key: 'Fragrance Family', value: product.fragranceFamily },
          { key: 'Concentration', value: product.concentration },
        ].map(({ key, value }) => (
          <div
            key={key}
            className="flex items-center gap-1.5 font-body text-xs text-cream/60 border border-slate-dark px-3 py-1.5"
          >
            <span className="text-gold text-[10px]">◈</span>
            <span className="text-muted">{key}:</span>
            <span className="text-cream capitalize">{value}</span>
          </div>
        ))}
      </div>

      {/* Volume Selector */}
      <div>
        <p className="font-body text-xs font-medium tracking-widest uppercase text-muted mb-3">
          Choose Volume
        </p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={cn(
                'font-body text-sm px-5 py-2.5 border transition-all duration-200',
                selectedVariantId === variant.id
                  ? 'bg-gold text-obsidian border-gold'
                  : 'bg-transparent text-cream border-slate-dark hover:border-gold/50'
              )}
            >
              {variant.volume}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="font-body text-xs font-medium tracking-widest uppercase text-muted mb-3">
          Quantity
        </p>
        <div className="flex items-center gap-0 border border-slate-dark w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-11 h-11 flex items-center justify-center text-cream/60 hover:text-gold hover:bg-charcoal transition-colors"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="w-12 h-11 flex items-center justify-center font-body text-sm font-medium text-cream border-x border-slate-dark">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-11 h-11 flex items-center justify-center text-cream/60 hover:text-gold hover:bg-charcoal transition-colors"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Gift Box Add-on */}
      {product.giftBoxAvailable && product.giftBoxPrice && (
        <label className="flex items-center gap-4 p-4 border border-slate-dark hover:border-gold/40 cursor-pointer transition-colors group">
          <div className="w-12 h-12 bg-charcoal border border-slate-dark flex items-center justify-center shrink-0">
            <Gift size={18} strokeWidth={1.5} className="text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm font-medium text-white">Gift Box</p>
            <p className="font-body text-xs text-muted">
              Luxury presentation box with signature finishing touches.
            </p>
            <p className="font-body text-sm text-cream mt-1">
              +{formatPrice(product.giftBoxPrice, product.currency)}
            </p>
          </div>
          <input
            type="checkbox"
            checked={giftBox}
            onChange={(e) => setGiftBox(e.target.checked)}
            className="sr-only"
          />
          <div className={cn(
            'w-5 h-5 border flex items-center justify-center shrink-0 transition-all',
            giftBox ? 'bg-gold border-gold' : 'border-slate-dark group-hover:border-gold/50'
          )}>
            {giftBox && <span className="text-obsidian text-xs font-bold">✓</span>}
          </div>
        </label>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
        >
          {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
        </Button>
        <Button variant="primary" size="lg" fullWidth>
          Buy It Now
        </Button>
      </div>

      {/* Delivery Information */}
      <div className="border border-slate-dark p-4 space-y-3">
        <p className="font-body text-xs font-medium tracking-widest uppercase text-muted">
          Delivery Information
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-body text-sm text-cream">
            Get it by{' '}
            <strong className="text-gold">
              {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                weekday: 'long', day: 'numeric', month: 'short'
              })}
            </strong>
          </p>
          <CountdownTimer targetHour={20} />
        </div>
      </div>

      {/* New customer banner */}
      <div className="bg-charcoal border border-gold/20 px-4 py-3 text-center">
        <p className="font-body text-xs text-cream/60">
          <span className="text-gold font-medium">New customer?</span>{' '}
          Use code <span className="text-gold font-mono font-bold">WELCOME</span> for 5% off your first order.
        </p>
      </div>

      {/* Product Description */}
      <div className="pt-2 border-t border-slate-dark">
        <p className="font-body text-sm text-cream/70 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="border-t border-slate-dark">
        {productAccordions.map((item) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Component — NoteExplorer (`src/components/product/NoteExplorer.tsx`)

Full-width cinematic fragrance note display with glassmorphism cards on atmospheric background.

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Note {
  name: string
  icon?: string
}

interface NoteExplorerProps {
  notes: {
    opening: Note[]
    heart: Note[]
    dryDown: Note[]
  }
  backgroundImage?: string
}

const noteColumns = [
  { label: 'Opening Notes', key: 'opening' as const, image: '/images/notes-top.jpg' },
  { label: 'Heart Notes', key: 'heart' as const, image: '/images/notes-heart.jpg' },
  { label: 'Dry-Down Notes', key: 'dryDown' as const, image: '/images/notes-base.jpg' },
]

const defaultIcons: Record<string, string> = {
  // common note → emoji mapping
  'lemon': '🍋', 'bergamot': '🍊', 'rose': '🌹', 'oud': '🌲',
  'musk': '◈', 'vanilla': '⟡', 'amber': '◉', 'vetiver': '🌿',
  'sandalwood': '🪵', 'jasmine': '🌸', 'pepper': '⚡', 'lavender': '💜',
}

function getNoteIcon(name: string, icon?: string): string {
  if (icon) return icon
  const lower = name.toLowerCase()
  for (const [key, val] of Object.entries(defaultIcons)) {
    if (lower.includes(key)) return val
  }
  return '✦'
}

export default function NoteExplorer({ notes, backgroundImage = '/images/notes-bg.jpg' }: NoteExplorerProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Fragrance notes background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>

      <div className="relative z-10 container-ar">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="eyebrow">Fragrance Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Discover The Notes
          </h2>
          <p className="font-body text-sm text-cream/50 mt-3">
            Explore the fragrance journey from top to base
          </p>
        </motion.div>

        {/* 3-Column Note Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {noteColumns.map(({ label, key, image }, i) => {
            const noteList = notes[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="glass-dark rounded-sm overflow-hidden"
              >
                {/* Card image top */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                </div>

                {/* Note list */}
                <div className="p-6">
                  <h3 className="font-body text-xs font-bold tracking-widest uppercase text-gold mb-5">
                    {label}
                  </h3>
                  <ul className="space-y-3">
                    {noteList.map((note) => (
                      <li key={note.name} className="flex items-center gap-3">
                        <span className="text-gold text-sm w-5 text-center">
                          {getNoteIcon(note.name, note.icon)}
                        </span>
                        <span className="font-body text-sm text-cream/80">
                          {note.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

## Component — StoryBanner (`src/components/product/StoryBanner.tsx`)

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface StoryBannerProps {
  heading: string
  body: string
  imageUrl: string
  eyebrow?: string
}

export default function StoryBanner({
  heading,
  body,
  imageUrl,
  eyebrow = 'The Essence of AR-Rahmani',
}: StoryBannerProps) {
  return (
    <section className="section-y bg-charcoal overflow-hidden">
      <div className="container-ar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
          >
            <Image
              src={imageUrl}
              alt={heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Gold frame accent */}
            <div className="absolute inset-4 border border-gold/20 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div>
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="font-display text-4xl md:text-5xl font-light italic text-white leading-[1.1]">
                {heading}
              </h2>
            </div>
            <div className="w-12 h-[1px] bg-gold" />
            <p className="font-body text-base text-cream/60 leading-relaxed">
              {body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## Component — FAQSection (`src/components/product/FAQSection.tsx`)

```tsx
import AccordionItem from '@/components/ui/AccordionItem'
import SectionHeader from '@/components/ui/SectionHeader'

const faqs = [
  {
    question: 'What is the refund policy?',
    answer: 'We accept returns within 7 days of delivery if the product is unused, sealed, and in its original packaging. Contact us at info@arrahmani.com to initiate a return.',
  },
  {
    question: 'How long does it take until I get my order?',
    answer: 'Orders are dispatched within 1–2 business days. Delivery takes 3–5 business days within India. Express delivery options are available at checkout.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide. International delivery takes 7–14 business days. Customs and import duties are the responsibility of the recipient.',
  },
  {
    question: 'Will I receive a tracking link?',
    answer: 'Yes. Once your order is dispatched, you will receive an email and WhatsApp message with your tracking link and courier details.',
  },
  {
    question: 'I have a complaint about my order — what do I do?',
    answer: 'We are sorry to hear that. Please reach out to us within 48 hours of delivery via WhatsApp or email with your order number and photos of the issue. We will resolve it promptly.',
  },
]

export default function FAQSection() {
  return (
    <section className="section-y bg-obsidian">
      <div className="container-ar">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Support"
            heading="Frequently Asked Questions"
            align="center"
            className="mb-12"
          />
          <div>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Component — RelatedProducts (`src/components/product/RelatedProducts.tsx`)

```tsx
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null

  return (
    <section className="section-y bg-charcoal">
      <div className="container-ar">
        <SectionHeader
          heading="Related Products"
          className="mb-12"
          align="center"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              showInspiredBy
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Verification Checklist
- [ ] Image gallery switches on thumbnail click
- [ ] Main image zooms on hover
- [ ] Volume selector pill highlights selected variant
- [ ] Quantity +/- controls update correctly (min 1)
- [ ] Gift box checkbox toggles correctly with visual feedback
- [ ] "Add to Cart" triggers cart open and shows "✓ Added" for 2.5s
- [ ] Countdown timer counts down in real time
- [ ] Delivery date is 2 days from today dynamically
- [ ] Note explorer shows 3 columns with glassmorphism cards
- [ ] Note icons map correctly from note name
- [ ] Story banner image has gold inner frame accent
- [ ] FAQ accordion opens/closes smoothly
- [ ] Related products grid shows max 4 products
- [ ] Page `<title>` uses product name from metadata
- [ ] `og:image` uses product primary image
