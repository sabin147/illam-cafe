import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MenuPage from './pages/MenuPage'
import AdminPage from './pages/AdminPage'
import CartPage from './pages/CartPage'

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  })

  return (
    <CartProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/"      element={<MenuPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart"  element={<CartPage />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  )
}
