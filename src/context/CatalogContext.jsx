import { createContext, useContext, useEffect, useState } from 'react'
import { products as bundledProducts } from '../data/products'
import { createCatalogService } from '../services/catalogService'

const CatalogContext = createContext(null)
const localService = createCatalogService()

/** @brief Share the catalog with shop and editor. @param service Injectable read/save/upload adapter. */
export function CatalogProvider({ children, service = localService }) {
  const [products, setProducts] = useState(bundledProducts)
  const [loading, setLoading] = useState(import.meta.env.DEV)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!import.meta.env.DEV) return
    let active = true
    service.read().then((saved) => { if (active && saved !== null) setProducts(saved) }).catch((e) => { if (active) setError(e.message) }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [service])
  async function save(next) {
    const saved = await service.save(next)
    setProducts(saved)
  }
  return <CatalogContext.Provider value={{ products, loading, error, save, upload: service.upload }}>{children}</CatalogContext.Provider>
}

/** @brief Access the current catalog and persistence adapter. */
export function useCatalog() { return useContext(CatalogContext) }
