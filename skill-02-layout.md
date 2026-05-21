---
name: ar-rahmani-layout
description: Build the global layout components for AR-Rahmani Perfumes — AnnouncementBar, Navbar (sticky, blur, mobile menu), and Footer (4-column with social icons). Use after skill-01-setup. Triggers: "build the navbar", "create the header", "build the footer", "create announcement bar", "build layout components", "global layout".
---

## Goal
Implement the three global layout components shared across all pages. These wrap every page via `src/app/layout.tsx`.

---

## Component 1 — AnnouncementBar (`src/components/layout/AnnouncementBar.tsx`)

Rotating marquee with gold background. Messages loop continuously via CSS animation — no JS timer needed.

```tsx
'use client'

const messages = [
  'Free delivery on orders above ₹999',
  'New Arrivals — Premium Oud Collection Now Live',
  'Authentically crafted Arabian fragrances',
  'Use code WELCOME for 5% off your first order',
]

export default function AnnouncementBar() {
  const doubled = [...messages, ...messages] // duplicate for seamless loop

  return (
    <div
      className="w-full overflow-hidden bg-gold text-obsidian"
      style={{ height: '40px' }}
      aria-label="Announcements"
    >
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="font-body text-xs font-medium tracking-widest uppercase px-12"
          >
            {msg}
            <span className="mx-6 text-obsidian/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

---

## Component 2 — Navbar (`src/components/layout/Navbar.tsx`)

Sticky header with blur glass effect. Desktop: wordmark left, nav center, icons right. Mobile: hamburger → full-screen overlay with staggered link reveal.

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Gifts', href: '/collections?category=gifts' },
  { label: 'Bakhoor', href: '/collections?category=bakhoor' },
  { label: 'Attar', href: '/collections?category=attar' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, openCart } = useCart()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-slate-dark'
            : 'bg-obsidian/80 backdrop-blur-sm'
        )}
        style={{ height: '72px' }}
      >
        <div className="container-ar h-full flex items-center justify-between gap-8">

          {/* Left — Wordmark */}
          <Link
            href="/"
            className="font-display text-xl font-medium tracking-[0.2em] text-white uppercase shrink-0"
          >
            AR-Rahmani
          </Link>

          {/* Center — Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium tracking-widest uppercase text-cream/80 hover:text-gold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right — Icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="text-cream/70 hover:text-gold transition-colors duration-200 hidden sm:flex"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Account"
              className="text-cream/70 hover:text-gold transition-colors duration-200 hidden sm:flex"
            >
              <User size={20} strokeWidth={1.5} />
            </button>

            <button
              aria-label={`Cart — ${count} items`}
              onClick={openCart}
              className="text-cream/70 hover:text-gold transition-colors duration-200 relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-obsidian text-[9px] font-bold flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden text-cream/70 hover:text-gold transition-colors duration-200 ml-1"
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/98 flex flex-col justify-center items-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-4xl font-light italic text-cream hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile bottom icons */}
            <div className="absolute bottom-12 flex items-center gap-8">
              <button aria-label="Search" className="text-cream/60 hover:text-gold transition-colors">
                <Search size={22} strokeWidth={1.5} />
              </button>
              <button aria-label="Account" className="text-cream/60 hover:text-gold transition-colors">
                <User size={22} strokeWidth={1.5} />
              </button>
              <button aria-label="Cart" onClick={() => { openCart(); setMobileOpen(false) }} className="text-cream/60 hover:text-gold transition-colors">
                <ShoppingBag size={22} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## Component 3 — Footer (`src/components/layout/Footer.tsx`)

4-column desktop, stacked mobile. Social icons, newsletter teaser, copyright bar with payment icons.

```tsx
import Link from 'next/link'
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'

const footerColumns = [
  {
    heading: 'Information',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Shipping & Return', href: '/shipping' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    heading: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Order', href: '/track' },
      { label: 'Wholesale Inquiry', href: '/wholesale' },
      { label: 'Store Locator', href: '/stores' },
      { label: 'Gift Packaging', href: '/gifts' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'Oud Perfumes', href: '/collections?category=oud' },
      { label: 'Attar / Perfume Oil', href: '/collections?category=attar' },
      { label: 'Bakhoor', href: '/collections?category=bakhoor' },
      { label: 'Gift Sets', href: '/collections?category=gifts' },
      { label: 'New Arrivals', href: '/collections?category=new' },
    ],
  },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'WhatsApp', href: 'https://wa.me/', icon: MessageCircle },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-slate-dark">

      {/* ── Main Footer Grid ── */}
      <div className="container-ar py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <span className="font-display text-2xl font-medium tracking-[0.2em] text-white uppercase">
                AR-Rahmani
              </span>
              <p className="font-body text-xs tracking-widest uppercase text-gold mt-1">
                Perfumes
              </p>
            </Link>

            <p className="font-body text-sm text-cream/60 leading-relaxed max-w-[240px]">
              Authentic Arabian fragrances — Ouds, Attars, Bakhoor, and Perfume Oils crafted for the discerning soul.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-slate-dark flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2–4 — Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow mb-6">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Newsletter Strip ── */}
      <div className="border-t border-slate-dark">
        <div className="container-ar py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="eyebrow">Newsletter</span>
              <p className="font-display text-xl font-light text-white">
                Join the inner circle
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full sm:w-auto gap-0"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 sm:w-72 bg-obsidian border border-slate-dark border-r-0 px-4 py-3 font-body text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-obsidian font-body text-sm font-medium tracking-widest uppercase hover:bg-gold-light transition-colors duration-200 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-dark">
        <div className="container-ar py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} AR-Rahmani Perfumes. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-muted">Secure payments</span>
            {/* Payment icon placeholders — replace with actual SVGs */}
            <div className="flex gap-2">
              {['VISA', 'MC', 'UPI', 'GPAY'].map((p) => (
                <span
                  key={p}
                  className="font-body text-[9px] font-bold text-muted/60 border border-slate-dark px-1.5 py-0.5 rounded-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Step — Wire into Root Layout (`src/app/layout.tsx`)

Update layout to include all three:

```tsx
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Inside <body>:
<AnnouncementBar />
<Navbar />
<main>{children}</main>
<Footer />
```

---

## Verification Checklist
- [ ] Announcement bar auto-scrolls with no JS errors
- [ ] Navbar is sticky and blurs on scroll
- [ ] Gold underline appears on nav hover
- [ ] Cart badge appears when items added
- [ ] Mobile hamburger opens full-screen overlay
- [ ] Mobile menu links close the overlay on click
- [ ] Footer renders in 4 columns on desktop, stacks on mobile
- [ ] Social icon hover shows gold ring
- [ ] Newsletter form input focuses with gold border
