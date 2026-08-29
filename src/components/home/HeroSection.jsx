import { ArrowRight, Heart, PackageCheck } from 'lucide-react'
import heroImage from '../../assets/Landing Page Image/Main image.jpeg'

export function HeroSection() {
  return <><section className="hero"><img src={heroImage} alt="Megha, founder of Megha's Creation" /><div className="hero-copy"><p className="eyebrow">Handmade · Heartmade</p><h1>Little things,<br /><em>beautifully made.</em></h1><p className="hero-text">Thoughtful decor and gifts, crafted in small batches to bring warmth, texture, and a little more joy into your everyday.</p><a className="button primary" href="#shop">Explore the collection <ArrowRight size={17} /></a><div className="hero-note"><span><PackageCheck size={18} /> Securely packed</span><span><Heart size={18} /> Made in India</span></div></div><div className="hero-tag"><span>100%</span> handmade<br />with care</div></section><section className="marquee" aria-label="Our values"><span>Small batch</span> ✦ <span>Made with love</span> ✦ <span>Natural materials</span> ✦ <span>One of a kind</span> ✦ <span>Small batch</span></section></>
}
