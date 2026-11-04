export interface Product {
  id: string
  name: string
  brand: string
  vendor: string
  vendorId: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  badge?: string
  inStock: boolean
  delivery: string
  sizes?: string[]
  colors?: string[]
  description: string
  soldCount?: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Address {
  id: string
  name: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pin: string
  type: 'Home' | 'Work' | 'Other'
  isDefault: boolean
}

export interface Order {
  id: string
  date: string
  status: string
  total: number
  items: number
  products: Product[]
  address: string
  payment: string
  expectedDelivery: string
}

export interface Vendor {
  id: string
  name: string
  logo: string
  rating: number
  products: number
  verified: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count: string
  image: string
}

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  category: string
  read: boolean
}

export interface WalletTransaction {
  id: string
  type: 'credit' | 'debit'
  description: string
  amount: number
  date: string
}

export interface Coupon {
  id: string
  code: string
  offer: string
  minOrder: number
  expiry: string
  type: 'available' | 'used' | 'expired'
  description: string
}

export interface User {
  name: string
  email: string
  phone: string
  avatar?: string
}
