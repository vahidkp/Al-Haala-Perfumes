'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HorizontalScrollerProps {
  children: React.ReactNode
  className?: string
  gap?: number
}

export default function HorizontalScroller({
  children,
  className,
  gap = 16,
}: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75
    el.scrollBy({
      left: dir === 'right' ? amount : -amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className={cn('relative group/scroller', className)}>
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
          'w-10 h-10 rounded-full bg-charcoal border border-slate-dark',
          'flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold',
          'transition-all duration-200 shadow-xl',
          'opacity-0 group-hover/scroller:opacity-100',
          !canScrollLeft && '!opacity-0 pointer-events-none'
        )}
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide"
        style={{ gap: `${gap}px`, paddingBottom: '4px' }}
      >
        {children}
      </div>

      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
          'w-10 h-10 rounded-full bg-charcoal border border-slate-dark',
          'flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold',
          'transition-all duration-200 shadow-xl',
          'opacity-0 group-hover/scroller:opacity-100',
          !canScrollRight && '!opacity-0 pointer-events-none'
        )}
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}
