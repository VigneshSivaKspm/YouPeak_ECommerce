import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import ProductCard from '../../components/common/ProductCard'
import BottomSheet from '../../components/common/BottomSheet'
import { products, categories } from '../../data/mockData'
import { FilterIcon, SortIcon, ChevronRightIcon } from '../../components/common/Icons'

const sortOptions = [
  'Popularity',
  'Price: Low to High',
  'Price: High to Low',
  'Newest First',
  'Rating',
  'Discount',
]

const priceRanges = [
  { label: 'Under ₹500', max: 500, min: 0 },
  { label: '₹500 – ₹1,000', max: 1000, min: 500 },
  { label: '₹1,000 – ₹3,000', max: 3000, min: 1000 },
  { label: '₹3,000 – ₹5,000', max: 5000, min: 3000 },
  { label: 'Above ₹5,000', max: Infinity, min: 5000 },
]

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories.find(c => c.slug === slug)
  const [sort, setSort] = useState('Popularity')
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)

  const categoryProducts = products.filter(p =>
    slug ? p.category === slug : true
  )

  const filtered = categoryProducts
    .filter(p => {
      if (selectedPrice !== null) {
        const range = priceRanges[selectedPrice]
        if (p.price < range.min || p.price > range.max) return false
      }
      if (minRating !== null && p.rating < minRating) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price
      if (sort === 'Price: High to Low') return b.price - a.price
      if (sort === 'Rating') return b.rating - a.rating
      if (sort === 'Discount') return b.discount - a.discount
      return 0
    })

  const title = category?.name ?? (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'All Products')

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title={title} />

      <div className="max-w-[1440px] mx-auto">
        {/* Desktop breadcrumb */}
        <div className="hidden md:flex items-center gap-2 px-6 py-3 text-sm text-text-secondary">
          <Link to="/" className="hover:text-green">Home</Link>
          <ChevronRightIcon className="w-3 h-3" />
          <Link to="/categories" className="hover:text-green">Categories</Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-text-primary font-medium">{title}</span>
        </div>

        <div className="flex gap-6 px-0 md:px-6 py-0 md:py-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-4 sticky top-24">
              <h3 className="font-semibold text-text-primary mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-5">
                <h4 className="text-sm font-medium text-text-secondary mb-2">Price Range</h4>
                {priceRanges.map((range, i) => (
                  <label key={i} className="flex items-center gap-2 py-1 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === i}
                      onChange={() => setSelectedPrice(selectedPrice === i ? null : i)}
                      className="accent-green"
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-5">
                <h4 className="text-sm font-medium text-text-secondary mb-2">Ratings</h4>
                {[4, 3, 2].map(r => (
                  <label key={r} className="flex items-center gap-2 py-1 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(minRating === r ? null : r)}
                      className="accent-green"
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary">{r}★ & above</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => { setSelectedPrice(null); setMinRating(null) }}
                className="w-full py-2 border border-[#E6EBE8] rounded-lg text-sm text-text-secondary hover:border-green hover:text-green transition-colors"
              >
                Clear All
              </button>
            </div>
          </aside>

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Desktop sort bar */}
            <div className="hidden md:flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">{filtered.length} products found</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm border border-[#E6EBE8] rounded-lg px-3 py-1.5 text-text-primary outline-none focus:border-green"
                >
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Product grid */}
            <div className="px-3 md:px-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-16">
                  <span className="text-5xl mb-3">🔍</span>
                  <p className="text-text-primary font-semibold mb-1">No products found</p>
                  <p className="text-text-secondary text-sm">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile sticky filter/sort bar */}
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-[#E6EBE8] flex" style={{ paddingBottom: 0 }}>
          <button
            onClick={() => setShowSort(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 border-r border-[#E6EBE8] text-sm font-medium text-text-secondary"
          >
            <SortIcon className="w-4 h-4" />
            Sort
          </button>
          <button
            onClick={() => setShowFilter(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-text-secondary"
          >
            <FilterIcon className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Sort bottom sheet */}
      <BottomSheet open={showSort} onClose={() => setShowSort(false)} title="Sort By">
        <div className="p-4">
          {sortOptions.map(o => (
            <button
              key={o}
              onClick={() => { setSort(o); setShowSort(false) }}
              className={`w-full flex items-center justify-between px-3 py-3.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                sort === o ? 'bg-green-soft text-green' : 'text-text-primary hover:bg-gray-50'
              }`}
            >
              {o}
              {sort === o && <span className="text-green">✓</span>}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Filter bottom sheet */}
      <BottomSheet open={showFilter} onClose={() => setShowFilter(false)} title="Filters" maxHeight="90vh">
        <div className="p-4 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Price Range</h4>
            {priceRanges.map((range, i) => (
              <label key={i} className="flex items-center gap-3 py-2.5 border-b border-[#E6EBE8] last:border-0 cursor-pointer">
                <input
                  type="radio"
                  name="price-mobile"
                  checked={selectedPrice === i}
                  onChange={() => setSelectedPrice(selectedPrice === i ? null : i)}
                  className="accent-green w-4 h-4"
                />
                <span className="text-sm text-text-primary">{range.label}</span>
              </label>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Rating</h4>
            {[4, 3, 2].map(r => (
              <label key={r} className="flex items-center gap-3 py-2.5 border-b border-[#E6EBE8] last:border-0 cursor-pointer">
                <input
                  type="radio"
                  name="rating-mobile"
                  checked={minRating === r}
                  onChange={() => setMinRating(minRating === r ? null : r)}
                  className="accent-green w-4 h-4"
                />
                <span className="text-sm text-text-primary">{r}★ & above</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setSelectedPrice(null); setMinRating(null) }}
              className="flex-1 py-3 border-2 border-[#E6EBE8] rounded-xl text-sm font-semibold text-text-secondary"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowFilter(false)}
              className="flex-1 py-3 bg-green text-white rounded-xl text-sm font-semibold"
            >
              Apply Filters ({filtered.length})
            </button>
          </div>
        </div>
      </BottomSheet>
    </MainLayout>
  )
}
