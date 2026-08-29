import { ProductCard } from './ProductCard'

export function ProductGrid({ products, wishlist, onAddToCart }) {
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} isWishlisted={wishlist.isWishlisted(product.id)} onToggleWishlist={wishlist.toggleWishlist} onAddToCart={onAddToCart} />)}</div>
}
