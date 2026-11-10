import { LandingPage } from './pages/LandingPage'
import { CartProvider } from './context/CartContext'
import { CatalogProvider } from './context/CatalogContext'
import { ProductManager } from './pages/ProductManager'
import { useEffect, useState } from 'react'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const update = () => setHash(window.location.hash)
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  return <CatalogProvider><CartProvider>{import.meta.env.DEV && hash === '#manage-products' ? <ProductManager /> : <LandingPage />}</CartProvider></CatalogProvider>
}
