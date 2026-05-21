'use client'

import { motion } from 'framer-motion'
import { Truck, Headphones, ShieldCheck } from 'lucide-react'

const trustItems = [
  {
    icon: Truck,
    title: 'International Shipping',
    subtitle: 'Worldwide shipping — customs duties excluded',
  },
  {
    icon: Headphones,
    title: 'Customer Service',
    subtitle: 'Get in touch through WhatsApp',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: 'Your payment information is processed securely',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-cream-warm/60 border-y border-forest/10 py-10 lg:py-14">
      <div className="container-ar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <item.icon size={28} strokeWidth={1.1} className="text-forest" />
              <div>
                <p className="font-body text-[12px] font-semibold tracking-widest uppercase text-ink">
                  {item.title}
                </p>
                <p className="font-body text-[12px] text-ink-mute mt-1.5 max-w-[240px] mx-auto leading-snug">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
