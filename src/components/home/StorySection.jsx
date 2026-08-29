import { ArrowRight } from 'lucide-react'
import heroImage from '../../assets/images/hero-handmade.png'

export function StorySection() {
  return <section className="story section" id="story"><div className="story-visual"><img src={heroImage} alt="Handcrafted home goods in the studio" loading="lazy" /><div className="scribble">made<br />slowly ♡</div></div><div className="story-copy"><p className="eyebrow">Behind every piece</p><h2>From Megha’s hands<br />to <em>your home.</em></h2><p>What started as quiet evenings spent making gifts for loved ones grew into a little studio filled with thread, clay, colour, and possibility.</p><p>Today, every Megha’s Creation piece is still made with that same personal care — because your home deserves objects with a story.</p><a className="text-link" href="#journal">Meet the maker <ArrowRight size={16} /></a></div></section>
}
