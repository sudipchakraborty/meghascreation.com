import { useCatalog } from '../../context/CatalogContext'
import { SectionHeading } from '../common/SectionHeading'
import { ProductGrid } from '../product/ProductGrid'

export function FeaturedProducts({ wishlist, onAddToCart }) {
  const { products, loading, error } = useCatalog()
  const visible = products.filter((p) => p.visible !== false)
  return <section className="collection section" id="shop"><SectionHeading eyebrow="Just for you" title="Fresh from the studio" linkLabel="View all pieces" linkHref="#all-products" />{loading ? <p role="status">Loading products…</p> : <><div id="all-products" /><ProductGrid products={visible} wishlist={wishlist} onAddToCart={onAddToCart} />{!visible.length && <p>New handmade pieces are coming soon.</p>}</>}{error && <p role="alert">Local catalog could not be loaded. Showing the sample collection.</p>}{import.meta.env.DEV && <a className="text-link" href="#manage-products">Manage products</a>}</section>
}
