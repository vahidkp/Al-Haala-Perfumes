'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Gift, CheckCircle, MapPin } from 'lucide-react'
import CountdownTimer from '@/components/ui/CountdownTimer'
import AccordionItem from '@/components/ui/AccordionItem'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

interface ProductInfoProps {
  product: Product
}

const productAccordions = [
  {
    question: 'Disclaimer',
    answer:
      'All fragrances are inspired interpretations. AR-Rahmani Perfumes is not affiliated with the original brand. Fragrance compositions may vary slightly between batches due to natural ingredients.',
  },
  {
    question: 'Shipping & Returns',
    answer:
      'Orders dispatch within 1–2 business days. Domestic delivery 3–5 days. We accept returns within 7 days of delivery if the product is unused and sealed.',
  },
  {
    question: 'How to Use',
    answer:
      'Apply to pulse points — wrists, neck, behind ears, and inner elbows. Spray from 15–20cm away. Do not rub wrists together.',
  },
]

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ''
  )
  const [quantity, setQuantity] = useState(1)
  const [giftBox, setGiftBox] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )
  const price = selectedVariant?.price ?? product.price
  const comparePrice = product.compareAtPrice

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      giftBox,
      name: product.name,
      image: product.images[0]?.url ?? '',
      price:
        price + (giftBox && product.giftBoxPrice ? product.giftBoxPrice : 0),
      volume: selectedVariant.volume,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const deliveryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-AE', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    })

  return (
    <div className="flex flex-col gap-6">
      {/* Badges row */}
      <div className="flex flex-wrap gap-2">
        {product.isFeaturedOfWeek && (
          <span className="font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 bg-cream-warm text-forest border border-forest/20">
            Fragrance of the Week
          </span>
        )}
        {product.inspiredBy && (
          <span className="font-body text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 bg-ink text-cream">
            Inspired by {product.inspiredBy}
          </span>
        )}
      </div>

      {/* Name & Price */}
      <div>
        <h1 className="font-display tracking-[0.16em] uppercase text-ink leading-tight"
          style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
        >
          {product.name}
        </h1>
        <div className="flex items-baseline gap-3 mt-3">
          <span className="font-body text-2xl font-medium text-sale">
            {formatPrice(price, product.currency)}
          </span>
          {comparePrice && (
            <span className="font-body text-base text-ink-mute line-through">
              {formatPrice(comparePrice, product.currency)}
            </span>
          )}
        </div>
        <p className="font-body text-xs text-ink-mute mt-1">Tax excluded.</p>
      </div>

      <div className="h-px bg-forest/10" />

      {/* Attribute chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'Orientation', value: product.orientation, active: false },
          { key: 'Fragrance Family', value: product.fragranceFamily, active: true },
          { key: 'Concentration', value: product.concentration, active: false },
        ].map(({ key, value, active }) => (
          <div
            key={key}
            className={cn(
              'flex items-center gap-1.5 font-body text-[11px] px-3 py-2 border',
              active
                ? 'bg-ink text-cream border-ink'
                : 'bg-cream-paper text-ink-soft border-forest/15'
            )}
          >
            <span className="font-semibold">{key}:</span>
            <span className="capitalize">{value}</span>
          </div>
        ))}
      </div>

      {/* Volume */}
      <div>
        <p className="font-body text-[12px] text-ink-soft mb-3">
          Choose Volume:
        </p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              className={cn(
                'font-body text-sm px-5 py-2.5 border transition-all duration-200',
                selectedVariantId === variant.id
                  ? 'bg-white text-ink border-forest'
                  : 'bg-cream-paper text-ink border-forest/20 hover:border-forest/50'
              )}
            >
              {variant.volume}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-0 border border-forest/20 w-fit bg-white">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="w-11 h-11 flex items-center justify-center text-ink hover:bg-cream-paper transition-colors"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="w-12 h-11 flex items-center justify-center font-body text-sm font-medium text-ink">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
          className="w-11 h-11 flex items-center justify-center text-ink hover:bg-cream-paper transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Gift Box */}
      {product.giftBoxAvailable && product.giftBoxPrice && (
        <label className="flex items-center gap-4 p-4 border border-forest/20 bg-cream-paper hover:border-forest/50 cursor-pointer transition-colors group">
          <div className="w-12 h-12 bg-white border border-forest/15 flex items-center justify-center shrink-0">
            <Gift size={18} strokeWidth={1.5} className="text-forest" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[12px] font-semibold tracking-widest uppercase text-ink">
              Gift Box
            </p>
            <p className="font-body text-xs text-ink-mute mt-0.5">
              Luxury presentation box with signature finishing touches.
            </p>
            <p className="font-body text-sm text-ink font-medium mt-1">
              +{formatPrice(product.giftBoxPrice, product.currency)}
            </p>
          </div>
          <input
            type="checkbox"
            checked={giftBox}
            onChange={(e) => setGiftBox(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              'w-5 h-5 border flex items-center justify-center shrink-0 transition-all',
              giftBox
                ? 'bg-forest border-forest'
                : 'border-forest/30 group-hover:border-forest/60 bg-white'
            )}
          >
            {giftBox && (
              <span className="text-cream text-xs font-bold leading-none">
                ✓
              </span>
            )}
          </div>
        </label>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleAddToCart}
          className="w-full font-body text-[11px] font-medium tracking-widest uppercase border border-forest text-forest hover:bg-forest hover:text-cream py-4 transition-all"
        >
          {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
        <button className="w-full font-body text-[11px] font-medium tracking-widest uppercase bg-ink text-cream hover:bg-forest py-4 transition-all">
          Buy It Now
        </button>
      </div>

      {/* Frequently Bought Together */}
      <div className="border-t border-forest/10 pt-6">
        <p className="font-body text-[12px] text-ink-soft mb-3">
          Frequently bought together:
        </p>
        <div className="flex items-center gap-3 p-3 border border-forest/15 bg-cream-paper">
          <div className="relative w-14 h-14 bg-cream-warm shrink-0 overflow-hidden">
            {product.images[0]?.url && (
              <Image
                src={product.images[0].url}
                alt={product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[12px] font-medium text-ink line-clamp-2">
              {product.name} — Perfume Oil 12ml
            </p>
            <p className="font-body text-[12px] text-sale font-medium mt-1">
              {formatPrice(Math.round(price * 0.4), product.currency)}
            </p>
          </div>
          <button className="w-9 h-9 flex items-center justify-center bg-ink text-cream hover:bg-forest transition-colors">
            <Plus size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="border border-forest/15 bg-white p-4 space-y-3">
        <p className="font-body text-[11px] font-semibold tracking-widest uppercase text-ink">
          Delivery Information
        </p>
        <p className="font-body text-sm text-ink">
          Get it{' '}
          <strong className="text-forest">
            next working day, {deliveryDate}
          </strong>{' '}
          within the UAE
        </p>
        <CountdownTimer targetHour={20} />
        <p className="font-body text-[11px] text-ink-mute">
          Order now for tomorrow after the next cutoff.
        </p>
        <div className="pt-3 border-t border-forest/10 flex items-start gap-2">
          <CheckCircle size={14} className="text-forest mt-0.5 shrink-0" />
          <div>
            <p className="font-body text-[12px] text-forest font-medium">
              Pickup available at Online Store
            </p>
            <p className="font-body text-[11px] text-ink-mute mt-0.5">
              Usually ready in 24 hours
            </p>
            <button className="font-body text-[11px] text-forest underline mt-1.5 hover:text-forest-deep">
              View store information
            </button>
          </div>
        </div>
      </div>

      {/* New customer banner — green */}
      <div className="bg-forest text-cream text-center px-4 py-5">
        <p className="font-body text-[11px] font-semibold tracking-widest uppercase mb-1">
          New Customer?
        </p>
        <p className="font-body text-[12px] text-cream/80">
          5% off your first purchase! Use the code{' '}
          <span className="font-mono font-bold text-cream">welcome</span> at
          checkout
        </p>
      </div>

      {/* Description */}
      <div className="pt-2">
        <p className="font-body text-sm text-ink-soft leading-relaxed">
          <strong className="text-ink">{product.name}</strong>{' '}
          {product.description}
        </p>
      </div>

      {/* Accordions */}
      <div className="border-t border-forest/15">
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
