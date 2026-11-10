import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

/** @brief Create a persistent catalog adapter. @param directory Absolute storage folder. */
export function createFileCatalog({ directory }) {
  const catalogPath = join(directory, 'products.json')
  return {
    /** @brief Read saved products; null means the bundled catalog should be used. */
    async read() {
      try { return JSON.parse(await readFile(catalogPath, 'utf8')) }
      catch (error) { if (error.code === 'ENOENT') return null; throw error }
    },
    /** @brief Validate and atomically replace catalog metadata. @param products Full catalog array. */
    async save(products) {
      if (!Array.isArray(products) || products.length > 2000) throw new Error('Invalid product list.')
      const ids = new Set()
      for (const p of products) {
        if (!p || typeof p.id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(p.id) || ids.has(p.id)) throw new Error('Invalid or duplicate product ID.')
        ids.add(p.id)
        if (typeof p.name !== 'string' || !p.name.trim() || p.name.length > 120) throw new Error('Product name is required (maximum 120 characters).')
        if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price <= 0 || p.price > 10000000 || Math.abs(p.price * 100 - Math.round(p.price * 100)) > 0.00001) throw new Error('Price must be positive with at most two decimal places.')
        if (typeof p.image !== 'string' || !/^\/(?!\/)[^\s]*$/.test(p.image)) throw new Error('A product image is required.')
        for (const field of ['category', 'description', 'badge']) if (p[field] !== undefined && (typeof p[field] !== 'string' || p[field].length > 2000)) throw new Error(`Invalid ${field}.`)
      }
      await mkdir(directory, { recursive: true })
      const temporary = join(directory, `${randomUUID()}.tmp`)
      await writeFile(temporary, JSON.stringify(products, null, 2))
      await rename(temporary, catalogPath)
      return products
    },
    /** @brief Store a validated JPEG, PNG, or WebP data URL using a generated filename. */
    async upload(dataUrl) {
      const match = typeof dataUrl === 'string' && dataUrl.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/)
      if (!match) throw new Error('Choose a JPEG, PNG, or WebP image.')
      const bytes = Buffer.from(match[2], 'base64')
      const valid = match[1] === 'png' ? bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) : match[1] === 'jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
      if (!valid || bytes.length > 5 * 1024 * 1024) throw new Error('Invalid image or image larger than 5 MB.')
      const filename = `${randomUUID()}.${match[1] === 'jpeg' ? 'jpg' : match[1]}`
      await mkdir(join(directory, 'images'), { recursive: true })
      await writeFile(join(directory, 'images', filename), bytes)
      return `/local-images/${filename}`
    },
  }
}
