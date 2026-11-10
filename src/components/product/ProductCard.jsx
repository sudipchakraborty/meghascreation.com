import { Heart, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '../../utils/currency'

export function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  return <article className={`product-card ${product.tone} ${product.image.startsWith('/local-images/') ? 'uploaded-product' : ''}`}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span className="badge">{product.badge}</span>}<button type="button" className={isWishlisted ? 'liked' : ''} onClick={() => onToggleWishlist(product.id)} aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}><Heart size={19} fill={isWishlisted ? 'currentColor' : 'none'} /></button></div><p>{product.category}</p><h3>{product.name}</h3>{product.description && <div className="product-description">{product.description}</div>}<div className="product-bottom"><strong>{formatCurrency(product.price)}</strong><button type="button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to bag`}><ShoppingBag size={17} /></button></div></article>
}
