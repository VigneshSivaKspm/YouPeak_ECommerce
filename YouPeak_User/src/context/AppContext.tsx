import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product, CartItem, User } from '../types'

interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface AppContextType {
  cart: CartItem[]
  wishlist: Product[]
  isLoggedIn: boolean
  user: User | null
  toasts: ToastMessage[]
  addToCart: (product: Product, qty?: number, size?: string, color?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  cartCount: number
  cartTotal: number
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  removeToast: (id: string) => void
  login: () => void
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user] = useState<User>({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
  })
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToCart = useCallback((product: Product, qty = 1, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { product, quantity: qty, selectedSize: size, selectedColor: color }]
    })
    showToast('Added to cart successfully!', 'success')
  }, [showToast])

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
    showToast('Removed from cart', 'info')
  }, [showToast])

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }, [])

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        showToast('Removed from wishlist', 'info')
        return prev.filter(p => p.id !== product.id)
      }
      showToast('Added to wishlist!', 'success')
      return [...prev, product]
    })
  }, [showToast])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(p => p.id === productId)
  }, [wishlist])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <AppContext.Provider value={{
      cart, wishlist, isLoggedIn, user, toasts,
      addToCart, removeFromCart, updateQuantity,
      toggleWishlist, isInWishlist,
      cartCount, cartTotal,
      showToast, removeToast,
      login: () => setIsLoggedIn(true),
      logout: () => setIsLoggedIn(false),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
