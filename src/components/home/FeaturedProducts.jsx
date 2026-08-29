import { products } from '../../data/products'
import { SectionHeading } from '../common/SectionHeading'
import { ProductGrid } from '../product/ProductGrid'

export function FeaturedProducts({ wishlist, onAddToCart }) {
  return <section className="collection section" id="shop"><SectionHeading eyebrow="Just for you" title="Fresh from the studio" linkLabel="View all pieces" linkHref="#all-products" /><ProductGrid products={products} wishlist={wishlist} onAddToCart={onAddToCart} /></section>
}
