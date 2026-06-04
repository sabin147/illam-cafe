import styles from './FeaturedProducts.module.css'

const services = [
  {
    icon: '01',
    title: 'Origin Bar',
    text: 'Rotating single-origin espresso, pour-over flights, and tasting notes served with exacting bar craft.'
  },
  {
    icon: '02',
    title: 'Tea Ceremony',
    text: 'Whole-leaf teas, matcha, and milk tea rituals prepared slowly for focused afternoon pauses.'
  },
  {
    icon: '03',
    title: 'Table Atelier',
    text: 'Reserved seating, pastry pairings, and quiet hosting for meetings, dates, and weekend rituals.'
  }
]

export default function FeaturedProducts() {
  return (
    <section id="services" className={styles.services}>
      <div className={`${styles.header} reveal-up`}>
        <p className="label">house service</p>
        <h2>Crafted for the pause.</h2>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <article key={service.title} className={`${styles.card} reveal-up`}>
            <span className={styles.icon}>{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
