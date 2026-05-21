'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SayNoToDrugsBanner() {
  return (
    <section className="relative bg-cream py-20 lg:py-28 overflow-hidden">
      {/* Diagonal warning tape borders */}
      <div className="absolute -left-10 top-0 right-[55%] h-12 warning-tape -rotate-[8deg] origin-top-left" />
      <div className="absolute -right-10 bottom-0 left-[55%] h-12 warning-tape -rotate-[8deg] origin-bottom-right" />

      <div className="relative container-ar text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-[10px] font-medium tracking-[0.5em] uppercase text-forest mb-5"
        >
          The High Tactics Collection
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display tracking-[0.18em] uppercase text-ink leading-none"
          style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}
        >
          Say No To Drugs
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/collections?category=new"
            className="font-body text-[11px] font-medium tracking-widest uppercase bg-forest text-cream px-8 py-3 hover:bg-forest-deep transition-colors"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
