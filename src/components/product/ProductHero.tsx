'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ImageGallery from './ImageGallery'
import ProductInfo from './ProductInfo'
import type { Product } from '@/types'

interface ProductHeroProps {
  product: Product
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="bg-cream pt-6 pb-16 lg:pt-10 lg:pb-20">
      <div className="container-ar">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-[11px] text-ink-mute tracking-wider">
            <li>
              <Link href="/" className="hover:text-forest transition-colors">
                Home
              </Link>
            </li>
            <li className="text-ink-mute/50">›</li>
            <li>
              <Link
                href="/collections"
                className="hover:text-forest transition-colors"
              >
                Collections
              </Link>
            </li>
            <li className="text-ink-mute/50">›</li>
            <li className="text-ink truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <ImageGallery
              images={product.images}
              productName={product.name}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <ProductInfo product={product} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
