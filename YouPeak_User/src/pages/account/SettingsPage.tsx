import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { ChevronRightIcon } from '../../components/common/Icons'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    orders: true,
    offers: true,
    news: false,
    sms: true,
    email: true,
  })

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Settings" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Language */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Language</p>
          </div>
          <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>
              <p className="text-sm font-medium text-text-primary">App Language</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">English</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
            </div>
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Notifications</p>
          </div>
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between px-4 py-3.5 border-b border-[#E6EBE8] last:border-0">
              <p className="text-sm font-medium text-text-primary capitalize">{key === 'sms' ? 'SMS Notifications' : key === 'email' ? 'Email Notifications' : `${key.charAt(0).toUpperCase() + key.slice(1)} Updates`}</p>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-green' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Privacy & Security</p>
          </div>
          {[
            { icon: '🔒', label: 'Change Password' },
            { icon: '🛡️', label: 'Two-Factor Authentication' },
            { icon: '📱', label: 'Linked Devices' },
            { icon: '🗑️', label: 'Delete Account' },
          ].map(item => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#E6EBE8] last:border-0 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`flex-1 text-sm font-medium ${item.label === 'Delete Account' ? 'text-red' : 'text-text-primary'}`}>{item.label}</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
