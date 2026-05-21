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
  eyebrow = 'The Essence of Femininity',
}: StoryBannerProps) {
  return (
    <section className="bg-cream py-16 lg:py-20 overflow-hidden">
      <div className="container-ar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden bg-white"
            style={{ aspectRatio: '4/3' }}
          >
            <Image
              src={imageUrl}
              alt={heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="space-y-5"
          >
            <p className="font-body text-[10px] font-medium tracking-[0.4em] uppercase text-forest/70">
              {eyebrow}
            </p>
            <h2
              className="font-display tracking-[0.04em] text-ink leading-[1.15]"
              style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}
            >
              {heading}
            </h2>
            <div className="w-12 h-px bg-forest/40" />
            <p className="font-body text-[14px] text-ink-soft leading-relaxed">
              {body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
