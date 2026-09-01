import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { SearchIcon, ChevronRightIcon, HelpIcon, ChatIcon, PhoneIcon } from '../../components/common/Icons'

const topics = [
  { icon: '📦', title: 'Order Issues', desc: 'Track, modify or cancel orders' },
  { icon: '💳', title: 'Payment Issues', desc: 'Payment failures, refunds & more' },
  { icon: '↩️', title: 'Returns & Refunds', desc: 'Return requests and status' },
  { icon: '🚚', title: 'Delivery Issues', desc: 'Delayed or wrong delivery' },
  { icon: '👤', title: 'Account Issues', desc: 'Login, profile & security' },
  { icon: '🏪', title: 'Seller Issues', desc: 'Report sellers, seller support' },
]

const faqs = [
  { q: 'How do I track my order?', a: 'Go to My Orders → select order → Track Order.' },
  { q: 'What is the return policy?', a: 'Most items can be returned within 10 days of delivery.' },
  { q: 'When will I get my refund?', a: 'Refunds are processed within 5–7 business days.' },
  { q: 'Can I change my delivery address?', a: 'You can change before the order is packed.' },
]

export default function SupportPage() {
  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Help & Support" />
      <div className="max-w-2xl mx-auto px-3 md:px-6 py-4 space-y-5">
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Help & Support</h1>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white border border-[#E6EBE8] rounded-xl px-3 py-2.5 gap-2">
          <SearchIcon className="w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search for help..."
            className="flex-1 text-sm text-text-primary placeholder-text-secondary outline-none bg-transparent"
          />
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center gap-3 bg-white border-2 border-[#E6EBE8] rounded-xl p-4 hover:border-green transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
              <ChatIcon className="w-5 h-5 text-blue" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">Live Chat</p>
              <p className="text-xs text-green">Available now</p>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-white border-2 border-[#E6EBE8] rounded-xl p-4 hover:border-green transition-colors">
            <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center">
              <PhoneIcon className="w-5 h-5 text-green" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">Call Us</p>
              <p className="text-xs text-text-secondary">1800-XXX-XXXX</p>
            </div>
          </button>
        </div>

        {/* Popular topics */}
        <div>
          <h2 className="text-base font-bold text-text-primary mb-3">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map(t => (
              <button key={t.title} className="flex flex-col gap-2 bg-white border border-[#E6EBE8] rounded-xl p-4 text-left hover:border-green hover:shadow-md transition-all">
                <span className="text-2xl">{t.icon}</span>
                <p className="text-sm font-semibold text-text-primary">{t.title}</p>
                <p className="text-xs text-text-secondary">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-base font-bold text-text-primary mb-3">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden divide-y divide-[#E6EBE8]">
            {faqs.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between px-4 py-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-text-primary">{faq.q}</span>
                  <ChevronRightIcon className="w-4 h-4 text-text-secondary group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-text-secondary">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Create ticket */}
        <button className="w-full py-3.5 border-2 border-green text-green rounded-xl font-semibold text-sm hover:bg-green-soft transition-colors flex items-center justify-center gap-2">
          <HelpIcon className="w-4 h-4" />
          Create Support Ticket
        </button>
      </div>
    </MainLayout>
  )
}
