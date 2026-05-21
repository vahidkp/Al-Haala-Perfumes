import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null

  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="container-ar">
        <div className="flex flex-col items-center mb-10">
          <SectionHeader heading="Related Products" align="center" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              showInspiredBy
            />
          ))}
        </div>
      </div>
    </section>
  )
}
