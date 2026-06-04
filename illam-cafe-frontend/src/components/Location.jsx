import styles from './Location.module.css'

const details = [
  ['Location', 'Coffee District, Kathmandu'],
  ['Hours', 'Mon-Fri 7:00-20:00 • Weekend 8:00-21:00'],
  ['Contact', 'hello@illamcafe.com • +977 1 234 5678']
]

export default function Location() {
  return (
    <section id="visit" className={styles.location}>
      <div className={`${styles.panel} reveal-up`}>
        <div className={styles.copy}>
          <p className="label">visit</p>
          <h2>Reserve the quiet table.</h2>
          <p>
            Come for a slow espresso, stay for the room: warm off-white walls, charcoal details, and a bar designed for focus.
          </p>
          <a href="mailto:hello@illamcafe.com" className={styles.cta}>Book a table</a>
        </div>

        <div className={styles.details}>
          {details.map(([title, text]) => (
            <div key={title} className={styles.detail}>
              <span>{title}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
