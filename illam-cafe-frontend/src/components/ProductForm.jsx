import { useState, useEffect } from 'react'
import styles from './ProductForm.module.css'

const EMPTY = {
  name: '',
  category: 'Coffee',
  price: '',
  description: '',
  isAvailable: true,
}

export default function ProductForm({ onSave, onCancel, editing }) {
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(editing ? { ...editing } : EMPTY)
    setError('')
  }, [editing])

  const set = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked
      : e.target.type === 'number' ? e.target.value
      : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onSave({ ...form, price: parseFloat(form.price) })
      setForm(EMPTY)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editing ? <><em>Edit</em> product</> : <>Add <em>new</em> product</>}
          </h2>
          <button className={styles.close} onClick={onCancel} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={`${styles.label} label`}>Product name</label>
            <input
              type="text"
              placeholder="e.g. Oat Flat White"
              value={form.name}
              onChange={set('name')}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={`${styles.label} label`}>Category</label>
              <select value={form.category} onChange={set('category')}>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={`${styles.label} label`}>Price (£)</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={form.price}
                onChange={set('price')}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={`${styles.label} label`}>Description</label>
            <textarea
              placeholder="A brief description of the product…"
              value={form.description}
              onChange={set('description')}
              rows={3}
            />
          </div>

          <div className={styles.toggle}>
            <label className={styles.toggleLabel}>
              <div className={`${styles.toggleSwitch} ${form.isAvailable ? styles.on : ''}`}>
                <div className={styles.toggleThumb} />
              </div>
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={set('isAvailable')}
                style={{ display: 'none' }}
              />
              <span className={`${styles.toggleText} label`}>
                {form.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className={styles.btnSecondary} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving…' : editing ? 'Update product' : 'Add product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
