import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import BottomSheet from '../../components/common/BottomSheet'
import EmptyState from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'
import { TrashIcon, HeartIcon, TagIcon } from '../../components/common/Icons'
import { mockCoupons } from '../../data/mockData'

function QuantityControl({ productId, quantity }: { productId: string; quantity: number }) {
  const { updateQuantity } = useApp()
  return (
    <div className="flex items-center border border-[#E6EBE8] rounded-lg overflow-hidden">
      <button
        onClick={() => updateQuantity(productId, -1)}
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-gray-50 transition-colors font-bold text-lg"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold text-text-primary">{quantity}</span>
      <button
        onClick={() => updateQuantity(productId, 1)}
        className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-gray-50 transition-colors font-bold text-lg"
      >
        +
      </button>
    </div>
  )
}

export default function CartPage() {
  const { cart, removeFromCart, toggleWishlist, cartTotal, showToast } = useApp()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)
  const [showCoupons, setShowCoupons] = useState(false)

  const delivery = cartTotal >= 499 ? 0 : 40
  const tax = Math.round(cartTotal * 0.05)
  const couponDiscount = appliedCoupon ? discount : 0
  const total = cartTotal + delivery + tax - couponDiscount

  const applyCoupon = (code: string) => {
    const coupon = mockCoupons.find(c => c.code === code.toUpperCase() && c.type === 'available')
    if (coupon) {
      if (cartTotal >= coupon.minOrder) {
        setAppliedCoupon(coupon.code)
        setDiscount(200)
        showToast(`Coupon ${coupon.code} applied! ₹200 saved`, 'success')
        setShowCoupons(false)
      } else {
        showToast(`Minimum order ₹${coupon.minOrder} required`, 'error')
      }
    } else {
      showToast('Invalid or expired coupon code', 'error')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setDiscount(0)
    setCouponCode('')
    showToast('Coupon removed', 'info')
  }

  // Group by vendor
  const vendorGroups = cart.reduce<Record<string, typeof cart>>((acc, item) => {
    const key = item.product.vendor
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  if (cart.length === 0) {
    return (
      <MainLayout hideMobileHeader>
        <MobilePageHeader title="Shopping Cart" />
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Looks like you haven't added anything yet"
          actionLabel="Start Shopping"
          actionTo="/"
        />
      </MainLayout>
    )
  }

  return (
    <MainLayout hideBottomNav hideMobileHeader>
      <MobilePageHeader title={`Cart (${cart.length})`} />
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:block mb-5">
          <h1 className="text-2xl font-bold text-text-primary">Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Cart items - left */}
          <div className="flex-1 space-y-4">
            {Object.entries(vendorGroups).map(([vendor, items]) => (
              <div key={vendor} className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
                  <span className="text-sm font-semibold text-text-primary">Seller: {vendor}</span>
                  <span className="text-xs text-green bg-green-light px-1.5 py-0.5 rounded-full ml-auto">Verified</span>
                </div>
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3 p-4 border-b border-[#E6EBE8] last:border-0">
                    <Link to={`/product/${item.product.id}`} className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-0.5 hover:text-green">{item.product.name}</h3>
                      </Link>
                      {item.selectedSize && <p className="text-xs text-text-secondary">Size: {item.selectedSize}</p>}
                      {item.selectedColor && <p className="text-xs text-text-secondary">Color: {item.selectedColor}</p>}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-sm font-bold text-text-primary">₹{item.product.price.toLocaleString()}</span>
                        <span className="text-xs text-text-secondary line-through">₹{item.product.originalPrice.toLocaleString()}</span>
                        <span className="text-xs text-green font-semibold">{item.product.discount}% OFF</span>
                      </div>
                      <p className="text-xs text-green mt-1">✓ {item.product.delivery}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <QuantityControl productId={item.product.id} quantity={item.quantity} />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { toggleWishlist(item.product); removeFromCart(item.product.id) }}
                          className="text-text-secondary hover:text-green text-xs flex items-center gap-1"
                        >
                          <HeartIcon className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Wishlist</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-text-secondary hover:text-red"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2.5 bg-green-soft">
                  <p className="text-xs text-green font-medium">✓ Delivery by {vendor}: ₹40 <span className="line-through text-text-secondary">₹0</span> FREE</p>
                </div>
              </div>
            ))}

            {/* Coupon section */}
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TagIcon className="w-4 h-4 text-green" />
                    <div>
                      <p className="text-sm font-semibold text-green">{appliedCoupon} applied</p>
                      <p className="text-xs text-text-secondary">You saved ₹{discount}!</p>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-red font-medium">Remove</button>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-3">Have a Coupon Code?</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green"
                    />
                    <button
                      onClick={() => applyCoupon(couponCode)}
                      className="px-4 py-2 border-2 border-green text-green rounded-lg text-sm font-semibold hover:bg-green hover:text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    onClick={() => setShowCoupons(true)}
                    className="mt-2 text-xs text-green font-medium flex items-center gap-1"
                  >
                    <TagIcon className="w-3.5 h-3.5" /> View available coupons
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Price summary - right (desktop sticky) */}
          <div className="md:w-80 shrink-0">
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-5 md:sticky md:top-24">
              <h3 className="font-semibold text-text-primary mb-4">Price Details</h3>
              <div className="space-y-3 mb-4">
                {[
                  { label: `Price (${cart.reduce((s, i) => s + i.quantity, 0)} items)`, value: `₹${cartTotal.toLocaleString()}` },
                  { label: 'Discount', value: `-₹${(cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0)).toLocaleString()}`, green: true },
                  { label: 'Delivery Fee', value: delivery === 0 ? 'FREE' : `₹${delivery}`, green: delivery === 0 },
                  { label: 'Tax (5%)', value: `₹${tax}` },
                  ...(couponDiscount > 0 ? [{ label: 'Coupon Discount', value: `-₹${couponDiscount}`, green: true }] : []),
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{label}</span>
                    <span className={green ? 'text-green font-medium' : 'text-text-primary'}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E6EBE8] pt-3 mb-4 flex justify-between">
                <span className="font-bold text-text-primary">Total Amount</span>
                <span className="font-bold text-text-primary text-lg">₹{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-green mb-4 font-medium">
                You will save ₹{(cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0) + couponDiscount).toLocaleString()} on this order
              </p>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors flex items-center justify-center gap-2"
              >
                🔒 Proceed to Checkout
              </button>
              <p className="text-[10px] text-text-secondary text-center mt-2">Secure 256-bit SSL Encrypted Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E6EBE8] flex items-center gap-3 px-4 py-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <div>
          <p className="text-xs text-text-secondary">Total</p>
          <p className="text-lg font-bold text-text-primary">₹{total.toLocaleString()}</p>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="flex-1 py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Coupons sheet */}
      <BottomSheet open={showCoupons} onClose={() => setShowCoupons(false)} title="Available Coupons">
        <div className="p-4 space-y-3">
          {mockCoupons.filter(c => c.type === 'available').map(coupon => (
            <div key={coupon.id} className="border border-dashed border-green rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-green">{coupon.code}</p>
                  <p className="text-sm font-semibold text-text-primary">{coupon.offer}</p>
                  <p className="text-xs text-text-secondary mt-1">Min. order ₹{coupon.minOrder} · Expires {coupon.expiry}</p>
                </div>
                <button
                  onClick={() => applyCoupon(coupon.code)}
                  className="shrink-0 text-green border border-green rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-green hover:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    </MainLayout>
  )
}
