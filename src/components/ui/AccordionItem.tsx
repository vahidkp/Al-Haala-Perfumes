'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export default function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        'border-b border-forest/15 py-5 transition-colors duration-200'
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span
          className={cn(
            'font-body text-sm font-medium tracking-wide transition-colors duration-200',
            open ? 'text-forest' : 'text-ink group-hover:text-forest'
          )}
        >
          {question}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-forest">
          {open ? (
            <Minus size={14} strokeWidth={2} />
          ) : (
            <Plus size={14} strokeWidth={2} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-ink-soft leading-relaxed pt-4 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
