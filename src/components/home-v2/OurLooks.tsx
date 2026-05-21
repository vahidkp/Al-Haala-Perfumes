'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Look {
  title: string
  href: string
  image: string
  caption?: string
}

interface OurLooksProps {
  looks: Look[]
}

/**
 * Two-pane lookbook carousel — large primary look on the left, smaller secondary
 * on the right. Arrows cycle through additional looks.
 */
export default function OurLooks({ looks }: OurLooksProps) {
  const [index, setIndex] = useState(0)
  if (!looks.length) return null

  const total = looks.length
  const primary = looks[index]
  const secondary = looks[(index + 1) % total]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-ar">
        <div className="text-center mb-10">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-ink-mute mb-3">
            Our Looks
          </p>
          <h2
            className="font-display tracking-[0.16em] uppercase text-ink"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Shop
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
            <Link
              href={primary.href}
              className="group relative md:col-span-2 aspect-[3/2] block overflow-hidden bg-cream-warm"
            >
              <Image
                src={primary.image}
                alt={primary.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Link>
            <Link
              href={secondary.href}
              className="group relative aspect-[3/2] md:aspect-auto block overflow-hidden bg-cream-warm"
            >
              <Image
                src={secondary.image}
                alt={secondary.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute top-3 left-3 bg-[#e02323] text-white font-body text-[9px] font-bold tracking-widest uppercase px-2 py-1">
                Eid Sale
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="font-body text-[11px] tracking-widest uppercase text-white">
                  {secondary.title}
                </p>
                {secondary.caption && (
                  <p className="font-body text-[10px] text-white/70 mt-1">
                    {secondary.caption}
                  </p>
                )}
              </div>
            </Link>
          </div>

          {/* Carousel arrows */}
          {total > 2 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                aria-label="Previous look"
                onClick={() => setIndex((i) => (i - 1 + total) % total)}
                className="w-9 h-9 border border-ink/30 text-ink hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                aria-label="Next look"
                onClick={() => setIndex((i) => (i + 1) % total)}
                className="w-9 h-9 border border-ink/30 text-ink hover:bg-ink hover:text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
