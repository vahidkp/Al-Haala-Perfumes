import Image from 'next/image'
import Link from 'next/link'

interface Tile {
  label: string
  caption: string
  href: string
  image: string
  bg: string
}

/** Afnan-style: 5 vivid tiles, each promoting a sub-collection. */
const tiles: Tile[] = [
  {
    label: 'Celebrate You',
    caption: 'Floral · Modern',
    href: '/collections?category=women',
    image: '/images/v2/tile-celebrate.png',
    bg: 'bg-[#5e3aa6]',
  },
  {
    label: 'Dare To Be Bold',
    caption: 'Oud · Smoky',
    href: '/collections?category=oud',
    image: '/images/v2/tile-bold.png',
    bg: 'bg-[#7a2723]',
  },
  {
    label: 'The Night Out',
    caption: 'Amber · Spicy',
    href: '/collections',
    image: '/images/v2/tile-night.png',
    bg: 'bg-[#0d2a52]',
  },
  {
    label: 'Heritage',
    caption: 'Saffron · Rose',
    href: '/collections?category=attar',
    image: '/images/v2/tile-heritage.png',
    bg: 'bg-[#c75d18]',
  },
  {
    label: 'Signature',
    caption: 'The Atelier',
    href: '/collections',
    image: '/images/v2/tile-signature.png',
    bg: 'bg-[#1f1f1f]',
  },
]

export default function CollectionTiles() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-ar">
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-ink-mute mb-3">
            World of Captivating Fragrances
          </p>
          <h2
            className="font-display tracking-[0.16em] uppercase text-ink"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)' }}
          >
            Discover Our Exquisite Collection
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {tiles.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={`group relative aspect-[3/4] overflow-hidden ${t.bg}`}
            >
              <Image
                src={t.image}
                alt={t.label}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              {/* Bottom-up gradient only — image already carries the palette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="font-body text-[10px] tracking-widest uppercase text-white/80 mb-1">
                  {t.caption}
                </p>
                <h3 className="font-display text-lg md:text-xl tracking-[0.14em] uppercase text-white leading-tight">
                  {t.label}
                </h3>
                <span className="inline-block mt-4 self-start bg-white text-ink font-body text-[10px] tracking-widest uppercase px-3.5 py-1.5 group-hover:bg-[#e02323] group-hover:text-white transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
