'use client'

import { motion } from 'framer-motion'

interface CollectionHeroProps {
  title: string
  count: number
}

function humanize(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function CollectionHero({ title, count }: CollectionHeroProps) {
  return (
    <section className="relative bg-forest text-cream overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #E8DDC9 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative container-ar py-16 lg:py-24 text-center">
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2 font-body text-[11px] text-cream/60 tracking-wider">
            <li>
              <a href="/" className="hover:text-cream transition-colors">
                Home
              </a>
            </li>
            <li className="text-cream/30">›</li>
            <li className="text-cream/90">{humanize(title)}</li>
          </ol>
        </nav>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-display tracking-[0.18em] uppercase text-cream"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
        >
          {humanize(title)}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto my-5 w-16 h-px bg-cream/40 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-body text-[12px] text-cream/70 tracking-widest uppercase"
        >
          {count} {count === 1 ? 'product' : 'products'}
        </motion.p>
      </div>
    </section>
  )
}
