import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import ProductCard from '../../components/common/ProductCard'
import { products, categories } from '../../data/mockData'
import { ChevronRightIcon } from '../../components/common/Icons'

const heroSlides = [
  {
    id: 1,
    title: 'Mega Fashion Sale',
    subtitle: '50–80% OFF On Top Brands',
    cta: 'Shop Now',
    bg: 'from-green-deep to-green',
    emoji: '👗',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    title: 'Top Deals of the Day',
    subtitle: 'Up to 70% OFF on Electronics',
    cta: 'Grab Now',
    bg: 'from-blue to-indigo-700',
    emoji: '📱',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'Fresh Deals for You',
    subtitle: 'Grocery & Kitchen up to 50% OFF',
    cta: 'Shop Now',
    bg: 'from-amber to-orange-500',
    emoji: '🛒',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop&auto=format',
  },
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[current]

  return (
    <div className="relative overflow-hidden rounded-none md:rounded-2xl">
      {/* Desktop: image banner */}
      <div className="hidden md:block relative h-[280px] lg:h-[320px] xl:h-[360px] overflow-hidden">
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-all duration-500" />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-70`} />
        <div className="absolute inset-0 flex items-center px-12">
          <div className="text-white">
            <p className="text-sm font-medium mb-2 opacity-90">Limited Time Offer</p>
            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-xl mb-6 opacity-90">{slide.subtitle}</p>
            <button
              onClick={() => navigate('/search?q=deals')}
              className="bg-white text-text-primary px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              {slide.cta} →
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: compact banner */}
      <div className="md:hidden relative h-[160px] overflow-hidden">
        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-75`} />
        <div className="absolute inset-0 flex items-center px-5">
          <div className="text-white">
            <h2 className="text-lg font-bold mb-1">{slide.title}</h2>
            <p className="text-sm mb-3 opacity-90">{slide.subtitle}</p>
            <button
              onClick={() => navigate('/search?q=deals')}
              className="bg-white text-text-primary px-4 py-1.5 rounded-lg font-semibold text-xs"
            >
              {slide.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

function SectionHeader({ title, viewAllTo }: { title: string; viewAllTo?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base md:text-xl font-bold text-text-primary">{title}</h2>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex items-center gap-1 text-green text-sm font-medium hover:text-green-deep transition-colors">
          See All <ChevronRightIcon className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

function CategoryStrip() {
  return (
    <section className="px-3 md:px-0">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-green-soft border border-green-light overflow-hidden flex items-center justify-center group-hover:border-green transition-colors">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-90" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-text-secondary text-center w-14 md:w-16 leading-tight">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function DealsSection() {
  const dealProducts = products.filter(p => p.badge === 'Deal' || p.discount >= 50).slice(0, 6)
  return (
    <section>
      <SectionHeader title="🔥 Top Deals" viewAllTo="/search?q=deals" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {dealProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function FeaturedSection() {
  return (
    <section>
      <SectionHeader title="Featured Products" viewAllTo="/categories" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.slice(0, 8).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function TrendingSection() {
  return (
    <section>
      <SectionHeader title="Trending Now" viewAllTo="/search?q=trending" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.slice(4, 12).map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

function PromoBanners() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { label: '100% Original Products', sub: 'Sourced from trusted sellers', icon: '✓', color: 'bg-green-soft border-green-light' },
          { label: 'Secure Payments', sub: 'Multiple safe payment options', icon: '🔒', color: 'bg-blue/5 border-blue/20' },
          { label: 'Easy Returns', sub: 'Hassle-free return & refund', icon: '↩', color: 'bg-amber/5 border-amber/20' },
        ].map(b => (
          <div key={b.label} className={`flex items-center gap-3 p-4 rounded-xl border ${b.color}`}>
            <span className="text-2xl">{b.icon}</span>
            <div>
              <p className="text-sm font-semibold text-text-primary">{b.label}</p>
              <p className="text-xs text-text-secondary">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TopBrands() {
  const brands = [
    { name: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=80&fit=crop&auto=format', slug: 'sports' },
    { name: 'boAt', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=80&fit=crop&auto=format', slug: 'electronics' },
    { name: "Levi's", image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&h=80&fit=crop&auto=format', slug: 'fashion' },
    { name: 'Noise', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=80&fit=crop&auto=format', slug: 'electronics' },
    { name: 'Fossil', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=120&h=80&fit=crop&auto=format', slug: 'accessories' },
    { name: 'Philips', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=120&h=80&fit=crop&auto=format', slug: 'beauty' },
  ]
  return (
    <section>
      <SectionHeader title="Top Brands" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {brands.map(b => (
          <Link
            key={b.name}
            to={`/category/${b.slug}`}
            className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden hover:border-green hover:shadow-md transition-all group"
          >
            <div className="aspect-[3/2] overflow-hidden">
              <img src={b.image} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="text-center text-xs font-semibold text-text-primary py-2">{b.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-[1440px] mx-auto px-0 md:px-4 lg:px-6 space-y-6 md:space-y-8 py-0 md:py-4">
        <HeroCarousel />
        <div className="px-3 md:px-0">
          <CategoryStrip />
        </div>
        <div className="px-3 md:px-0">
          <PromoBanners />
        </div>
        <div className="px-3 md:px-0">
          <DealsSection />
        </div>
        <div className="px-3 md:px-0">
          <FeaturedSection />
        </div>
        <div className="px-3 md:px-0">
          <TopBrands />
        </div>
        <div className="px-3 md:px-0">
          <TrendingSection />
        </div>
      </div>
    </MainLayout>
  )
}
