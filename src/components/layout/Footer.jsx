import { footerGroups } from '../../data/siteContent'
import { Logo } from '../common/Logo'

export function Footer() {
  return <footer id="contact"><div className="footer-main"><div><Logo /><p>Made by hand. Chosen by heart.<br />Created in India.</p></div>{footerGroups.map((group) => <div key={group.title}><h4>{group.title}</h4>{group.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>)}<div><h4>Follow along</h4><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><p>@meghascreation</p></div></div><div className="footer-bottom"><span>© 2026 Megha’s Creation</span><span>Privacy · Terms</span><span>Crafted with ♡</span></div></footer>
}
