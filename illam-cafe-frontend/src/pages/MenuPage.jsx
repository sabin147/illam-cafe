import { useState, useEffect } from 'react'
import { productsApi } from '../api/products'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Testimonials from '../components/Testimonials'
import About from '../components/About'
import Location from '../components/Location'
import styles from './MenuPage.module.css'

const fallbackProducts = [
  {
    id: 'demo-espresso',
    name: 'Rose Crema Espresso',
    category: 'Coffee',
    price: 4.8,
    description: 'A bright single-origin shot with cocoa, citrus, and a polished crema.',
    isAvailable: true,
  },
  {
    id: 'demo-latte',
    name: 'Velvet Oat Latte',
    category: 'Coffee',
    price: 5.6,
    description: 'Double espresso folded into steamed oat milk with a satin finish.',
    isAvailable: true,
  },
  {
    id: 'demo-pourover',
    name: 'Editorial Pour Over',
    category: 'Coffee',
    price: 6.2,
    description: 'Slow-brewed filter coffee selected from the house origin board.',
    isAvailable: true,
  },
  {
    id: 'demo-matcha',
    name: 'Dusty Rose Matcha',
    category: 'Tea',
    price: 5.9,
    description: 'Ceremonial matcha with vanilla milk and a soft floral finish.',
    isAvailable: true,
  },
  {
    id: 'demo-milk-tea',
    name: 'Charcoal Milk Tea',
    category: 'Tea',
    price: 5.4,
    description: 'Black tea, slow milk, and a subtle caramel note over clear ice.',
    isAvailable: true,
  },
  {
    id: 'demo-jasmine',
    name: 'Jasmine Reserve',
    category: 'Tea',
    price: 4.9,
    description: 'Whole-leaf jasmine green tea steeped light and fragrant.',
    isAvailable: true,
  },
]

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [filter, setFilter]     = useState('All')

  useEffect(() => {
    productsApi.getAll()
      .then((data) => {
        const availableProducts = Array.isArray(data)
          ? data.filter((p) => p.isAvailable)
          : []

        setProducts(availableProducts.length > 0 ? availableProducts : fallbackProducts)
      })
      .catch(() => {
        setProducts(fallbackProducts)
        setError('')
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', 'Coffee', 'Tea']
  const visible = filter === 'All' ? products : products.filter((p) => p.category === filter)

  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <Hero />

      {/* ── Featured Products ────────────────────── */}
      <FeaturedProducts />

      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <p className="label">browse by ritual</p>
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className={styles.menuSection}>
        <div className={`${styles.menuHeader} reveal-up`}>
          <p className="label">complete selection</p>
          <h2 className={styles.sectionTitle}>Cafe Menu</h2>
        </div>

        {loading && (
          <div className={styles.state}>
            <span className={`${styles.stateText} label`}>Brewing…</span>
          </div>
        )}

        {error && (
          <div className={styles.state}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {!loading && !error && visible.length === 0 && (
          <div className={styles.state}>
            <p className={styles.emptyText}>No items in this category.</p>
          </div>
        )}

        {!loading && !error && visible.length > 0 && (
          <div className={styles.grid}>
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── About Section ────────────────────────── */}
      <About />

      {/* ── Testimonials Section ─────────────────── */}
      <Testimonials />

      {/* ── Location Section ─────────────────────── */}
      <Location />
    </main>
  )
}
