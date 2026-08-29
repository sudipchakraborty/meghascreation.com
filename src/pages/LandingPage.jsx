import { FeaturedProducts } from '../components/home/FeaturedProducts'
import { HeroSection } from '../components/home/HeroSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import { StorySection } from '../components/home/StorySection'
import { ValuesSection } from '../components/home/ValuesSection'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../context/CartContext'

export function LandingPage() {
  const wishlist = useWishlist()
  const cart = useCart()
  return <div id="top"><Header cartCount={cart.itemCount} /><main><HeroSection /><FeaturedProducts wishlist={wishlist} onAddToCart={cart.addItem} /><StorySection /><ValuesSection /><NewsletterSection /></main><Footer /></div>
}
