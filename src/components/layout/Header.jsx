import { useState } from 'react'
import { Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import { navigation } from '../../data/siteContent'
import { Logo } from '../common/Logo'

export function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <><div className="announcement">Free shipping across India on orders above ₹1,499 <Sparkles size={14} /></div><header><Logo /><nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">{navigation.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav><div className="header-actions"><button type="button" aria-label="Search"><Search size={20} /></button><button type="button" className="bag" aria-label={`Shopping bag with ${cartCount} items`}><ShoppingBag size={20} /><b>{cartCount}</b></button><button type="button" className="menu" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header></>
}
