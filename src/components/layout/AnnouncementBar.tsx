'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const messages = [
  'Free delivery in the UAE for orders over AED 200',
  'New Launch — Premium Oud Collection now live',
  'Use code WELCOME for 5% off your first order',
  'Authentically crafted Arabian fragrances',
]

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((i) => (i + 1) % messages.length)
  const prev = () => setIdx((i) => (i - 1 + messages.length) % messages.length)

  return (
    <div className="w-full bg-forest-deep text-cream/90 border-b border-forest-line">
      <div className="container-ar h-9 flex items-center justify-between gap-4 text-[11px] font-medium tracking-widest uppercase">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="opacity-70 hover:opacity-100 hover:text-cream transition"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
        </button>

        <div className="flex-1 text-center truncate">{messages[idx]}</div>

        <div className="flex items-center gap-4">
          <button
            onClick={next}
            aria-label="Next announcement"
            className="opacity-70 hover:opacity-100 hover:text-cream transition"
          >
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
          <span className="hidden sm:flex items-center gap-1.5 text-cream/60">
            <MapPin size={12} strokeWidth={1.5} />
            <span className="text-[10px]">Store Locator</span>
          </span>
        </div>
      </div>
    </div>
  )
}
