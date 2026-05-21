'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Product } from '@/types'

interface IconicDuoProps {
  products: Product[]
}

export default function IconicDuo({ products }: IconicDuoProps) {
  const duo = products.slice(0, 2)
  if (duo.length < 2) return null

  return (
    <section className="bg-cream pt-4 pb-16 lg:pb-20">
      <div className="container-ar">
        <div className="flex flex-col items-center mb-10">
          <SectionHeader
            heading="The Iconic Duo"
            align="center"
            showDivider={false}
          />
        </div>

        <div className="grid grid-cols-2 max-w-2xl mx-auto gap-6 md:gap-10">
          {duo.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-warm">
                  {p.images[0]?.url && (
                    <Image
                      src={p.images[0].url}
                      alt={p.images[0].alt || p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  )}
                </div>
                <p className="text-center mt-4 font-body text-[11px] font-semibold tracking-widest uppercase text-ink group-hover:text-forest transition-colors">
                  {p.inspiredBy ? `Pour ${p.orientation === 'women' ? 'Femme' : 'Homme'}` : p.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
