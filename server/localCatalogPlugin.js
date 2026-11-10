import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { createFileCatalog } from './fileCatalog.js'

/** @brief Local development HTTP adapter. @param directory Folder containing catalog and photos. */
export function localCatalogPlugin({ directory }) {
  const store = createFileCatalog({ directory })
  return {
    name: 'local-product-catalog',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0]
        if (!path?.startsWith('/api/catalog') && !path?.startsWith('/local-images/')) return next()
        const reply = (status, value) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(value)) }
        try {
          const remote = req.socket.remoteAddress
          if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)) return reply(403, { error: 'Local access only.' })
          if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}`) return reply(403, { error: 'Cross-origin access is disabled.' })
          if (path.startsWith('/local-images/')) {
            const name = path.slice('/local-images/'.length)
            if (req.method !== 'GET' || !/^[a-f0-9-]+\.(jpg|png|webp)$/.test(name)) return reply(404, { error: 'Image not found.' })
            const bytes = await readFile(join(directory, 'images', name))
            res.setHeader('Content-Type', `image/${name.endsWith('.jpg') ? 'jpeg' : name.split('.').pop()}`)
            res.setHeader('X-Content-Type-Options', 'nosniff')
            return res.end(bytes)
          }
          if (path === '/api/catalog' && req.method === 'GET') return reply(200, { products: await store.read() })
          if (!((path === '/api/catalog' && req.method === 'PUT') || (path === '/api/catalog/images' && req.method === 'POST'))) return reply(405, { error: 'Unsupported operation.' })
          if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'JSON is required.' })
          const chunks = []; let size = 0
          for await (const chunk of req) { size += chunk.length; if (size > 7 * 1024 * 1024) return reply(413, { error: 'Upload is too large (maximum image size: 5 MB).' }); chunks.push(chunk) }
          const data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          if (path.endsWith('/images')) return reply(200, { image: await store.upload(data.dataUrl) })
          return reply(200, { products: await store.save(data.products) })
        } catch (error) { reply(error.code === 'ENOENT' ? 404 : 400, { error: error.code ? 'Unable to access local storage. Check folder permissions.' : error.message }) }
      })
    },
  }
}
