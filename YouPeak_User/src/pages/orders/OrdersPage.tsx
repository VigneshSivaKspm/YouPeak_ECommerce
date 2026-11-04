import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import EmptyState from '../../components/common/EmptyState'
import { mockOrders } from '../../data/mockData'

const tabs = ['All', 'Active', 'Delivered', 'Cancelled', 'Returned']

function statusColor(status: string) {
  switch (status) {
    case 'Delivered': return 'text-green bg-green-light'
    case 'Processing': return 'text-blue bg-blue/10'
    case 'Shipped': return 'text-amber bg-amber/10'
    case 'Cancelled': return 'text-red bg-red/10'
    default: return 'text-text-secondary bg-gray-100'
  }
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = mockOrders.filter(order => {
    if (activeTab === 'All') return true
    if (activeTab === 'Active') return ['Processing', 'Shipped'].includes(order.status)
    if (activeTab === 'Delivered') return order.status === 'Delivered'
    if (activeTab === 'Cancelled') return order.status === 'Cancelled'
    return false
  })

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Orders" />
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-text-primary">My Orders</h1>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto hide-scrollbar mb-4 bg-white border border-[#E6EBE8] rounded-xl p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-green text-white' : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="Your orders will appear here once placed"
            actionLabel="Start Shopping"
            actionTo="/"
          />
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden">
                {/* Order header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
                  <div>
                    <p className="text-xs text-text-secondary">Order ID</p>
                    <p className="text-sm font-semibold text-text-primary">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">{order.date}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Products preview */}
                <div className="p-4">
                  {order.products.slice(0, 2).map(product => (
                    <div key={product.id} className="flex items-center gap-3 mb-2 last:mb-0">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary line-clamp-1">{product.name}</p>
                        <p className="text-xs text-text-secondary">{product.brand}</p>
                      </div>
                      <p className="text-sm font-semibold text-text-primary">₹{product.price.toLocaleString()}</p>
                    </div>
                  ))}
                  {order.items > 2 && (
                    <p className="text-xs text-text-secondary mt-1">+{order.items - 2} more items</p>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-[#E6EBE8] flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-secondary">Total Amount</p>
                    <p className="text-sm font-bold text-text-primary">₹{order.total.toLocaleString()}</p>
                  </div>
                  {order.status !== 'Cancelled' && (
                    <p className="text-xs text-text-secondary">
                      {order.status === 'Delivered' ? '✓ Delivered' : `Expected: ${order.expectedDelivery}`}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {['Processing', 'Shipped'].includes(order.status) && (
                      <Link
                        to={`/track-order/${order.id}`}
                        className="px-3 py-1.5 border border-green text-green rounded-lg text-xs font-semibold hover:bg-green-soft transition-colors"
                      >
                        Track
                      </Link>
                    )}
                    <Link
                      to={`/orders/${order.id}`}
                      className="px-3 py-1.5 bg-green text-white rounded-lg text-xs font-semibold hover:bg-green-deep transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
