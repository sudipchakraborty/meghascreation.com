import { useState } from 'react'
import { ArrowRight, Heart, Menu, PackageCheck, Search, ShoppingBag, Sparkles, X } from 'lucide-react'

const products = [
  { name: 'Blush Knot Wall Hanging', category: 'Macramé', price: '₹1,290', image: '/images/macrame.jpg', tone: 'rose' },
  { name: 'Morning Bloom Candle', category: 'Home fragrance', price: '₹649', image: '/images/candle.jpg', tone: 'cream' },
  { name: 'Earth Song Vase', category: 'Ceramics', price: '₹1,490', image: '/images/vase.jpg', tone: 'sage' },
  { name: 'Handwoven Keepsake Basket', category: 'Storage', price: '₹890', image: '/images/basket.jpg', tone: 'sand' },
]

const stories = [
  ['01', 'Designed slowly', 'Every piece begins with a sketch, a feeling, and thoughtful hands.'],
  ['02', 'Made in small batches', 'Less waste, more care, and charming differences that make yours unique.'],
  ['03', 'Packed with love', 'Plastic-light packaging, ready to gift or make your own day brighter.'],
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Megha's Creation home"><span>MC</span><div>Megha’s<small>CREATION</small></div></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [liked, setLiked] = useState([])

  const toggleLike = (name) => setLiked((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name])
  const closeMenu = () => setMenuOpen(false)

  return (
    <div id="top">
      <div className="announcement">Free shipping across India on orders above ₹1,499 <Sparkles size={14} /></div>
      <header>
        <Logo />
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#shop" onClick={closeMenu}>Shop</a>
          <a href="#story" onClick={closeMenu}>Our story</a>
          <a href="#journal" onClick={closeMenu}>Journal</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search"><Search size={20} /></button>
          <button className="bag" aria-label="Shopping bag"><ShoppingBag size={20} /><b>0</b></button>
          <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <img src="/images/hero-handmade.png" alt="A curated collection of handmade decor" />
          <div className="hero-copy">
            <p className="eyebrow">Handmade · Heartmade</p>
            <h1>Little things,<br /><em>beautifully made.</em></h1>
            <p className="hero-text">Thoughtful decor and gifts, crafted in small batches to bring warmth, texture, and a little more joy into your everyday.</p>
            <a className="button primary" href="#shop">Explore the collection <ArrowRight size={17} /></a>
            <div className="hero-note"><span><PackageCheck size={18} /> Securely packed</span><span><Heart size={18} /> Made in India</span></div>
          </div>
          <div className="hero-tag"><span>100%</span> handmade<br />with care</div>
        </section>

        <section className="marquee" aria-label="Our values"><span>Small batch</span> ✦ <span>Made with love</span> ✦ <span>Natural materials</span> ✦ <span>One of a kind</span> ✦ <span>Small batch</span></section>

        <section className="collection section" id="shop">
          <div className="section-heading">
            <div><p className="eyebrow">Just for you</p><h2>Fresh from the studio</h2></div>
            <a href="#all-products">View all pieces <ArrowRight size={16} /></a>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className={`product-card ${product.tone}`} key={product.name}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {index === 0 && <span className="badge">Bestseller</span>}
                  <button className={liked.includes(product.name) ? 'liked' : ''} onClick={() => toggleLike(product.name)} aria-label={`Like ${product.name}`}><Heart size={19} fill={liked.includes(product.name) ? 'currentColor' : 'none'} /></button>
                </div>
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <div className="product-bottom"><strong>{product.price}</strong><button aria-label={`Add ${product.name} to bag`}><ShoppingBag size={17} /></button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="story section" id="story">
          <div className="story-visual">
            <img src="/images/hero-handmade.png" alt="Handcrafted home goods in the studio" />
            <div className="scribble">made<br />slowly ♡</div>
          </div>
          <div className="story-copy">
            <p className="eyebrow">Behind every piece</p>
            <h2>From Megha’s hands<br />to <em>your home.</em></h2>
            <p>What started as quiet evenings spent making gifts for loved ones grew into a little studio filled with thread, clay, colour, and possibility.</p>
            <p>Today, every Megha’s Creation piece is still made with that same personal care — because your home deserves objects with a story.</p>
            <a className="text-link" href="#journal">Meet the maker <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="values section">
          {stories.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </section>

        <section className="newsletter section" id="journal">
          <div><p className="eyebrow">Notes from the studio</p><h2>A little beauty<br />in your inbox.</h2></div>
          <form onSubmit={(event) => event.preventDefault()}>
            <p>New drops, behind-the-scenes stories, and 10% off your first order.</p>
            <label><input type="email" placeholder="Your email address" aria-label="Email address" required /><button aria-label="Subscribe"><ArrowRight /></button></label>
            <small>By subscribing, you agree to receive lovely emails from us.</small>
          </form>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-main"><div><Logo /><p>Made by hand. Chosen by heart.<br />Created in India.</p></div><div><h4>Explore</h4><a href="#shop">Shop all</a><a href="#story">Our story</a><a href="#journal">Journal</a></div><div><h4>Help</h4><a href="mailto:hello@meghascreation.com">Contact</a><a href="#shipping">Shipping & returns</a><a href="#care">Care guide</a></div><div><h4>Follow along</h4><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><p>@meghascreation</p></div></div>
        <div className="footer-bottom"><span>© 2026 Megha’s Creation</span><span>Privacy · Terms</span><span>Crafted with ♡</span></div>
      </footer>
    </div>
  )
}

export default App
