'use client'

import { useState } from 'react'

export default function AfnanNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="bg-[#f5f1ea] py-14 lg:py-16 border-t border-ink/5">
      <div className="container-ar text-center max-w-xl mx-auto">
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-ink-mute mb-3">
          When You Buy Online
        </p>
        <h2
          className="font-display tracking-[0.18em] uppercase text-ink mb-6"
          style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}
        >
          Newsletter
        </h2>
        <p className="font-body text-sm text-ink/65 mb-6">
          Sign up to get the latest on sales, new releases and exclusive launches.
        </p>

        {submitted ? (
          <p className="font-body text-[12px] text-ink tracking-widest uppercase">
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
              className="flex-1 bg-white border border-ink/15 sm:border-r-0 px-5 py-3.5 font-body text-sm text-ink placeholder:text-ink-mute focus:outline-none focus:border-ink transition-colors"
            />
            <button
              type="submit"
              className="font-body text-[11px] font-medium tracking-widest uppercase bg-ink text-white px-7 py-3.5 hover:bg-[#0d1b3d] transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
