import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { ordersApi } from '../api/orders'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()
  const [isPlacing, setIsPlacing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [error, setError] = useState('')

  const total = getTotalPrice()

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty')
      return
    }

    try {
      setIsPlacing(true)
      setError('')

      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }

      await ordersApi.create(orderData)
      setOrderSuccess(true)
      clearCart()
      setTimeout(() => setOrderSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsPlacing(false)
    }
  }

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <main className={styles.container}>
        <div className={styles.emptyState}>
          <h2>Your cart is empty</h2>
          <p>Add some items from the menu to get started!</p>
          <a href="/" className={styles.continueBtn}>Continue Shopping</a>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      {orderSuccess && (
        <div className={styles.successMessage}>
          ✓ Order placed successfully! Thank you for your order.
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          ✕ {error}
        </div>
      )}

      <div className={styles.header}>
        <h1>Order Summary</h1>
        <p className={styles.itemCount}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
      </div>

      <div className={styles.content}>
        {/* ── Cart Items ──────────────────────────── */}
        <section className={styles.itemsSection}>
          <h2 className={styles.sectionTitle}>Your Items</h2>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <div key={item.product.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <p className={styles.itemCategory}>{item.product.category}</p>
                  <p className={styles.itemPrice}>
                    £{Number(item.product.price).toFixed(2)} each
                  </p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Order Summary ──────────────────────── */}
        <aside className={styles.summarySection}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Order Total</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax (0%)</span>
              <span>£0.00</span>
            </div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span className={styles.totalPrice}>£{total.toFixed(2)}</span>
            </div>

            <button
              className={styles.placeOrderBtn}
              onClick={handlePlaceOrder}
              disabled={isPlacing || cartItems.length === 0}
            >
              {isPlacing ? 'Placing Order...' : 'Place Order'}
            </button>

            <a href="/" className={styles.continueShoppingBtn}>
              Continue Shopping
            </a>
          </div>
        </aside>
      </div>
    </main>
  )
}
