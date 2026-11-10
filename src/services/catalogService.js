/** @brief Create a replaceable catalog transport. @param baseUrl API endpoint for catalog storage. */
export function createCatalogService({ baseUrl = '/api/catalog' } = {}) {
  async function request(path, method = 'GET', data) {
    const response = await fetch(`${baseUrl}${path}`, { method, headers: { 'Content-Type': 'application/json' }, body: data ? JSON.stringify(data) : undefined })
    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Product management requires the local server. Run npm run dev.')
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Unable to save. Please try again.')
    return result
  }
  return {
    read: async () => (await request('')).products,
    save: async (products) => (await request('', 'PUT', { products })).products,
    upload: async (dataUrl) => (await request('/images', 'POST', { dataUrl })).image,
  }
}
