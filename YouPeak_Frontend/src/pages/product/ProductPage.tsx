import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'
import { useApp } from '../../context/AppContext'
import { products } from '../../data/mockData'
import {
  HeartIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon,
  CartIcon, ShieldIcon, TruckIcon, ArrowLeftIcon, ShareIcon
} from '../../components/common/Icons'
import ProductCard from '../../components/common/ProductCard'

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 bg-green rounded-full px-2 py-0.5">
        <StarIcon className="w-3 h-3 text-white" />
        <span className="text-xs font-bold text-white">{rating}</span>
      </div>
      <span className="text-xs text-text-secondary">({count.toLocaleString()} reviews)</span>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist } = useApp()

  const product = products.find(p => p.id === id) ?? products[0]
  const inWishlist = isInWishlist(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [quantity, setQuantity] = useState(1)
  const [pincode, setPincode] = useState('')
  const [pincodeResult, setPincodeResult] = useState<null | 'available' | 'unavailable'>(null)
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc')

  const mockReviews = [
    { name: 'Arun K.', rating: 5, text: 'Excellent product! Very comfortable and exactly as described.', date: '15 May 2025', verified: true },
    { name: 'Priya M.', rating: 4, text: 'Good quality. Delivery was quick. Slightly smaller than expected.', date: '10 May 2025', verified: true },
    { name: 'Rahul S.', rating: 5, text: 'Worth every rupee. Great brand, great product!', date: '05 May 2025', verified: false },
  ]

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    navigate('/cart')
  }

  const checkPincode = () => {
    setPincodeResult(pincode.length === 6 ? 'available' : 'unavailable')
  }

  const ratingDist: [number, number][] = [[5, 68], [4, 20], [3, 7], [2, 3], [1, 2]]

  return (
    <MainLayout hideBottomNav hideMobileHeader>
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E6EBE8] flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-text-primary">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => toggleWishlist(product)} className={inWishlist ? 'text-red' : 'text-text-secondary'}>
            <HeartIcon className="w-5 h-5" filled={inWishlist} />
          </button>
          <button className="text-text-secondary"><ShareIcon className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-0 md:px-6 py-0 md:py-6">
        {/* Desktop breadcrumb */}
        <div className="hidden md:flex items-center gap-2 mb-4 text-sm text-text-secondary">
          <Link to="/" className="hover:text-green">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-green capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-text-primary line-clamp-1">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Left: Image gallery */}
          <div className="md:w-[45%] lg:w-2/5 shrink-0">
            {/* Main image */}
            <div className="relative aspect-square bg-gray-50 md:rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Mobile: image counter */}
              <div className="md:hidden absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                {selectedImage + 1} / {product.images.length}
              </div>
              {/* Desktop nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => (i - 1 + product.images.length) % product.images.length)}
                    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full items-center justify-center hover:bg-gray-50"
                  >
                    <ChevronLeftIcon className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => (i + 1) % product.images.length)}
                    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow-md rounded-full items-center justify-center hover:bg-gray-50"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-text-secondary" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 px-3 md:px-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-green' : 'border-[#E6EBE8]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product details */}
          <div className="flex-1 px-3 md:px-0 pb-4">
            <div className="mb-1">
              <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">{product.brand}</span>
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-text-primary mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} count={product.reviews} />
              {product.soldCount && (
                <span className="text-xs text-text-secondary">{product.soldCount.toLocaleString()} sold</span>
              )}
            </div>

            {/* Price */}
            <div className="bg-green-soft rounded-xl p-4 mb-4">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl md:text-3xl font-bold text-text-primary">₹{product.price.toLocaleString()}</span>
                <span className="text-base text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm font-bold text-green bg-green-light px-2 py-0.5 rounded-full">{product.discount}% OFF</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">You save ₹{(product.originalPrice - product.price).toLocaleString()}</p>
            </div>

            {/* Offers */}
            <div className="mb-4 bg-white border border-[#E6EBE8] rounded-xl p-3">
              <p className="text-sm font-semibold text-text-primary mb-2">Available Offers</p>
              <div className="space-y-1.5">
                <div className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-green shrink-0">🏦</span>
                  <span>Bank Offer: 10% instant discount on SBI Credit Cards. T&C</span>
                </div>
                <div className="flex gap-2 text-xs text-text-secondary">
                  <span className="text-green shrink-0">💳</span>
                  <span>Partner Offer: Get extra 5% off on prepaid orders. T&C</span>
                </div>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-text-primary">Select Size</p>
                  <button className="text-xs text-green font-medium">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-green bg-green-soft text-green'
                          : 'border-[#E6EBE8] text-text-secondary hover:border-green'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-text-primary mb-2">Color: <span className="font-normal text-text-secondary">{selectedColor}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all ${
                        selectedColor === color
                          ? 'border-green bg-green-soft text-green'
                          : 'border-[#E6EBE8] text-text-secondary hover:border-green'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border-2 border-[#E6EBE8] flex items-center justify-center text-text-primary font-bold hover:border-green transition-colors"
                >
                  −
                </button>
                <span className="text-base font-semibold text-text-primary w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 rounded-lg border-2 border-[#E6EBE8] flex items-center justify-center text-text-primary font-bold hover:border-green transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery check */}
            <div className="bg-white border border-[#E6EBE8] rounded-xl p-4 mb-4">
              <p className="text-sm font-semibold text-text-primary mb-2">Check Delivery</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter PIN code"
                  className="flex-1 border border-[#E6EBE8] rounded-lg px-3 py-2 text-sm outline-none focus:border-green"
                />
                <button
                  onClick={checkPincode}
                  className="px-4 py-2 text-green border-2 border-green rounded-lg text-sm font-semibold hover:bg-green hover:text-white transition-colors"
                >
                  Check
                </button>
              </div>
              {pincodeResult === 'available' && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-green font-medium">✓ Delivery available</p>
                  <p className="text-xs text-text-secondary">Estimated delivery: {product.delivery}</p>
                  <p className="text-xs text-green font-medium">FREE Delivery</p>
                </div>
              )}
              {pincodeResult === 'unavailable' && (
                <p className="mt-2 text-xs text-red">⚠ Invalid PIN code. Please try again.</p>
              )}
            </div>

            {/* Vendor */}
            <div className="bg-white border border-[#E6EBE8] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary mb-0.5">Sold by</p>
                  <p className="text-sm font-semibold text-text-primary">{product.vendor}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <StarIcon className="w-3 h-3 text-amber" />
                    <span className="text-xs text-text-secondary">4.6 · Verified Seller</span>
                    <ShieldIcon className="w-3 h-3 text-green ml-1" />
                  </div>
                </div>
                <button className="text-green text-sm font-medium border border-green rounded-lg px-3 py-1.5 hover:bg-green hover:text-white transition-colors">
                  Visit Store
                </button>
              </div>
            </div>

            {/* Trust badges desktop */}
            <div className="hidden md:grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: '🛡️', label: 'Quality Assured' },
                { icon: '📦', label: 'Safe Packaging' },
                { icon: '⚡', label: 'On-time Delivery' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1 p-3 bg-green-soft rounded-xl">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-xs text-green font-medium text-center">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 border-2 border-green text-green rounded-xl font-semibold text-sm hover:bg-green-soft transition-colors flex items-center justify-center gap-2"
              >
                <CartIcon className="w-5 h-5" /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 py-3.5 border-2 rounded-xl transition-colors ${inWishlist ? 'border-red text-red' : 'border-[#E6EBE8] text-text-secondary hover:border-red hover:text-red'}`}
              >
                <HeartIcon className="w-5 h-5" filled={inWishlist} />
              </button>
            </div>
          </div>
        </div>

        {/* Description & Reviews tabs */}
        <div className="mt-6 px-3 md:px-0 pb-4">
          <div className="flex border-b border-[#E6EBE8] mb-4">
            {(['desc', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab ? 'border-green text-green' : 'border-transparent text-text-secondary'
                }`}
              >
                {tab === 'desc' ? 'Description' : `Reviews (${product.reviews.toLocaleString()})`}
              </button>
            ))}
          </div>

          {activeTab === 'desc' && (
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
              <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl border border-[#E6EBE8] p-4">
              {/* Rating summary */}
              <div className="flex gap-6 mb-5 pb-5 border-b border-[#E6EBE8]">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-text-primary">{product.rating}</span>
                  <div className="flex gap-0.5 my-1">
                    {[1,2,3,4,5].map(i => (
                      <StarIcon key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-amber' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{product.reviews.toLocaleString()} reviews</span>
                </div>
                <div className="flex-1">
                  {ratingDist.map(([star, pct]) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-secondary w-4">{star}★</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-text-secondary w-6">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Reviews list */}
              <div className="space-y-4">
                {mockReviews.map((r, i) => (
                  <div key={i} className="border-b border-[#E6EBE8] last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-green text-white text-xs font-bold flex items-center justify-center">
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-medium text-text-primary">{r.name}</span>
                        {r.verified && <span className="text-[10px] text-green bg-green-light px-1.5 py-0.5 rounded-full">✓ Verified</span>}
                      </div>
                      <span className="text-xs text-text-secondary">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-1.5">
                      {[1,2,3,4,5].map(i => (
                        <StarIcon key={i} className={`w-3 h-3 ${i <= r.rating ? 'text-amber' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-4 px-3 md:px-0 pb-4">
            <h2 className="text-base md:text-xl font-bold text-text-primary mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E6EBE8] px-3 py-3 flex gap-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3.5 border-2 border-green text-green rounded-xl font-semibold text-sm hover:bg-green-soft transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3.5 bg-green text-white rounded-xl font-semibold text-sm hover:bg-green-deep transition-colors"
        >
          Buy Now
        </button>
      </div>
    </MainLayout>
  )
}
