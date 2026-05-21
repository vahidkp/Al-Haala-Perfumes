import DiscoveryKitCard from './DiscoveryKitCard'
import type { Product } from '@/types'

interface DiscoveryKitsProps {
  products: Product[]
}

export default function DiscoveryKits({ products }: DiscoveryKitsProps) {
  const kits = products.slice(0, 2)
  if (!kits.length) return null

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-ar">
        <div className="text-center mb-10">
          <h2
            className="font-display tracking-[0.16em] uppercase text-ink"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Discovery Kits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
          {kits.map((p) => (
            <DiscoveryKitCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
