import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { mockNotifications } from '../../data/mockData'
import type { Notification } from '../../types'
import { BellIcon } from '../../components/common/Icons'

const tabs = ['All', 'Orders', 'Offers', 'Account']

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const filtered = notifications.filter(n => {
    if (activeTab === 'All') return true
    return n.category === activeTab.toLowerCase()
  })

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Notifications" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-green font-medium">Mark All as Read</button>
          )}
        </div>

        <div className="flex items-center justify-between mb-3 md:hidden">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-green font-medium ml-auto">Mark All as Read</button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#E6EBE8] rounded-xl p-1 mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-green text-white' : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <BellIcon className="w-12 h-12 text-gray-200 mb-4" />
            <p className="text-text-primary font-semibold">No notifications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(n => (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  !n.read
                    ? 'bg-green-soft border-green/20 hover:bg-green-soft/80'
                    : 'bg-white border-[#E6EBE8] hover:bg-gray-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  n.category === 'orders' ? 'bg-blue/10' :
                  n.category === 'offers' ? 'bg-amber/10' : 'bg-green-light'
                }`}>
                  {n.category === 'orders' ? '📦' : n.category === 'offers' ? '🔥' : '🔔'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-text-primary' : 'text-text-primary'}`}>{n.title}</p>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-green shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{n.description}</p>
                  <p className="text-[10px] text-text-secondary mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
