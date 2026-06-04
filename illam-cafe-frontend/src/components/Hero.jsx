import { useState } from 'react'
import styles from './Hero.module.css'

const heroImage = 'https://images.unsplash.com/photo-1495474472645-4d71bcdd2085?auto=format&fit=crop&w=1100&h=1400&q=85'

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={`${styles.copy} reveal-up`}>
        <p className="label">specialty coffee house</p>
        <h1 className={styles.title}>
          Slow coffee.
          <span>quiet luxury.</span>
          <em>illam</em>
        </h1>
        <p className={styles.subtitle}>
          A high-contrast cafe experience for single-origin coffee, ceremonial tea, and handmade pastries served with editorial precision.
        </p>
        <a href="#menu" className={styles.arrowCta}>
          Explore menu
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={`${styles.visual} reveal-up`}>
        <div className={styles.imageCard}>
          {!imageFailed ? (
            <img
              src={heroImage}
              alt="Illam Cafe barista preparing coffee"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={styles.fallbackArt} aria-label="Illam Cafe coffee bar illustration" role="img">
              <span className={styles.cup} />
              <span className={styles.saucer} />
              <span className={styles.steamOne} />
              <span className={styles.steamTwo} />
            </div>
          )}
        </div>
        <div className={styles.badge}>
          <strong>01</strong>
          <span>house roast</span>
        </div>
      </div>
    </section>
  )
}
