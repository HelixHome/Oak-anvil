import { CategoryView } from '@/components/CategoryView'
import { PRODUCTS, CATEGORIES } from '@/data/products'

export const metadata = {
  title: 'Counter Stools — Oak & Anvil',
  description: 'Seven stools at counter and bar height. The same joinery, scaled for the kitchen.',
}

export default function CounterStoolsPage() {
  const category = CATEGORIES['counter-stools']
  const products = PRODUCTS.filter(p => p.category === 'counter-stools')
  return <CategoryView category={category} products={products} />
}
