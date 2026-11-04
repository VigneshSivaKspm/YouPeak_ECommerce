import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { mockCoupons } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import { TagIcon, CopyIcon } from '../../components/common/Icons'

const tabs = ['Available', 'Used', 'Expired']

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('Available')
  const { showToast } = useApp()

  const filtered = mockCoupons.filter(c => {
    if (activeTab === 'Available') return c.type === 'available'
    if (activeTab === 'Used') return c.type === 'used'
    return c.type === 'expired'
  })

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {})
    showToast(`Coupon code ${code} copied!`, 'success')
  }

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Coupons" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:block mb-5">
          <h1 className="text-2xl font-bold text-text-primary">My Coupons</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#E6EBE8] rounded-xl p-1 mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-green text-white' : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <TagIcon className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-text-primary font-semibold">No {activeTab.toLowerCase()} coupons</p>
            <p className="text-sm text-text-secondary mt-1">Explore deals to earn coupons</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(coupon => (
              <div
                key={coupon.id}
                className={`bg-white rounded-2xl border-2 border-dashed overflow-hidden ${
                  coupon.type === 'available' ? 'border-green' : 'border-gray-200 opacity-60'
                }`}
              >
                {/* Ticket notch effect */}
                <div className="flex items-stretch">
                  <div className={`flex items-center justify-center px-4 ${coupon.type === 'available' ? 'bg-green-soft' : 'bg-gray-50'}`}>
                    <TagIcon className={`w-6 h-6 ${coupon.type === 'available' ? 'text-green' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-base font-bold mb-0.5 ${coupon.type === 'available' ? 'text-green' : 'text-text-secondary'}`}>
                          {coupon.offer}
                        </p>
                        <p className="text-xs text-text-secondary mb-1">{coupon.description}</p>
                        <p className="text-xs text-text-secondary">Min. order ₹{coupon.minOrder}</p>
                        <p className="text-xs text-text-secondary">Expires {coupon.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
                        <span className="text-sm font-bold text-text-primary">{coupon.code}</span>
                      </div>
                      {coupon.type === 'available' && (
                        <button
                          onClick={() => copyCode(coupon.code)}
                          className="flex items-center gap-1.5 text-green border border-green rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-green-soft transition-colors"
                        >
                          <CopyIcon className="w-3.5 h-3.5" />
                          Copy Code
                        </button>
                      )}
                      {coupon.type === 'used' && (
                        <span className="text-xs text-text-secondary bg-gray-100 px-3 py-1.5 rounded-lg">Used</span>
                      )}
                      {coupon.type === 'expired' && (
                        <span className="text-xs text-red bg-red/10 px-3 py-1.5 rounded-lg">Expired</span>
                      )}
                    </div>
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
