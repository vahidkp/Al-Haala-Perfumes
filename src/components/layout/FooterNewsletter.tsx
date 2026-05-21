'use client'

import { useState } from 'react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!email) return
        setSubmitted(true)
        setEmail('')
      }}
      className="w-full max-w-xs space-y-3"
    >
      {submitted ? (
        <p className="font-body text-[12px] text-cream tracking-widest uppercase">
          ✦ You&apos;re on the list.
        </p>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="w-full bg-transparent border border-forest-line px-4 py-2.5 font-body text-[13px] text-cream placeholder:text-cream/50 focus:outline-none focus:border-cream transition-colors"
          />
          <button
            type="submit"
            className="font-body text-[11px] font-semibold tracking-widest uppercase bg-cream text-forest px-6 py-2.5 hover:bg-white transition-colors"
          >
            Subscribe
          </button>
        </>
      )}
    </form>
  )
}
