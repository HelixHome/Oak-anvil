import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/ProductDetail'
import { PRODUCTS } from '@/data/products'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const product = PRODUCTS.find(p => p.handle === handle)
  if (!product) return {}
  return {
    title: `${product.name} — Oak & Anvil`,
    description: product.blurb,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = PRODUCTS.find(p => p.handle === handle)
  if (!product) notFound()

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return <ProductDetail product={product} related={related} />
}
