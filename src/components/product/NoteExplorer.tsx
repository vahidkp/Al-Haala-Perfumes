'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { noteExplorerImages } from '@/lib/images'
import NoteIcon from './NoteIcon'

interface Note {
  name: string
  icon?: string
}

interface NoteExplorerProps {
  notes: {
    opening: Note[]
    heart: Note[]
    dryDown: Note[]
  }
  backgroundImage?: string
}

const noteColumns = [
  {
    label: 'Opening Notes',
    key: 'opening' as const,
    image: noteExplorerImages.top,
  },
  {
    label: 'Heart Notes',
    key: 'heart' as const,
    image: noteExplorerImages.heart,
  },
  {
    label: 'Dry-Down Notes',
    key: 'dryDown' as const,
    image: noteExplorerImages.base,
  },
]

export default function NoteExplorer({
  notes,
  backgroundImage = noteExplorerImages.bg,
}: NoteExplorerProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Fragrance notes background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-forest-deep/40" />
      </div>

      <div className="relative z-10 container-ar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="font-display tracking-[0.16em] uppercase text-cream leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
          >
            Discover The Notes
          </h2>
          <p className="font-body text-[11px] tracking-widest uppercase text-cream/70 mt-3">
            Explore the fragrance journey from top to base
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {noteColumns.map(({ label, key }, i) => {
            const noteList = notes[key] ?? []
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                className="bg-cream-paper border border-forest/15 p-6"
              >
                <h3 className="font-body text-[11px] font-semibold tracking-widest uppercase text-forest mb-5">
                  {label}
                </h3>
                <ul className="space-y-3">
                  {noteList.map((note) => (
                    <li key={note.name} className="flex items-center gap-3">
                      <NoteIcon name={note.name} size={20} className="text-forest shrink-0" />
                      <span className="font-body text-sm text-ink-soft">
                        {note.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
