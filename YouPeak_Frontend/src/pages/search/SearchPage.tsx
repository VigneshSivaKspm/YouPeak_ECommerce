import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import ProductCard from '../../components/common/ProductCard'
import { products } from '../../data/mockData'
import { SearchIcon, XIcon } from '../../components/common/Icons'

const recentSearches = ['Nike shoes', 'Wireless earbuds', 'Smartwatch', 'Blue jeans']
const trendingSearches = ['Sneakers', 'Sports Shoes', 'Running Shoes', 'Casual Shoes', 'Formal Shoes']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [submitted, setSubmitted] = useState(!!initialQuery)

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      setSubmitted(true)
    }
  }, [initialQuery])

  const results = submitted
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSubmitted(true)
      setSearchParams({ q: query })
    }
  }

  const handleClear = () => {
    setQuery('')
    setSubmitted(false)
    setSearchParams({})
  }

  const handleSuggestion = (s: string) => {
    setQuery(s)
    setSubmitted(true)
    setSearchParams({ q: s })
  }

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Search" showBack={false} />
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-4">
        {/* Search input */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="flex items-center bg-white border border-[#E6EBE8] rounded-xl overflow-hidden gap-2 px-3 focus-within:border-green focus-within:ring-1 focus-within:ring-green/20 transition-all">
            <SearchIcon className="w-4 h-4 text-text-secondary shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, brands, categories..."
              autoFocus
              className="flex-1 py-3 text-sm text-text-primary placeholder-text-secondary outline-none bg-transparent"
            />
            {query && (
              <button type="button" onClick={handleClear} className="text-text-secondary hover:text-text-primary">
                <XIcon className="w-4 h-4" />
              </button>
            )}
            <button type="submit" className="bg-green text-white px-4 py-2 rounded-lg text-sm font-medium shrink-0">
              Search
            </button>
          </div>
        </form>

        {/* Empty / suggestion state */}
        {!submitted && (
          <div className="space-y-6">
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E6EBE8] rounded-full text-sm text-text-secondary hover:border-green hover:text-green transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Trending Searches 🔥</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="px-3 py-1.5 bg-green-soft border border-green-light rounded-full text-sm text-green font-medium hover:bg-green hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Popular Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {products.slice(0, 6).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                {results.length > 0 ? `${results.length} results for "${query}"` : `No results for "${query}"`}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
                <p className="text-sm text-text-secondary mb-6 max-w-xs">Try a different search term or browse our categories</p>
                <button
                  onClick={() => navigate('/categories')}
                  className="bg-green text-white px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  Browse Categories
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {results.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
