import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { useApp } from '../../context/AppContext'
import { mockAddresses } from '../../data/mockData'
import type { Address } from '../../types'
import { EditIcon, TrashIcon, MapPinIcon } from '../../components/common/Icons'

export default function AddressesPage() {
  const { showToast } = useApp()
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
    showToast('Address deleted', 'info')
  }

  const setDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
    showToast('Default address updated', 'success')
  }

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Addresses" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-text-primary">My Addresses</h1>
        </div>

        <div className="space-y-3 mb-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-xl border border-[#E6EBE8] p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-soft flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-4 h-4 text-green" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-text-primary">{addr.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        addr.type === 'Home' ? 'bg-blue/10 text-blue' :
                        addr.type === 'Work' ? 'bg-amber/10 text-amber' : 'bg-gray-100 text-gray-500'
                      }`}>{addr.type}</span>
                      {addr.isDefault && <span className="text-[10px] bg-green-light text-green px-2 py-0.5 rounded-full font-medium">Default</span>}
                    </div>
                    <p className="text-xs text-text-secondary">{addr.phone}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{addr.line1}, {addr.line2}</p>
                    <p className="text-xs text-text-secondary">{addr.city}, {addr.state} - {addr.pin}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditingId(addr.id)}
                    className="p-1.5 text-text-secondary hover:text-green transition-colors"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="p-1.5 text-text-secondary hover:text-red transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="text-xs text-green font-medium border border-green rounded-lg px-3 py-1 hover:bg-green-soft transition-colors"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3.5 border-2 border-dashed border-green rounded-xl text-green font-semibold text-sm hover:bg-green-soft transition-colors flex items-center justify-center gap-2"
        >
          <MapPinIcon className="w-4 h-4" />
          Add New Address
        </button>

        {showForm && (
          <div className="mt-4 bg-white rounded-xl border border-[#E6EBE8] p-5 space-y-3">
            <h3 className="font-semibold text-text-primary">Add New Address</h3>
            {[
              { label: 'Full Name', placeholder: 'Enter full name' },
              { label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
              { label: 'Address Line', placeholder: 'House No., Street, Area' },
              { label: 'Landmark', placeholder: 'Optional landmark' },
              { label: 'City', placeholder: 'City' },
              { label: 'State', placeholder: 'State' },
              { label: 'PIN Code', placeholder: '6-digit PIN code' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium text-text-secondary mb-1 block">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  className="w-full border border-[#E6EBE8] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">Address Type</label>
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map(t => (
                  <button key={t} className="flex-1 py-2 rounded-xl border-2 border-[#E6EBE8] text-xs font-medium text-text-secondary hover:border-green hover:text-green transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 border-2 border-[#E6EBE8] rounded-xl text-sm font-semibold text-text-secondary">
                Cancel
              </button>
              <button
                onClick={() => { setShowForm(false); showToast('Address saved!', 'success') }}
                className="flex-1 py-3 bg-green text-white rounded-xl text-sm font-semibold hover:bg-green-deep transition-colors"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
