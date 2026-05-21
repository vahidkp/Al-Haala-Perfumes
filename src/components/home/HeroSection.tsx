'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { heroImages } from '@/lib/images'

export default function HeroSection() {
  return (
    <section className="relative bg-forest text-cream overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImages.main}
          alt="AR-Rahmani signature fragrance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
      </div>

      {/* Subtle texture / grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, #E8DDC9 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative container-ar py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-body text-[10px] md:text-[11px] tracking-[0.55em] uppercase text-cream/70 mb-6"
        >
          New Launch
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          className="font-display font-light text-cream leading-[1.1] tracking-[0.18em]"
          style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}
        >
          AR-RAHMANI
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="my-6 md:my-8 w-24 h-px bg-cream/40 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-display italic text-cream/80 tracking-[0.32em]"
          style={{ fontSize: 'clamp(20px, 3vw, 42px)' }}
        >
          FRAGRANCES
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/collections"
            className="font-body text-[11px] font-medium tracking-widest uppercase bg-cream text-forest px-8 py-3 hover:bg-white transition-colors"
          >
            Shop Collection
          </Link>
          <Link
            href="#featured"
            className="font-body text-[11px] font-medium tracking-widest uppercase text-cream/80 hover:text-cream border border-cream/30 hover:border-cream px-8 py-3 transition-colors"
          >
            Explore the Story
          </Link>
        </motion.div>
      </div>

      {/* Decorative scallop / bottom edge */}
      <div className="h-2 bg-gradient-to-b from-transparent to-cream/0" />
    </section>
  )
}
