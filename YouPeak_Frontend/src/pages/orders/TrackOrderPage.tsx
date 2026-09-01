import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { PhoneIcon, ChatIcon, RefreshIcon } from '../../components/common/Icons'

const trackingSteps = [
  { label: 'Order Confirmed', date: '24 May, 10:30 AM', done: true },
  { label: 'Processing', date: '24 May, 11:15 AM', done: true },
  { label: 'Packed', date: '24 May, 02:35 PM', done: true },
  { label: 'Picked Up', date: '24 May, 06:20 PM', done: true },
  { label: 'Out for Delivery', date: '25 May, 06:45 AM', done: true, active: true },
  { label: 'Delivered', date: 'Expected by 8:00 PM', done: false },
]

export default function TrackOrderPage() {
  const { id } = useParams()

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Track Order" />
      <div className="max-w-2xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Order header */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">Order ID</p>
            <p className="text-sm font-bold text-text-primary">{id ?? 'GM1250524001'}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-3 py-1 rounded-full text-amber bg-amber/10">Out for Delivery</span>
            <p className="text-xs text-text-secondary mt-1">ETA: By 8:00 PM today</p>
          </div>
        </div>

        {/* Tracking timeline */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Tracking Details</h2>
            <button className="flex items-center gap-1.5 text-green text-xs font-medium">
              <RefreshIcon className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
          <div className="relative">
            {trackingSteps.map((step, i) => (
              <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                {/* Line */}
                {i < trackingSteps.length - 1 && (
                  <div className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${step.done ? 'bg-green' : 'bg-gray-200'}`} />
                )}
                {/* Dot */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  step.done && step.active
                    ? 'bg-green shadow-lg shadow-green/30 ring-4 ring-green/20'
                    : step.done
                    ? 'bg-green'
                    : 'bg-gray-100 border-2 border-gray-200'
                }`}>
                  {step.done ? (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.active ? 'text-green' : step.done ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {step.label}
                    {step.active && <span className="ml-2 text-[10px] font-bold bg-green text-white px-1.5 py-0.5 rounded-full">LIVE</span>}
                  </p>
                  <p className="text-xs text-text-secondary">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-green-soft to-green-light flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-sm font-medium text-green mt-2">Live tracking active</p>
              <p className="text-xs text-green/60">Delivery partner on the way</p>
            </div>
          </div>
        </div>

        {/* Delivery partner */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">Delivery Partner</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Ramesh Kumar</p>
                <div className="flex items-center gap-1">
                  <span className="text-amber">★</span>
                  <span className="text-xs text-text-secondary">4.8 · 2,340 deliveries</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border-2 border-green flex items-center justify-center text-green hover:bg-green hover:text-white transition-colors">
                <PhoneIcon className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-green flex items-center justify-center text-green hover:bg-green hover:text-white transition-colors">
                <ChatIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Delivery To</p>
          <p className="text-sm font-medium text-text-primary">Rahul Sharma</p>
          <p className="text-xs text-text-secondary">A-101, Green Valley Apartments, Koramangala, Bangalore - 560034</p>
        </div>
      </div>
    </MainLayout>
  )
}
