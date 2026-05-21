'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types'

interface ImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const active = images[activeIdx]

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'relative overflow-hidden bg-white border border-forest/10 cursor-zoom-in',
          zoomed && 'cursor-zoom-out'
        )}
        style={{ aspectRatio: '1/1' }}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        {active && (
          <Image
            src={active.url}
            alt={active.alt || productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              'object-cover transition-transform duration-500',
              zoomed ? 'scale-110' : 'scale-100'
            )}
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'relative shrink-0 overflow-hidden bg-white transition-all duration-200',
                'w-16 h-16 lg:w-20 lg:h-20',
                activeIdx === i
                  ? 'border-2 border-forest'
                  : 'border border-forest/15 hover:border-forest/40 opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} view ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
