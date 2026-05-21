'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const messages = [
  'Eid Al Adha sale up to 30% off — ends soon',
  'Free delivery in the UAE for orders over AED 200',
  'New launch — discover the Lynked Collection',
]

export default function AfnanAnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const next = () => setIdx((i) => (i + 1) % messages.length)
  const prev = () => setIdx((i) => (i - 1 + messages.length) % messages.length)

  return (
    <div className="w-full bg-[#0d1b3d] text-white">
      <div className="container-ar h-9 flex items-center justify-center gap-4 text-[11px] font-medium tracking-widest uppercase">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="opacity-70 hover:opacity-100 transition"
        >
          <ChevronLeft size={14} strokeWidth={1.5} />
        </button>

        <div className="text-center truncate">{messages[idx]}</div>

        <button
          onClick={next}
          aria-label="Next announcement"
          className="opacity-70 hover:opacity-100 transition"
        >
          <ChevronRight size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
