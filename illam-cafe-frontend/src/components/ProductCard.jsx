import { useState } from 'react'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

const ICONS = {
  Coffee: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  Tea: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  ),
}

const IMAGES = [
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=900&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=900&h=700&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&h=700&fit=crop&auto=format',
]

export default function ProductCard({ product, index }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const image = IMAGES[index % IMAGES.length]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setQuantity(1)
    }, 1500)
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={product.name} className={styles.productImage} />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.icon}>
            {ICONS[product.category] ?? ICONS.Coffee}
          </div>
          <span className={styles.index}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className={styles.body}>
          <p className={`${styles.cat} label`}>{product.category}</p>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.desc}>{product.description || 'A carefully crafted cup.'}</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>
            £ {Number(product.price).toFixed(2)}
          </span>
          <span className={`${styles.badge} ${product.isAvailable ? styles.available : styles.unavailable}`}>
            {product.isAvailable ? 'Available' : 'Sold out'}
          </span>
        </div>

        {product.isAvailable && (
          <div className={styles.cartControls}>
            <div className={styles.quantitySelector}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className={styles.qtyDisplay}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className={`${styles.addBtn} ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
