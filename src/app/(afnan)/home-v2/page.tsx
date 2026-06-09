import HeroV2 from '@/components/home-v2/HeroV2'
import DualProductBanner from '@/components/home-v2/DualProductBanner'
import ProductStrip from '@/components/home-v2/ProductStrip'
import LifestyleCollage from '@/components/home-v2/LifestyleCollage'
import CollectionBanner from '@/components/home-v2/CollectionBanner'
import OurLooks from '@/components/home-v2/OurLooks'
import DiscoveryKits from '@/components/home-v2/DiscoveryKits'
import CollectionTiles from '@/components/home-v2/CollectionTiles'
import ServicesStrip from '@/components/home-v2/ServicesStrip'
import AfnanNewsletter from '@/components/home-v2/AfnanNewsletter'
import { getAllProducts, getFeaturedProducts, getBestSellers } from '@/lib/queries'

export const revalidate = 3600

export const metadata = {
  title: 'Al-Haala — Home (V2)',
}

export default async function HomeV2() {
  const [allProducts, featured, bestSellers] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
    getBestSellers(),
  ])

  const heroProduct = featured[0] ?? allProducts[0]
  const dualProducts =
    bestSellers.length >= 2 ? bestSellers.slice(0, 2) : allProducts.slice(0, 2)
  const bestList = (bestSellers.length ? bestSellers : allProducts).slice(0, 5)

  // Pad each section so the grid always renders cleanly.
  const padTo = (primary: typeof allProducts, n: number) => {
    if (primary.length >= n) return primary.slice(0, n)
    const seen = new Set(primary.map((p) => p.id))
    const filler = allProducts.filter((p) => !seen.has(p.id))
    return [...primary, ...filler].slice(0, n)
  }

  const menProducts = padTo(
    allProducts.filter((p) => p.orientation === 'men'),
    4
  )
  const womenProducts = padTo(
    allProducts.filter((p) => p.orientation === 'women'),
    5
  )
  const discoveryList = padTo(
    allProducts.filter((p) => p.category.slug === 'gifts'),
    2
  )

  const collageImages = [
    '/images/v2/lifestyle-roses.png',
    '/images/v2/lifestyle-atelier.png',
    '/images/v2/lifestyle-bakhoor.png',
    '/images/v2/lifestyle-amber.png',
  ]

  const lookbookImages = [
    {
      title: 'The Atelier Look',
      caption: 'Signature · Limited',
      href: '/collections',
      image: '/images/v2/look-atelier.png',
    },
    {
      title: 'Heritage Collection',
      caption: 'Attar · Oud',
      href: '/collections?category=attar',
      image: '/images/v2/look-heritage.png',
    },
    {
      title: 'Modern Femme',
      caption: 'Floral · Modern',
      href: '/collections?category=women',
      image: '/images/v2/look-modern-femme.png',
    },
  ]

  return (
    <>
      {/* 1 — Bright LYNKED-style hero */}
      <HeroV2 product={heroProduct} heroImage="/images/v2/hero-bottle.png" />

      {/* 2 — Black dual-product banner */}
      <DualProductBanner
        products={dualProducts}
        collectionLabel="LYNKED"
        leftImage="/images/v2/lynked-left.png"
        rightImage="/images/v2/lynked-right.png"
      />

      {/* 3 — Best Sellers (5-up, red EID SALE tags) */}
      <ProductStrip
        eyebrow="Must Have"
        heading="Best Sellers"
        products={bestList}
        count={5}
        ctaHref="/collections"
      />

      {/* 4 — 2x2 lifestyle collage */}
      <LifestyleCollage images={collageImages} />

      {/* 5 — For Men (4-up) */}
      <ProductStrip
        eyebrow="Must Have"
        heading="For Men"
        products={menProducts}
        count={4}
        ctaHref="/collections?category=men"
      />

      {/* 6 — 9AM/9PM-style collection banner */}
      <CollectionBanner
        heading="9AM / 9PM Collection"
        imageUrl="/images/v2/banner-9am-9pm.png"
        ctaHref="/collections"
        ctaLabel="Shop The Collection"
        tone="dark"
        textPosition="left"
      />

      {/* 7 — For Women (5-up) */}
      <ProductStrip
        eyebrow="Must Have"
        heading="For Women"
        products={womenProducts}
        count={5}
        ctaHref="/collections?category=women"
      />

      {/* 8 — Gift Sets banner (vivid blue) */}
      <CollectionBanner
        heading="Gift Sets"
        imageUrl="/images/v2/banner-gift-sets.png"
        ctaHref="/collections?category=gifts"
        ctaLabel="Shop Gifts"
        tone="blue"
        textPosition="left"
      />

      {/* 9 — Our Looks lookbook */}
      <OurLooks looks={lookbookImages} />

      {/* 10 — Discovery Kits */}
      <DiscoveryKits products={discoveryList} />

      {/* 11 — Discover Our Exquisite Collection (5 vivid tiles) */}
      <CollectionTiles />

      {/* 12 — Services strip */}
      <ServicesStrip />

      {/* 13 — Newsletter */}
      <AfnanNewsletter />
    </>
  )
}
