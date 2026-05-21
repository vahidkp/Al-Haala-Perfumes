'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { categoryImages } from '@/lib/images'

const categories = [
  { name: 'Oud Perfumes', slug: 'oud', image: categoryImages.oud },
  { name: 'Attar / Perfume Oil', slug: 'attar', image: categoryImages.attar },
  { name: 'Bakhoor', slug: 'bakhoor', image: categoryImages.bakhoor },
  { name: 'Gift Sets', slug: 'gifts', image: categoryImages.gifts },
  { name: 'New Arrivals', slug: 'new', image: categoryImages.new },
  { name: 'Collections', slug: '', image: categoryImages.all },
]

export default function CategoryGrid() {
  return (
    <section className="section-y bg-charcoal">
      <div className="container-ar">
        <div className="text-center mb-12">
          <span className="eyebrow">Shop By Category</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Find Your Scent
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: 'easeOut',
              }}
            >
              <Link
                href={`/collections${cat.slug ? `?category=${cat.slug}` : ''}`}
                className="group relative block overflow-hidden bg-obsidian"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent transition-opacity duration-300 group-hover:from-obsidian/60" />

                <div className="absolute inset-0 border border-transparent group-hover:border-gold/50 transition-all duration-300" />

                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-display text-xl md:text-2xl font-medium italic text-white leading-tight group-hover:text-gold transition-colors duration-200">
                    {cat.name}
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
