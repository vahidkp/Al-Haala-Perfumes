'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  body?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  /** "dark" places light text on a dark forest section. */
  theme?: 'light' | 'dark'
  cta?: React.ReactNode
  showDivider?: boolean
}

const alignMap = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

export default function SectionHeader({
  eyebrow,
  heading,
  body,
  align = 'center',
  className,
  theme = 'light',
  cta,
  showDivider = true,
}: SectionHeaderProps) {
  const isDark = theme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', alignMap[align], className)}
    >
      {eyebrow && (
        <span
          className={cn(
            'font-body text-[10px] font-medium tracking-[0.4em] uppercase',
            isDark ? 'text-cream/60' : 'text-forest/70'
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          'font-display font-normal leading-tight tracking-[0.16em] uppercase',
          isDark ? 'text-cream' : 'text-ink',
          'text-2xl md:text-[28px] lg:text-[30px]'
        )}
      >
        {heading}
      </h2>

      {showDivider && (
        <div
          className={cn(
            'mt-3 h-px w-12',
            isDark ? 'bg-cream/40' : 'bg-forest/40'
          )}
        />
      )}

      {body && (
        <p
          className={cn(
            'font-body text-[13px] max-w-md leading-relaxed mt-1',
            isDark ? 'text-cream/60' : 'text-ink-mute'
          )}
        >
          {body}
        </p>
      )}

      {cta && <div className="mt-4">{cta}</div>}
    </motion.div>
  )
}
