import styles from './Footer.module.css'

const columns = [
  ['Navigation', ['Menu', 'Gallery', 'Visit', 'Admin']],
  ['Social', ['Instagram', 'Facebook', 'TikTok', 'Newsletter']],
  ['Locations', ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Events']]
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3>ILLAM CAFE</h3>
          <p>
            A luxury-focused coffee house shaped by slow brewing, editorial calm, and ingredients chosen with care.
          </p>
        </div>

        <div className={styles.columns}>
          {columns.map(([heading, links]) => (
            <div key={heading} className={styles.col}>
              <h4>{heading}</h4>
              {links.map((link) => (
                <a key={link} href={link === 'Admin' ? '/admin' : '/#menu'}>{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Illam Cafe. All rights reserved.</span>
        <div>
          <a href="/#privacy">Privacy</a>
          <a href="/#terms">Terms</a>
          <a href="/#cookies">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
