import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, readdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createFileCatalog } from '../server/fileCatalog.js'

test('catalog survives reopening and supports empty catalogs', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'megha-'))
  try {
    const store = createFileCatalog({ directory })
    assert.equal(await store.read(), null)
    const product = { id: 'sample', name: 'Handmade basket', category: 'Baskets', price: 499, image: '/sample.jpg', visible: true }
    await store.save([product])
    assert.equal((await createFileCatalog({ directory }).read())[0].price, 499)
    await store.save([])
    assert.deepEqual(await store.read(), [])
    await assert.rejects(store.save([{ ...product, price: -1 }]), /price/i)
    await assert.rejects(store.save([{ ...product, name: ' ' }]), /name/i)
    assert.deepEqual(await store.read(), [])
  } finally { await rm(directory, { recursive: true, force: true }) }
})

test('uploads validate image content and use generated filenames', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'megha-'))
  try {
    const store = createFileCatalog({ directory })
    await assert.rejects(store.upload('data:image/png;base64,' + Buffer.from('not an image').toString('base64')), /image/i)
    const url = await store.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=')
    assert.match(url, /^\/local-images\/[a-f0-9-]+\.png$/)
    assert.equal((await readdir(join(directory, 'images'))).length, 1)
  } finally { await rm(directory, { recursive: true, force: true }) }
})
