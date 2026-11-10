import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'vite'
import { localCatalogPlugin } from '../server/localCatalogPlugin.js'

test('local API uploads photos, saves Unicode products and rejects cross-origin writes', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'megha-api-'))
  const server = await createServer({ configFile: false, plugins: [localCatalogPlugin({ directory })], server: { host: '127.0.0.1', port: 0 } })
  try {
    await server.listen()
    const base = `http://127.0.0.1:${server.httpServer.address().port}`
    const request = (path, method, data, headers = {}) => fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) })
    assert.deepEqual(await (await fetch(base + '/api/catalog')).json(), { products: null })
    const upload = await request('/api/catalog/images', 'POST', { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=' })
    assert.equal(upload.status, 200)
    const { image } = await upload.json()
    const photo = await fetch(base + image)
    assert.equal(photo.headers.get('content-type'), 'image/png')
    const products = [{ id: 'test', name: 'Megha’s creation 🌸', category: 'হাতের কাজ', price: 199.5, image, visible: false }]
    assert.equal((await request('/api/catalog', 'PUT', { products })).status, 200)
    assert.deepEqual((await (await fetch(base + '/api/catalog')).json()).products, products)
    assert.equal((await request('/api/catalog', 'PUT', { products: [] }, { Origin: 'https://other.example' })).status, 403)
    assert.equal((await request('/api/catalog', 'PUT', { products: [{ ...products[0], price: 1.234 }] })).status, 400)
    assert.deepEqual((await (await fetch(base + '/api/catalog')).json()).products, products)
  } finally { await server.close(); await rm(directory, { recursive: true, force: true }) }
})
