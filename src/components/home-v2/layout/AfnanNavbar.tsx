'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'New', href: '/collections?category=new' },
  { label: 'Fragrances', href: '/collections' },
  { label: 'Collections', href: '/collections' },
  { label: '9PM', href: '/collections' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export default function AfnanNavbar() {
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
          'sticky top-0 z-50 w-full bg-white text-ink border-b border-ink/10 transition-shadow',
          scrolled && 'shadow-[0_2px_18px_rgba(0,0,0,0.08)]'
        )}
      >
        {/* Row 1 — icons + wordmark */}
        <div className="container-ar h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-ink hover:text-[#e02323] transition"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
            <span className="hidden sm:flex items-center gap-1.5 font-body text-[11px] tracking-widest uppercase text-ink-mute">
              <Globe size={13} strokeWidth={1.5} /> UAE / AED
            </span>
          </div>

          <Link
            href="/home-v2"
            className="font-display text-lg sm:text-2xl md:text-3xl tracking-[0.18em] sm:tracking-[0.28em] uppercase text-ink whitespace-nowrap"
          >
            AR-Rahmani
          </Link>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-ink hover:text-[#e02323] transition">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Account"
              className="text-ink hover:text-[#e02323] transition hidden sm:flex"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              aria-label={`Cart — ${count} items`}
              onClick={openCart}
              className="text-ink hover:text-[#e02323] transition relative"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#e02323] text-white text-[9px] font-bold flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2 — primary nav */}
        <nav
          className="hidden lg:block container-ar border-t border-ink/5"
          aria-label="Main navigation"
        >
          <div className="h-11 flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-[11px] font-semibold tracking-widest uppercase text-ink hover:text-[#e02323] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
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
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center lg:hidden"
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
                    className="font-display text-3xl font-light italic text-ink hover:text-[#e02323] transition"
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
