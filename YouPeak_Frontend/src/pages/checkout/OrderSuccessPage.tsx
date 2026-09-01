import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

export default function OrderSuccessPage() {
  const orderId = `GM${Date.now().toString().slice(-10)}`

  return (
    <MainLayout hideBottomNav>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        {/* Success animation */}
        <div className="w-24 h-24 bg-green rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green/30">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Order Placed Successfully!</h1>
          <p className="text-text-secondary text-sm md:text-base">Thank you for shopping with us.</p>
        </div>

        {/* Order details card */}
        <div className="bg-white border border-[#E6EBE8] rounded-2xl p-6 w-full max-w-sm mb-8 text-left">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Order ID</span>
              <span className="text-sm font-semibold text-text-primary">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Order Date</span>
              <span className="text-sm font-medium text-text-primary">{new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Total Amount</span>
              <span className="text-sm font-bold text-text-primary">₹2,874</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text-secondary">Payment</span>
              <span className="text-sm font-medium text-green">UPI ✓</span>
            </div>
            <div className="pt-2 border-t border-[#E6EBE8]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-text-primary">Estimated Delivery: 25 May 2025, Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-6 mb-8">
          {[
            { icon: '🛡️', label: 'Quality Assured' },
            { icon: '📦', label: 'Safe Packaging' },
            { icon: '⚡', label: 'On-time Delivery' },
          ].map(b => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-xs text-text-secondary">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Link
            to={`/track-order/${orderId}`}
            className="flex-1 py-3 border-2 border-green text-green rounded-xl font-semibold text-sm hover:bg-green-soft text-center transition-colors"
          >
            Track Order
          </Link>
          <Link
            to="/"
            className="flex-1 py-3 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep text-center transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Link to="/orders" className="mt-3 text-sm text-text-secondary hover:text-green underline">
          View My Orders
        </Link>
      </div>
    </MainLayout>
  )
}
