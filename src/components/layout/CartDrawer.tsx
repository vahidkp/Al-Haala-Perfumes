'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const items = useCart((s) => s.items)
  const isOpen = useCart((s) => s.isOpen)
  const closeCart = useCart((s) => s.closeCart)
  const removeItem = useCart((s) => s.removeItem)
  const updateQuantity = useCart((s) => s.updateQuantity)
  const total = useCart((s) => s.total)
  const itemCount = useCart((s) => s.itemCount)

  const count = itemCount()
  const cartTotal = total()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-forest-deep/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream-paper text-ink flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-forest/15 bg-cream">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-forest" />
                <h2 className="font-display tracking-[0.16em] uppercase text-ink text-lg">
                  Your Cart
                </h2>
                {count > 0 && (
                  <span className="font-body text-xs text-ink-mute">
                    ({count} {count === 1 ? 'item' : 'items'})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-ink hover:text-forest transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-center py-16">
                  <ShoppingBag size={48} strokeWidth={0.8} className="text-forest/30" />
                  <div>
                    <p className="font-display text-2xl tracking-[0.16em] uppercase text-ink">
                      Your cart is empty
                    </p>
                    <p className="font-body text-sm text-ink-mute mt-2">
                      Discover our collection of premium fragrances.
                    </p>
                  </div>
                  <Link
                    href="/collections"
                    onClick={closeCart}
                    className="font-body text-[11px] font-medium tracking-widest uppercase border border-forest text-forest hover:bg-forest hover:text-cream px-6 py-3 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 py-4 border-b border-forest/10 last:border-0"
                  >
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-white">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[14px] tracking-[0.12em] uppercase text-ink line-clamp-2">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-ink-mute mt-1">
                        {item.volume}
                        {item.giftBox && ' · Gift Box'}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-0 border border-forest/20 bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease"
                            className="w-7 h-7 flex items-center justify-center text-ink hover:bg-cream transition-colors"
                          >
                            <Minus size={10} strokeWidth={2} />
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center font-body text-xs text-ink border-x border-forest/20">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase"
                            className="w-7 h-7 flex items-center justify-center text-ink hover:bg-cream transition-colors"
                          >
                            <Plus size={10} strokeWidth={2} />
                          </button>
                        </div>

                        <p className="font-body text-sm font-medium text-ink">
                          {formatPrice(item.price * item.quantity, 'AED')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(item.productId, item.variantId)
                      }
                      aria-label={`Remove ${item.name}`}
                      className="text-ink-mute hover:text-forest transition-colors self-start mt-1"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-forest/15 px-6 py-6 space-y-4 bg-cream">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-ink-mute uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="font-body text-lg font-medium text-ink">
                    {formatPrice(cartTotal, 'AED')}
                  </span>
                </div>

                {cartTotal < 200 && (
                  <div>
                    <p className="font-body text-xs text-ink-mute mb-2">
                      Add {formatPrice(200 - cartTotal, 'AED')} more for free
                      delivery
                    </p>
                    <div className="h-1 bg-cream-warm rounded-full overflow-hidden">
                      <div
                        className="h-full bg-forest transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (cartTotal / 200) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <p className="font-body text-xs text-ink-mute">
                  Taxes and shipping calculated at checkout.
                </p>

                <button className="w-full font-body text-[11px] font-medium tracking-widest uppercase bg-ink text-cream hover:bg-forest py-4 transition-colors">
                  Proceed to Checkout
                </button>

                <button
                  onClick={closeCart}
                  className="w-full font-body text-[11px] text-ink-mute hover:text-forest transition-colors text-center tracking-widest uppercase"
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
