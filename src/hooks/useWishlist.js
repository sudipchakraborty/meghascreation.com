import { useState } from 'react'

export function useWishlist() {
  const [wishlist, setWishlist] = useState([])
  const toggleWishlist = (productId) => setWishlist((items) => items.includes(productId) ? items.filter((id) => id !== productId) : [...items, productId])
  const isWishlisted = (productId) => wishlist.includes(productId)
  return { wishlist, toggleWishlist, isWishlisted }
}
