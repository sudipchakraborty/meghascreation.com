import { ArrowRight } from 'lucide-react'

export function NewsletterSection() {
  const handleSubmit = (event) => event.preventDefault()
  return <section className="newsletter section" id="journal"><div><p className="eyebrow">Notes from the studio</p><h2>A little beauty<br />in your inbox.</h2></div><form onSubmit={handleSubmit}><p>New drops, behind-the-scenes stories, and 10% off your first order.</p><label><input type="email" placeholder="Your email address" aria-label="Email address" required /><button type="submit" aria-label="Subscribe"><ArrowRight /></button></label><small>By subscribing, you agree to receive lovely emails from us.</small></form></section>
}
