'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { delightImages } from '@/lib/images'

const delights = [
  {
    label: 'Perfumes',
    href: '/collections?category=oud',
    image: delightImages.perfumes,
  },
  {
    label: 'Candles',
    href: '/collections?category=bakhoor',
    image: delightImages.bakhoor,
  },
  {
    label: 'Bakhoor',
    href: '/collections?category=bakhoor',
    image: delightImages.attar,
  },
]

export default function ScentedDelights() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-ar">
        <div className="flex flex-col items-center mb-12">
          <SectionHeader
            heading="Scented Delights"
            body="A trio of luxurious fragrances"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-5">
          {delights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={item.href}
                className="group relative block overflow-hidden bg-ink"
                style={{ aspectRatio: '1/1' }}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <h3 className="font-body text-[12px] md:text-[13px] font-semibold tracking-[0.4em] uppercase text-cream">
                    {item.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
