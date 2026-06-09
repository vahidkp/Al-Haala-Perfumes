'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Collections', href: '/collections' },
  { label: 'Brand Inspirations', href: '/collections' },
  { label: 'Gifts', href: '/collections?category=gifts' },
  { label: 'Bakhoor', href: '/collections?category=bakhoor' },
  { label: 'Attar', href: '/collections?category=attar' },
  { label: 'New In', href: '/collections?category=new' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useCart((s) => s.itemCount)
  const openCart = useCart((s) => s.openCart)
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-shadow duration-300 bg-forest text-cream',
          scrolled && 'shadow-[0_2px_24px_rgba(0,0,0,0.25)]'
        )}
      >
        {/* Row 1 — wordmark + currency / icons */}
        <div className="border-b border-forest-line">
          <div className="container-ar h-14 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <button
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden text-cream/80 hover:text-white transition"
              >
                {mobileOpen ? (
                  <X size={20} strokeWidth={1.5} />
                ) : (
                  <Menu size={20} strokeWidth={1.5} />
                )}
              </button>
              <span className="hidden sm:flex items-center gap-1.5 font-body text-[11px] tracking-widest uppercase text-cream/70">
                <Globe size={13} strokeWidth={1.5} /> AED
              </span>
            </div>

            <Link
              href="/"
              className="font-display text-lg sm:text-2xl md:text-3xl tracking-[0.18em] sm:tracking-[0.32em] uppercase text-cream whitespace-nowrap"
            >
              AL-HAALA
            </Link>

            <div className="flex items-center gap-5">
              <span className="hidden md:inline font-body text-[11px] tracking-widest uppercase text-cream/70">
                Free UAE Delivery
              </span>
              <button
                aria-label="Search"
                className="text-cream/80 hover:text-white transition"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                aria-label="Account"
                className="text-cream/80 hover:text-white transition hidden sm:flex"
              >
                <User size={18} strokeWidth={1.5} />
              </button>
              <button
                aria-label={`Cart — ${count} items`}
                onClick={openCart}
                className="text-cream/80 hover:text-white transition relative"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-cream text-forest text-[9px] font-bold flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 — primary nav */}
        <nav
          className="hidden lg:block container-ar"
          aria-label="Main navigation"
        >
          <div className="min-h-11 flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-[11px] font-medium tracking-widest uppercase text-cream/85 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/collections"
              className="ml-2 my-2 font-body text-[11px] font-medium tracking-widest uppercase text-forest bg-cream hover:bg-white transition-colors duration-200 px-5 py-2 rounded-full"
            >
              Make a Bundle
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest flex flex-col justify-center items-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href + i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-light italic text-cream hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
