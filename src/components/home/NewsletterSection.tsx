'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="bg-cream py-16 lg:py-20 border-t border-forest/10">
      <div className="container-ar">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-body text-[10px] font-medium tracking-[0.5em] uppercase text-forest/70 mb-3">
            Keep In Touch
          </p>
          <h2 className="font-display tracking-[0.18em] uppercase text-ink mb-6"
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            Newsletter
          </h2>
          <p className="font-body text-sm text-ink/60 mb-10">
            Sign up to get the latest on sales, new releases, and exclusive
            launches.
          </p>

          {submitted ? (
            <p className="font-body text-[12px] text-forest tracking-widest uppercase">
              ✦ You&apos;re on the list. Welcome.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                className="flex-1 bg-white border border-forest/20 sm:border-r-0 px-5 py-3.5 font-body text-sm text-ink placeholder:text-ink-mute focus:outline-none focus:border-forest transition-colors"
              />
              <button
                type="submit"
                className="font-body text-[11px] font-medium tracking-widest uppercase bg-forest text-cream px-7 py-3.5 hover:bg-forest-deep transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
