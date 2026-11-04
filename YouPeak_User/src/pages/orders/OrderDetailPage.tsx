import { useParams, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { mockOrders, mockAddresses } from '../../data/mockData'

export default function OrderDetailPage() {
  const { id } = useParams()
  const order = mockOrders.find(o => o.id === id) ?? mockOrders[0]
  const address = mockAddresses[0]

  const statusColor = (s: string) => {
    const m: Record<string, string> = {
      'Delivered': 'text-green bg-green-light',
      'Processing': 'text-blue bg-blue/10',
      'Shipped': 'text-amber bg-amber/10',
      'Cancelled': 'text-red bg-red/10',
    }
    return m[s] ?? 'text-text-secondary bg-gray-100'
  }

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Order Details" />
      <div className="max-w-3xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Status card */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-text-secondary">Order ID</p>
              <p className="text-sm font-bold text-text-primary">{order.id}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-xs text-text-secondary">Order Date</p>
              <p className="font-medium text-text-primary">{order.date}</p>
            </div>
            {order.status !== 'Cancelled' && (
              <div className="text-right">
                <p className="text-xs text-text-secondary">Expected Delivery</p>
                <p className="font-medium text-text-primary">{order.expectedDelivery}</p>
              </div>
            )}
          </div>
          {['Processing', 'Shipped'].includes(order.status) && (
            <Link
              to={`/track-order/${order.id}`}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 border-2 border-green text-green rounded-xl text-sm font-semibold hover:bg-green-soft transition-colors"
            >
              📍 Track Order
            </Link>
          )}
        </div>

        {/* Products */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-sm font-semibold text-text-primary">Order Items ({order.items})</p>
          </div>
          {order.products.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-4 border-b border-[#E6EBE8] last:border-0">
              <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary line-clamp-2">{p.name}</p>
                <p className="text-xs text-text-secondary">{p.brand} · {p.vendor}</p>
                <p className="text-sm font-bold text-text-primary mt-1">₹{p.price.toLocaleString()}</p>
              </div>
              {order.status === 'Delivered' && (
                <Link to={`/product/${p.id}`} className="shrink-0 px-3 py-1.5 border border-green text-green rounded-lg text-xs font-semibold hover:bg-green-soft transition-colors">
                  Buy Again
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
          <p className="text-sm font-semibold text-text-primary mb-2">Delivery Address</p>
          <p className="text-sm font-medium text-text-primary">{address.name} · {address.phone}</p>
          <p className="text-xs text-text-secondary mt-0.5">{address.line1}, {address.line2}</p>
          <p className="text-xs text-text-secondary">{address.city}, {address.state} - {address.pin}</p>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
          <p className="text-sm font-semibold text-text-primary mb-3">Payment Details</p>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-text-secondary">Payment Method</span>
            <span className="font-medium text-text-primary">{order.payment}</span>
          </div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-text-secondary">Subtotal</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-text-secondary">Delivery</span>
            <span className="text-green">FREE</span>
          </div>
          <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#E6EBE8]">
            <span>Total</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          {order.status === 'Processing' && (
            <button className="py-3 border-2 border-red text-red rounded-xl text-sm font-semibold hover:bg-red/5 transition-colors">
              Cancel Order
            </button>
          )}
          {order.status === 'Delivered' && (
            <button className="py-3 border-2 border-[#E6EBE8] text-text-secondary rounded-xl text-sm font-semibold hover:border-green hover:text-green transition-colors">
              Return / Exchange
            </button>
          )}
          <button className="py-3 border-2 border-[#E6EBE8] text-text-secondary rounded-xl text-sm font-semibold hover:border-green hover:text-green transition-colors">
            Download Invoice
          </button>
          <button className="py-3 border-2 border-[#E6EBE8] text-text-secondary rounded-xl text-sm font-semibold hover:border-green hover:text-green transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </MainLayout>
  )
}
