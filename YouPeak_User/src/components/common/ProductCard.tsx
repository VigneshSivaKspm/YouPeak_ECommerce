import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { Product } from '../../types'
import { HeartIcon, StarIcon } from './Icons'

interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'list'
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useApp()
  const navigate = useNavigate()
  const inWishlist = isInWishlist(product.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
  }

  if (variant === 'list') {
    return (
      <div
        className="bg-white rounded-xl border border-[#E6EBE8] p-3 flex gap-3 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative w-24 h-24 shrink-0 rounded-lg bg-gray-50 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-green text-white">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-text-secondary mb-0.5">{product.brand}</p>
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            <StarIcon className="w-3 h-3 text-amber" />
            <span className="text-xs font-medium text-text-primary">{product.rating}</span>
            <span className="text-xs text-text-secondary">({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-xs font-semibold text-green">{product.discount}% OFF</span>
          </div>
        </div>
        <button
          onClick={handleWishlist}
          className={`shrink-0 p-1 ${inWishlist ? 'text-red' : 'text-gray-300'}`}
        >
          <HeartIcon className="w-5 h-5" filled={inWishlist} />
        </button>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-xl border border-[#E6EBE8] overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            product.badge === 'Best Seller' ? 'bg-amber text-white' :
            product.badge === 'New' ? 'bg-blue text-white' :
            'bg-green text-white'
          }`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm transition-colors ${
            inWishlist ? 'text-red' : 'text-gray-300 hover:text-red'
          }`}
        >
          <HeartIcon className="w-4 h-4" filled={inWishlist} />
        </button>
      </div>

      <div className="p-2.5">
        <p className="text-[10px] text-text-secondary mb-0.5 line-clamp-1">{product.brand}</p>
        <h3 className="text-xs font-medium text-text-primary line-clamp-2 mb-1.5 leading-snug">{product.name}</h3>

        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center gap-0.5 bg-green rounded px-1 py-0.5">
            <StarIcon className="w-2.5 h-2.5 text-white" />
            <span className="text-[10px] font-semibold text-white">{product.rating}</span>
          </div>
          <span className="text-[10px] text-text-secondary">({product.reviews >= 1000 ? `${(product.reviews/1000).toFixed(1)}k` : product.reviews})</span>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-text-primary">₹{product.price.toLocaleString()}</span>
            <span className="text-[10px] text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-semibold text-green">{product.discount}% OFF</span>
        </div>

        {product.delivery && (
          <p className="text-[10px] text-text-secondary mb-2 line-clamp-1">
            <span className="text-green">✓</span> {product.delivery}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-lg border-2 border-green text-green text-xs font-semibold hover:bg-green hover:text-white transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
