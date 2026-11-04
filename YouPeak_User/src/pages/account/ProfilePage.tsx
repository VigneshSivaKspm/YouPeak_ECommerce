import { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { useApp } from '../../context/AppContext'

export default function ProfilePage() {
  const { user, showToast } = useApp()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
    dob: '15/08/1992',
    gender: 'Male',
  })

  const handleSave = () => {
    showToast('Profile updated successfully!', 'success')
  }

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Profile" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:block mb-5">
          <h1 className="text-2xl font-bold text-text-primary">My Profile</h1>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green flex items-center justify-center text-white text-4xl font-bold">
              {form.name[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-[#E6EBE8] rounded-full flex items-center justify-center shadow-sm hover:border-green transition-colors">
              <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm font-semibold text-text-primary">{form.name}</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-5 space-y-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'phone', label: 'Mobile Number', type: 'tel' },
            { key: 'email', label: 'Email Address', type: 'email' },
            { key: 'dob', label: 'Date of Birth', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-text-secondary mb-1.5 block uppercase tracking-wide">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full border border-[#E6EBE8] rounded-xl px-4 py-3 text-sm text-text-primary outline-none focus:border-green focus:ring-1 focus:ring-green/20 transition-all"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block uppercase tracking-wide">Gender</label>
            <div className="flex gap-2">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  onClick={() => setForm(prev => ({ ...prev, gender: g }))}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                    form.gender === g ? 'border-green bg-green-soft text-green' : 'border-[#E6EBE8] text-text-secondary hover:border-green/50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  )
}
