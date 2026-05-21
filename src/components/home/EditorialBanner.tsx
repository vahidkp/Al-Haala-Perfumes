'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface EditorialBannerProps {
  eyebrow?: string
  heading: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  imageUrl: string
  imageAlt: string
  textAlign?: 'left' | 'right' | 'center'
  height?: string
  tone?: 'dark' | 'light'
  /** CSS object-position value for the background image (e.g. "center 20%"). */
  objectPosition?: string
}

export default function EditorialBanner({
  eyebrow,
  heading,
  body,
  ctaLabel = 'Explore',
  ctaHref = '/collections',
  imageUrl,
  imageAlt,
  textAlign = 'center',
  height = '70vh',
  tone = 'dark',
  objectPosition = 'center',
}: EditorialBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const alignClass = {
    left: 'items-start text-left',
    right: 'items-end text-right',
    center: 'items-center text-center',
  }[textAlign]

  const isLight = tone === 'light'

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-forest"
      style={{ height }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          style={{ objectPosition }}
          className="object-cover"
        />
        <div
          className={
            isLight
              ? 'absolute inset-0 bg-cream/10'
              : 'absolute inset-0 bg-forest-deep/55'
          }
        />
      </motion.div>

      <div className={`relative z-10 h-full flex flex-col justify-center ${alignClass} container-ar`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-md"
        >
          {eyebrow && (
            <span
              className={
                isLight
                  ? 'font-body text-[10px] font-medium tracking-[0.4em] uppercase text-forest'
                  : 'font-body text-[10px] font-medium tracking-[0.4em] uppercase text-cream/70'
              }
            >
              {eyebrow}
            </span>
          )}
          <h2
            className={
              isLight
                ? 'font-display tracking-[0.16em] uppercase text-ink leading-tight my-4'
                : 'font-display tracking-[0.16em] uppercase text-cream leading-tight my-4'
            }
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {heading}
          </h2>
          {body && (
            <p
              className={
                isLight
                  ? 'font-body text-sm text-ink/70 leading-relaxed mb-6'
                  : 'font-body text-sm text-cream/70 leading-relaxed mb-6'
              }
            >
              {body}
            </p>
          )}
          <Link
            href={ctaHref}
            className={
              isLight
                ? 'inline-block font-body text-[11px] font-medium tracking-widest uppercase bg-forest text-cream px-7 py-3 hover:bg-forest-deep transition-colors'
                : 'inline-block font-body text-[11px] font-medium tracking-widest uppercase bg-cream text-forest px-7 py-3 hover:bg-white transition-colors'
            }
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
