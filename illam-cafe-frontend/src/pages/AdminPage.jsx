import { useState, useEffect } from 'react'
import { productsApi } from '../api/products'
import ProductForm from '../components/ProductForm'
import styles from './AdminPage.module.css'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const load = () => {
    setLoading(true)
    productsApi.getAll()
      .then(setProducts)
      .catch(() => setError('Could not reach the API.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSave = async (data) => {
    if (editing) {
      await productsApi.update(editing.id, data)
    } else {
      await productsApi.create(data)
    }
    setShowForm(false)
    setEditing(null)
    load()
  }

  const handleEdit = (product) => {
    setEditing(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await productsApi.remove(id)
    setDeleteId(null)
    load()
  }

  const openAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const coffeeCount = products.filter((p) => p.category === 'Coffee').length
  const teaCount    = products.filter((p) => p.category === 'Tea').length
  const availCount  = products.filter((p) => p.isAvailable).length

  return (
    <main className={styles.page}>
      {/* ── Header ─────────────────────────────── */}
      <header className={styles.header}>
        <div>
          <p className="label" style={{ marginBottom: 10 }}>management</p>
          <h1 className={styles.heading}>Product <em>Catalogue</em></h1>
        </div>
        <button className={styles.addBtn} onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Product
        </button>
      </header>

      {/* ── Stats ──────────────────────────────── */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={`${styles.statLabel} label`}>Total products</span>
          <span className={styles.statVal}>{products.length}</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statLabel} label`}>Available</span>
          <span className={styles.statVal}>{availCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statLabel} label`}>Coffee</span>
          <span className={styles.statVal}>{coffeeCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statLabel} label`}>Tea</span>
          <span className={styles.statVal}>{teaCount}</span>
        </div>
      </div>

      {/* ── Table ──────────────────────────────── */}
      <div className={styles.tableWrap}>
        {loading && (
          <div className={styles.stateRow}>
            <span className="label">Loading…</span>
          </div>
        )}

        {error && (
          <div className={styles.stateRow}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th} style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className={styles.tr}>
                  <td className={styles.tdName}>{p.name}</td>
                  <td className={styles.td}>
                    <span className={`${styles.catPill} ${p.category === 'Tea' ? styles.tea : styles.coffee}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className={styles.tdPrice}>£{Number(p.price).toFixed(2)}</td>
                  <td className={styles.tdDesc}>{p.description || '—'}</td>
                  <td className={styles.td}>
                    <span className={`${styles.statusPill} ${p.isAvailable ? styles.available : styles.unavailable}`}>
                      {p.isAvailable ? 'Available' : 'Sold out'}
                    </span>
                  </td>
                  <td className={styles.tdActions}>
                    <button className={styles.actionEdit} onClick={() => handleEdit(p)}>
                      Edit
                    </button>
                    <button className={styles.actionDelete} onClick={() => setDeleteId(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.empty}>
                    No products yet. Add your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Product form modal ─────────────────── */}
      {showForm && (
        <ProductForm
          editing={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
        />
      )}

      {/* ── Delete confirmation ────────────────── */}
      {deleteId !== null && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <h3 className={styles.confirmTitle}>
              <em>Delete</em> this product?
            </h3>
            <p className={styles.confirmSub}>This action cannot be undone.</p>
            <div className={styles.confirmActions}>
              <button className={styles.btnCancel} onClick={() => setDeleteId(null)}>
                Keep it
              </button>
              <button className={styles.btnConfirm} onClick={() => handleDelete(deleteId)}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
