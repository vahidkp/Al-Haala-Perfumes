import Image from 'next/image'
import Link from 'next/link'

interface CollectionBannerProps {
  heading: string
  imageUrl: string
  ctaHref?: string
  ctaLabel?: string
  tone?: 'dark' | 'blue'
  textPosition?: 'left' | 'right'
}

/**
 * Wide editorial banner styled like Afnan's 9AM/9PM section — strong horizontal
 * imagery with a large oversized heading laid over it.
 */
export default function CollectionBanner({
  heading,
  imageUrl,
  ctaHref = '/collections',
  ctaLabel = 'Shop Now',
  tone = 'dark',
  textPosition = 'left',
}: CollectionBannerProps) {
  const positionClass =
    textPosition === 'left' ? 'items-start text-left' : 'items-end text-right'

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="relative w-full" style={{ height: 'clamp(280px, 36vw, 520px)' }}>
        <Image
          src={imageUrl}
          alt={heading}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className={`absolute inset-0 ${
            tone === 'blue'
              ? 'bg-gradient-to-r from-[#0049b3]/85 via-[#0049b3]/50 to-transparent'
              : 'bg-black/55'
          }`}
        />
        <div
          className={`absolute inset-0 container-ar flex flex-col justify-center ${positionClass}`}
        >
          <h2
            className="font-display tracking-[0.12em] uppercase text-white leading-[0.95]"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
          >
            {heading}
          </h2>
          <Link
            href={ctaHref}
            className="mt-6 font-body text-[11px] font-medium tracking-widest uppercase bg-white text-ink hover:bg-cream px-7 py-3 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
