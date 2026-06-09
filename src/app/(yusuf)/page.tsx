import HeroSection from '@/components/home/HeroSection'
import FeaturedStrip from '@/components/home/FeaturedStrip'
import CategoryPillRow from '@/components/home/CategoryPillRow'
import IconicDuo from '@/components/home/IconicDuo'
import BestSellers from '@/components/home/BestSellers'
import EditorialBanner from '@/components/home/EditorialBanner'
import SayNoToDrugsBanner from '@/components/home/SayNoToDrugsBanner'
import ScentedDelights from '@/components/home/ScentedDelights'
import NewsletterSection from '@/components/home/NewsletterSection'
import TrustBar from '@/components/ui/TrustBar'
import {
  getAllProducts,
  getFeaturedProducts,
  getBestSellers,
} from '@/lib/queries'
import { heroImages } from '@/lib/images'

export const revalidate = 3600

export default async function HomePage() {
  const [allProducts, featured, bestSellers] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
    getBestSellers(),
  ])

  const featuredList = featured.length ? featured : allProducts.slice(0, 6)
  const bestList = bestSellers.length ? bestSellers : allProducts.slice(0, 4)
  const attarProducts = allProducts.filter(
    (p) => p.concentration === 'Attar' || p.category.slug === 'attar'
  )
  const featuredCollection = allProducts.slice(4, 8)

  return (
    <>
      <HeroSection />

      {/* Fragrance of the Week */}
      <FeaturedStrip
        products={featuredList}
        eyebrow="Curation"
        heading="Fragrance of the Week"
        body="Discover the curated edit of fragrances and perfumes hand-picked specially for you"
      />

      {/* Category icon pill row */}
      <CategoryPillRow />

      {/* The Iconic Duo */}
      <IconicDuo products={allProducts.filter((p) => p.badges.includes('bestseller')).slice(0, 2)} />

      {/* Sip and Scent — sip-style row on forest */}
      <FeaturedStrip
        products={allProducts.slice(0, 4)}
        eyebrow="New Launch"
        heading="Sip and Scent"
        body="Limited-edition pours born from the spirit of the souk"
        theme="dark"
      />

      {/* Mountain / signature banner */}
      <EditorialBanner
        eyebrow=""
        heading="AL-HAALA"
        body="The Signature Edition — explore the flagship oud, crafted in our smallest batches."
        ctaLabel="Explore"
        ctaHref="/products/oud-al-haala"
        imageUrl={heroImages.men}
        imageAlt="Signature edition"
        textAlign="center"
        height="60vh"
        tone="dark"
      />

      {/* Say No To Drugs themed banner */}
      <SayNoToDrugsBanner />

      {/* Brand Inspirations — Perfumes */}
      <BestSellers
        products={bestList}
        eyebrow="Brand Inspirations"
        heading="Perfumes"
      />

      {/* Scented Delights */}
      <ScentedDelights />

      {/* Perfume Oil / Attar strip on forest */}
      <BestSellers
        products={attarProducts.length ? attarProducts : allProducts.slice(0, 4)}
        eyebrow="Brand Inspirations"
        heading="Perfume Oil (Attar)"
        theme="dark"
      />

      {/* Featured Collection */}
      <BestSellers
        products={featuredCollection}
        eyebrow="Featured Collection"
        heading="Poem · Noble · Deja Vu · Teeb"
      />

      {/* Lifestyle banner — For Him / For Her split */}
      <section className="bg-cream">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <EditorialBanner
            heading="Poem For Him"
            ctaLabel="Buy Now"
            ctaHref="/collections?category=men"
            imageUrl={heroImages.men}
            imageAlt="For Him"
            textAlign="center"
            height="55vh"
            tone="dark"
            objectPosition="center 20%"
          />
          <EditorialBanner
            heading="Poem For Her"
            ctaLabel="Buy Now"
            ctaHref="/collections?category=women"
            imageUrl={heroImages.women}
            imageAlt="For Her"
            textAlign="center"
            height="55vh"
            tone="dark"
            objectPosition="center 40%"
          />
        </div>
      </section>

      {/* Noble Collection — smaller 2-column display */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="container-ar text-center">
          <p className="font-body text-[10px] font-medium tracking-[0.4em] uppercase text-forest/70 mb-3">
            Standing Elegance Through Every Fragrance
          </p>
          <h2 className="font-display tracking-[0.18em] uppercase text-ink mb-12"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)' }}
          >
            Noble Collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
            {allProducts.slice(2, 4).map((p, i) => (
              <a
                key={p.id}
                href={`/products/${p.slug}`}
                className="group block bg-cream-paper"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-warm">
                  {p.images[0]?.url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-ink-mute/40 font-display text-3xl tracking-widest">
                      {p.name?.[0] ?? 'AR'}
                    </div>
                  )}
                </div>
                <div className="text-center py-4">
                  <p className="font-body text-[10px] font-semibold tracking-widest uppercase text-ink-mute mb-1">
                    Inspired by {p.inspiredBy ?? 'Maison'}
                  </p>
                  <p className="font-body text-[13px] font-medium tracking-widest uppercase text-ink group-hover:text-forest transition-colors">
                    {p.name}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/collections"
              className="inline-block font-body text-[11px] font-medium tracking-widest uppercase border border-forest/40 text-forest hover:bg-forest hover:text-cream px-8 py-3 transition-colors"
            >
              View Product
            </a>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <TrustBar />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  )
}
