'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flower2, Gift, Crown, Sparkles, Droplet, Flame } from 'lucide-react'

const pills = [
  {
    label: 'Summer Fragrances',
    href: '/collections?category=new',
    Icon: Flower2,
  },
  { label: 'Gift Sets', href: '/collections?category=gifts', Icon: Gift },
  { label: 'Best Sellers', href: '/collections', Icon: Crown },
  { label: 'Perfumes', href: '/collections?category=oud', Icon: Sparkles },
  { label: 'Perfume Oils', href: '/collections?category=attar', Icon: Droplet },
  { label: 'Bakhoor', href: '/collections?category=bakhoor', Icon: Flame },
]

export default function CategoryPillRow() {
  return (
    <section className="bg-cream py-12 lg:py-16">
      <div className="container-ar">
        <p className="text-center font-body text-[10px] font-medium tracking-[0.4em] uppercase text-forest/70 mb-8">
          Our True Masterclass into Handpicked Specialities
        </p>

        <div className="flex items-start justify-center gap-4 md:gap-10 overflow-x-auto scrollbar-hide pb-2">
          {pills.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="shrink-0"
            >
              <Link
                href={p.href}
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-cream-warm border border-forest/15 flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-colors duration-300">
                  <p.Icon
                    size={20}
                    strokeWidth={1.3}
                    className="text-forest group-hover:text-cream transition-colors duration-300 md:w-[26px] md:h-[26px]"
                  />
                </div>
                <span className="font-body text-[10px] md:text-[11px] font-medium tracking-widest uppercase text-ink-soft group-hover:text-forest text-center max-w-[100px] leading-snug transition-colors">
                  {p.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
