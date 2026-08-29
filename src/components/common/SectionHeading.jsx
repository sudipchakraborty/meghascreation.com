import { ArrowRight } from 'lucide-react'

export function SectionHeading({ eyebrow, title, linkLabel, linkHref }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{linkLabel && <a href={linkHref}>{linkLabel} <ArrowRight size={16} /></a>}</div>
}
