import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { HomeIcon, GridIcon, SearchIcon, CartIcon, UserIcon } from '../common/Icons'

const navItems = [
  { to: '/', icon: HomeIcon, label: 'Home' },
  { to: '/categories', icon: GridIcon, label: 'Categories' },
  { to: '/search', icon: SearchIcon, label: 'Search' },
  { to: '/cart', icon: CartIcon, label: 'Cart' },
  { to: '/account', icon: UserIcon, label: 'Account' },
]

export default function MobileBottomNav() {
  const { pathname } = useLocation()
  const { cartCount } = useApp()

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6EBE8] shadow-lg" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = isActive(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-0 ${
                active ? 'text-green' : 'text-text-secondary'
              }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-colors ${active ? 'bg-green-soft' : ''}`}>
                <Icon className="w-5 h-5" />
                {label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] bg-green text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium leading-tight ${active ? 'text-green font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
