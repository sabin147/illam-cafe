import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const { cartItems } = useCart()
  const cartCount = cartItems.length

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        ILLAM CAFE
      </Link>

      <ul className={styles.links}>
        <li><a href="/#services">Service</a></li>
        <li><a href="/#menu">Menu</a></li>
        <li><a href="/#gallery">Gallery</a></li>
        <li><Link to="/admin" className={pathname === '/admin' ? styles.active : ''}>Admin</Link></li>
      </ul>

      <div className={styles.rightSection}>
        <Link to="/cart" className={`${styles.cartBtn} ${cartCount > 0 ? styles.hasItems : ''}`}>
          Cart
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount}</span>
          )}
        </Link>
        <Link to="/admin" className={styles.cta}>
          Reserve
        </Link>
      </div>
    </nav>
  )
}
