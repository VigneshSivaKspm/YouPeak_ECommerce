import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { useApp } from '../../context/AppContext'
import { mockAddresses } from '../../data/mockData'
import type { Address } from '../../types'

const steps = ['Address', 'Delivery', 'Payment', 'Review']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i < current ? 'bg-green text-white' :
              i === current ? 'bg-green text-white ring-4 ring-green/20' :
              'bg-gray-100 text-text-secondary'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] md:text-xs mt-1 font-medium ${i === current ? 'text-green' : 'text-text-secondary'}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 md:w-12 h-0.5 mb-4 mx-1 transition-colors ${i < current ? 'bg-green' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function AddressStep({ selected, onSelect, onNext }: { selected: string | null; onSelect: (id: string) => void; onNext: () => void }) {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pin: '', type: 'Home' })

  const handleSave = () => {
    const newAddr: Address = {
      id: `addr${Date.now()}`,
      ...form,
      type: form.type as 'Home' | 'Work' | 'Other',
      isDefault: false,
    }
    setAddresses(prev => [...prev, newAddr])
    onSelect(newAddr.id)
    setShowForm(false)
  }

  return (
    <div>
      <h2 className="text-base font-bold text-text-primary mb-4">Select Delivery Address</h2>
      <div className="space-y-3 mb-4">
        {addresses.map(addr => (
          <div
            key={addr.id}
            onClick={() => onSelect(addr.id)}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selected === addr.id ? 'border-green bg-green-soft' : 'border-[#E6EBE8] bg-white hover:border-green/50'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selected === addr.id ? 'border-green' : 'border-gray-300'
                }`}>
                  {selected === addr.id && <div className="w-2 h-2 rounded-full bg-green" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-text-primary">{addr.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      addr.type === 'Home' ? 'bg-blue/10 text-blue' :
                      addr.type === 'Work' ? 'bg-amber/10 text-amber' : 'bg-gray-100 text-gray-500'
                    }`}>{addr.type}</span>
                  </div>
                  <p className="text-xs text-text-secondary">{addr.phone}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{addr.line1}, {addr.line2}</p>
                  <p className="text-xs text-text-secondary">{addr.city}, {addr.state} - {addr.pin}</p>
                </div>
              </div>
              {addr.isDefault && (
                <span className="shrink-0 text-[10px] bg-green-light text-green px-2 py-0.5 rounded-full font-medium">Default</span>
              )}
            </div>
            {selected === addr.id && (
              <div className="mt-3 ml-7">
                <button
                  onClick={e => { e.stopPropagation(); onNext() }}
                  className="px-4 py-2 bg-green text-white rounded-lg text-sm font-semibold hover:bg-green-deep transition-colors"
                >
                  Deliver Here →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full py-3 border-2 border-dashed border-green rounded-xl text-green font-semibold text-sm hover:bg-green-soft transition-colors mb-4"
      >
        + Add New Address
      </button>

      {showForm && (
        <div className="bg-white border border-[#E6EBE8] rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-text-primary">New Address</h3>
          {[
            { key: 'name', label: 'Full Name', placeholder: 'Enter full name' },
            { key: 'phone', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
            { key: 'line1', label: 'Address Line', placeholder: 'House No., Street, Area' },
            { key: 'line2', label: 'Landmark', placeholder: 'Optional landmark' },
            { key: 'city', label: 'City', placeholder: 'Enter city' },
            { key: 'state', label: 'State', placeholder: 'Enter state' },
            { key: 'pin', label: 'PIN Code', placeholder: '6-digit PIN code' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-medium text-text-secondary mb-1 block">{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full border border-[#E6EBE8] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1 block">Address Type</label>
            <div className="flex gap-2">
              {['Home', 'Work', 'Other'].map(t => (
                <button
                  key={t}
                  onClick={() => setForm(prev => ({ ...prev, type: t }))}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                    form.type === t ? 'border-green bg-green-soft text-green' : 'border-[#E6EBE8] text-text-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleSave} className="w-full py-3 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors">
            Save Address
          </button>
        </div>
      )}
    </div>
  )
}

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: '📲', description: 'Pay using any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', description: 'All major banks' },
  { id: 'wallet', label: 'Wallet', icon: '💰', description: 'Paytm, PhonePe, MobiKwik' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', description: 'Pay at your doorstep' },
]

function PaymentStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-base font-bold text-text-primary mb-4">Select Payment Method</h2>
      <div className="space-y-3">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selected === method.id ? 'border-green bg-green-soft' : 'border-[#E6EBE8] bg-white hover:border-green/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === method.id ? 'border-green' : 'border-gray-300'
              }`}>
                {selected === method.id && <div className="w-2 h-2 rounded-full bg-green" />}
              </div>
              <span className="text-xl">{method.icon}</span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{method.label}</p>
                <p className="text-xs text-text-secondary">{method.description}</p>
              </div>
            </div>
            {selected === method.id && method.id === 'upi' && (
              <div className="mt-3 ml-7">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="w-full border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green"
                />
              </div>
            )}
            {selected === method.id && method.id === 'card' && (
              <div className="mt-3 ml-7 space-y-2">
                <input type="text" placeholder="Card number" className="w-full border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green" />
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/YY" className="flex-1 border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green" />
                  <input type="text" placeholder="CVV" className="w-24 border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { cart, cartTotal } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(mockAddresses[0].id)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const delivery = cartTotal >= 499 ? 0 : 40
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + delivery + tax

  const addr = mockAddresses.find(a => a.id === selectedAddress) ?? mockAddresses[0]

  const placeOrder = () => {
    navigate('/order-success')
  }

  return (
    <MainLayout hideBottomNav hideMobileHeader>
      <MobilePageHeader title="Checkout" />
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:block mb-5">
          <h1 className="text-2xl font-bold text-text-primary">Checkout</h1>
        </div>

        <StepIndicator current={step} />

        <div className="flex flex-col md:flex-row gap-5">
          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-5">
              {step === 0 && (
                <AddressStep
                  selected={selectedAddress}
                  onSelect={setSelectedAddress}
                  onNext={() => setStep(1)}
                />
              )}
              {step === 1 && (
                <div>
                  <h2 className="text-base font-bold text-text-primary mb-4">Delivery Options</h2>
                  <div className="space-y-3">
                    {['Standard Delivery (3–5 days) – FREE', 'Express Delivery (1–2 days) – ₹99', 'Same Day Delivery – ₹149'].map((opt, i) => (
                      <label key={i} className={`flex items-center gap-3 border-2 rounded-xl p-4 cursor-pointer ${i === 0 ? 'border-green bg-green-soft' : 'border-[#E6EBE8]'}`}>
                        <input type="radio" name="delivery" defaultChecked={i === 0} className="accent-green" />
                        <span className="text-sm font-medium text-text-primary">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="mt-4 px-6 py-3 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors">
                    Continue to Payment →
                  </button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <PaymentStep selected={selectedPayment} onSelect={setSelectedPayment} />
                  <button
                    onClick={() => selectedPayment && setStep(3)}
                    className={`mt-4 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
                      selectedPayment ? 'bg-green text-white hover:bg-green-deep' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Review Order →
                  </button>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="text-base font-bold text-text-primary mb-4">Review Your Order</h2>
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-text-secondary mb-1">DELIVERY TO</p>
                    <p className="text-sm font-medium text-text-primary">{addr.name} · {addr.phone}</p>
                    <p className="text-xs text-text-secondary">{addr.line1}, {addr.city} - {addr.pin}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-text-primary">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="md:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-4 md:sticky md:top-24">
              <h3 className="font-semibold text-text-primary mb-3">Order Summary</h3>
              <div className="space-y-2 mb-3 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Items ({cart.length})</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Discount</span><span className="text-green">-₹{(cart.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.quantity, 0)).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Delivery</span><span className={delivery === 0 ? 'text-green' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Tax</span><span>₹{tax}</span></div>
              </div>
              <div className="border-t border-[#E6EBE8] pt-3 mb-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">₹{total.toLocaleString()}</span>
              </div>
              {step === 3 && (
                <button
                  onClick={placeOrder}
                  className="w-full py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors flex items-center justify-center gap-2"
                >
                  🔒 Place Order
                </button>
              )}
              {step < 3 && (
                <div className="text-center">
                  <p className="text-xs text-text-secondary">Complete the steps above to place your order</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom */}
      {step === 3 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E6EBE8] flex items-center justify-between px-4 py-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
          <div>
            <p className="text-xs text-text-secondary">Total</p>
            <p className="text-lg font-bold text-text-primary">₹{total.toLocaleString()}</p>
          </div>
          <button
            onClick={placeOrder}
            className="px-6 py-3 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors"
          >
            🔒 Place Order
          </button>
        </div>
      )}
    </MainLayout>
  )
}
