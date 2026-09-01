import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import { categories } from '../../data/mockData'
import { SearchIcon } from '../../components/common/Icons'

export default function CategoriesPage() {
  const [search, setSearch] = useState('')
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Categories" showBack={false} />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-4">
        <div className="hidden md:block mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">All Categories</h1>
          <p className="text-text-secondary text-sm">Browse all product categories</p>
        </div>

        {/* Search */}
        <div className="flex items-center bg-white border border-[#E6EBE8] rounded-xl px-3 py-2.5 mb-5 gap-2">
          <SearchIcon className="w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search for a category"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm text-text-primary placeholder-text-secondary outline-none bg-transparent"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {filtered.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-[#E6EBE8] p-3 hover:border-green hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs font-semibold text-text-primary text-center leading-tight">{cat.name}</p>
              <p className="text-[10px] text-text-secondary">{cat.count} items</p>
            </Link>
          ))}

          <Link
            to="/search"
            className="flex flex-col items-center gap-2 bg-green-soft rounded-2xl border border-green-light p-3 hover:border-green hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 rounded-xl bg-green flex items-center justify-center text-2xl">...</div>
            <p className="text-xs font-semibold text-green text-center leading-tight">View All</p>
            <p className="text-[10px] text-green/60">More</p>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
