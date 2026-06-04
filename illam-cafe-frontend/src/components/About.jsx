import styles from './About.module.css'

const cases = [
  {
    category: 'espresso',
    title: 'Single Origin Bar',
    meta: 'Washed arabica • Citrus finish',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&h=1200&fit=crop&auto=format'
  },
  {
    category: 'interior',
    title: 'Quiet Table Rituals',
    meta: 'Morning light • Soft service',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&h=1200&fit=crop&auto=format'
  },
  {
    category: 'bakery',
    title: 'Daily Pastry Edit',
    meta: 'Butter layers • Small batches',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&h=1200&fit=crop&auto=format'
  },
  {
    category: 'tea',
    title: 'Ceremonial Pour',
    meta: 'Whole leaf • Slow steep',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&h=1200&fit=crop&auto=format'
  }
]

export default function About() {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className={`${styles.intro} reveal-up`}>
        <p className="label">portfolio</p>
        <h2>Moments worth staying for.</h2>
      </div>

      <div className={styles.grid}>
        {cases.map((item) => (
          <article key={item.title} className={`${styles.item} reveal-up`}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} />
              <span className={styles.view}>View Case</span>
            </div>
            <p className={styles.category}>{item.category}</p>
            <h3>{item.title}</h3>
            <p className={styles.meta}>{item.meta}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
