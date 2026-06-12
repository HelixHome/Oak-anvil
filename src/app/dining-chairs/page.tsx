import { CategoryView } from '@/components/CategoryView'
import { PRODUCTS, CATEGORIES } from '@/data/products'

export const metadata = {
  title: 'Dining Chairs — Oak & Anvil',
  description: 'Eight chairs in solid oak, ash, and walnut. Each made to order, each finished by hand.',
}

export default function DiningChairsPage() {
  const category = CATEGORIES['dining-chairs']
  const products = PRODUCTS.filter(p => p.category === 'dining-chairs')
  return <CategoryView category={category} products={products} />
}
