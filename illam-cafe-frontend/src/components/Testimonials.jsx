import styles from './Testimonials.module.css'

const notes = [
  ['10K+', 'cups served with detail'],
  ['15', 'rotating coffee and tea rituals'],
  ['98%', 'guest satisfaction']
]

export default function Testimonials() {
  return (
    <section className={styles.experience}>
      <div className={`${styles.quoteBlock} reveal-up`}>
        <p className="label">guest notes</p>
        <blockquote>
          "Illam feels designed for people who notice the small things: the cup weight, the quiet room, the exact finish of the espresso."
        </blockquote>
        <cite>Sarah Chen • daily guest</cite>
      </div>

      <div className={styles.stats}>
        {notes.map(([number, label]) => (
          <div key={label} className={`${styles.stat} reveal-up`}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
