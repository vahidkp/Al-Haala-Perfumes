import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts } from '@/lib/queries'
import ProductHero from '@/components/product/ProductHero'
import NoteExplorer from '@/components/product/NoteExplorer'
import StoryBanner from '@/components/product/StoryBanner'
import FAQSection from '@/components/product/FAQSection'
import RelatedProducts from '@/components/product/RelatedProducts'
import TrustBar from '@/components/ui/TrustBar'
import { heroImages } from '@/lib/images'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  const ogImage = product.images[0]?.url
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.tagline,
    openGraph: ogImage
      ? { images: [{ url: ogImage }] }
      : undefined,
  }
}

export const revalidate = 3600

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.id, product.category.slug)

  return (
    <>
      <ProductHero product={product} />
      <NoteExplorer notes={product.notes} />
      <StoryBanner
        heading="A Symphony of Oud and Tradition"
        body="Every Al-Haala fragrance is a journey — through ancient souks, cedar forests, and sun-warmed amber. We source only the finest raw materials to craft scents that are timeless, personal, and unforgettable."
        imageUrl={heroImages.story}
      />
      <TrustBar />
      <RelatedProducts products={related} />
      <FAQSection />
    </>
  )
}
