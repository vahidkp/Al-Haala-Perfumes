import type { Metadata } from 'next'
import CollectionClient from './CollectionClient'
import { getAllProducts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Collections',
  description:
    "Browse AR-Rahmani's full range of Ouds, Attars, Bakhoor, Gift Sets and more.",
}

export const revalidate = 3600

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string }
}) {
  const products = await getAllProducts()

  return (
    <CollectionClient
      allProducts={products}
      initialCategory={searchParams.category ?? 'all'}
      initialSort={searchParams.sort ?? 'featured'}
    />
  )
}
