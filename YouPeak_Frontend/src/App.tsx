import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import HomePage from './pages/home/HomePage'
import CategoriesPage from './pages/categories/CategoriesPage'
import CategoryPage from './pages/categories/CategoryPage'
import SearchPage from './pages/search/SearchPage'
import ProductPage from './pages/product/ProductPage'
import WishlistPage from './pages/wishlist/WishlistPage'
import CartPage from './pages/cart/CartPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrderSuccessPage from './pages/checkout/OrderSuccessPage'
import OrdersPage from './pages/orders/OrdersPage'
import OrderDetailPage from './pages/orders/OrderDetailPage'
import TrackOrderPage from './pages/orders/TrackOrderPage'
import AccountPage from './pages/account/AccountPage'
import ProfilePage from './pages/account/ProfilePage'
import AddressesPage from './pages/account/AddressesPage'
import WalletPage from './pages/account/WalletPage'
import RewardsPage from './pages/account/RewardsPage'
import CouponsPage from './pages/account/CouponsPage'
import NotificationsPage from './pages/account/NotificationsPage'
import SupportPage from './pages/account/SupportPage'
import ReferralPage from './pages/account/ReferralPage'
import SettingsPage from './pages/account/SettingsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyPage from './pages/auth/VerifyPage'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main */}
          <Route path="/" element={<HomePage />} />

          {/* Categories */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* Search */}
          <Route path="/search" element={<SearchPage />} />

          {/* Product */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Commerce */}
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/address" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          {/* Orders */}
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/track-order/:id" element={<TrackOrderPage />} />

          {/* Account */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/addresses" element={<AddressesPage />} />
          <Route path="/account/wallet" element={<WalletPage />} />
          <Route path="/account/rewards" element={<RewardsPage />} />
          <Route path="/account/coupons" element={<CouponsPage />} />
          <Route path="/account/notifications" element={<NotificationsPage />} />
          <Route path="/account/support" element={<SupportPage />} />
          <Route path="/account/referral" element={<ReferralPage />} />
          <Route path="/account/settings" element={<SettingsPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
