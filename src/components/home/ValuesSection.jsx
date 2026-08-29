import { craftValues } from '../../data/siteContent'

export function ValuesSection() {
  return <section className="values section">{craftValues.map((value) => <article key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.copy}</p></article>)}</section>
}
