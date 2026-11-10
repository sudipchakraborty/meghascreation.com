import { useRef, useState } from 'react'
import { useCatalog } from '../context/CatalogContext'
import { formatCurrency } from '../utils/currency'
import '../assets/styles/manager.css'

const blank = () => ({ id: '', name: '', category: '', description: '', price: '', image: '', badge: '', visible: true, tone: 'cream' })

/** @brief Local owner editor; persistence is supplied by CatalogProvider. */
export function ProductManager() {
  const { products, loading, error: loadError, save, upload } = useCatalog()
  const [draft, setDraft] = useState(blank)
  const [photo, setPhoto] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const fileInput = useRef(null)
  const editor = useRef(null)
  function reset(product = blank()) { setDraft({ ...product }); setPhoto(''); setError(''); if (fileInput.current) fileInput.current.value = '' }
  function change(event) { const { name, value, type, checked } = event.target; setDraft((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value })); setMessage('') }
  async function choosePhoto(event) {
    const file = event.target.files[0]
    if (!file) return
    setError(''); setBusy(true)
    try {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Choose a JPEG, PNG, or WebP photo smaller than 5 MB.')
      const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('Unable to read photo.')); reader.readAsDataURL(file) })
      await new Promise((resolve, reject) => { const image = new Image(); image.onload = resolve; image.onerror = () => reject(new Error('This image cannot be opened. Please choose another photo.')); image.src = dataUrl })
      setPhoto(dataUrl)
    } catch (e) { setError(e.message); event.target.value = '' }
    finally { setBusy(false) }
  }
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('')
    try {
      if (!photo && !draft.image) throw new Error('Please choose a product photo.')
      const price = Number(draft.price)
      if (!draft.name.trim() || !Number.isFinite(price) || price <= 0) throw new Error('Enter a product name and a price greater than zero.')
      const image = photo ? await upload(photo) : draft.image
      const product = { ...draft, id: draft.id || crypto.randomUUID(), name: draft.name.trim(), price, image }
      const exists = products.some((p) => p.id === product.id)
      await save(exists ? products.map((p) => p.id === product.id ? product : p) : [...products, product])
      reset(); setMessage('Product saved to your local folder. The local shop has been updated.')
    } catch (e) { setError(e.message) }
    finally { setBusy(false) }
  }
  return <main className="manager"><a href="#shop">← Back to shop</a><p className="eyebrow">Megha’s Creation · Local trial</p><h1>Manage products</h1><p>Add a photo, enter a price, and save. No code editing needed.</p><p className="manager-note">Saved on this computer in <strong>local-data</strong>. These changes do not update the live website. Back up that folder to keep your products and photos safe.</p>
    {loading && <p role="status">Loading your products…</p>}{loadError && <p role="alert">{loadError} Reload this page before editing.</p>}{message && <p role="status" className="manager-success">{message}</p>}
    <div className="manager-layout"><section ref={editor}><h2>{draft.id ? 'Edit product' : 'Add a new product'}</h2><form onSubmit={submit}><fieldset disabled={busy || loading || !!loadError}>
      <label>Product photo<input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} /></label><small>JPEG, PNG, or WebP, up to 5 MB. Existing photos stay unless you choose a replacement.</small>
      {(photo || draft.image) && <img className="manager-preview" src={photo || draft.image} alt="Product photo preview" />}
      <label>Product name<input required maxLength={120} name="name" value={draft.name} onChange={change} placeholder="e.g. Handmade floral bracelet" /></label>
      <label>Price (₹)<input required type="number" min="0.01" max="10000000" step="0.01" name="price" value={draft.price} onChange={change} /></label>
      <label>Category<input name="category" maxLength={120} value={draft.category} onChange={change} placeholder="e.g. Jewellery" /></label>
      <label>Description<textarea name="description" maxLength={2000} rows={3} value={draft.description || ''} onChange={change} /></label>
      <label>Label (optional)<input name="badge" maxLength={40} value={draft.badge || ''} onChange={change} placeholder="e.g. New or Bestseller" /></label>
      <label className="manager-check"><input name="visible" type="checkbox" checked={draft.visible !== false} onChange={change} />Show in shop (uncheck for sold or unavailable items)</label>
      {error && <p role="alert" className="manager-error">{error}</p>}<div className="manager-actions"><button className="button primary" type="submit">{busy ? 'Please wait…' : 'Save product'}</button><button type="button" onClick={() => reset()}>Clear / cancel</button></div>
    </fieldset></form></section><section><h2>Your products ({products.length})</h2>{!loading && !products.length && <p>No products yet. Add your first handmade piece.</p>}<div className="manager-products">{products.map((p) => <article key={p.id}><img src={p.image} alt={p.name} /><div><strong>{p.name}</strong><p>{formatCurrency(p.price)} · {p.visible === false ? 'Hidden' : 'Visible in shop'}</p></div><button disabled={busy || loading || !!loadError} onClick={() => { reset(p); setMessage(''); editor.current?.scrollIntoView({ behavior: 'smooth' }) }}>Edit<span className="sr-only"> {p.name}</span></button></article>)}</div></section></div>
  </main>
}
