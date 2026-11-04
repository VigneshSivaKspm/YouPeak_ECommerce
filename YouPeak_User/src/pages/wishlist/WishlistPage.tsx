import MainLayout from '../../layouts/MainLayout'
import { MobilePageHeader } from '../../components/navigation/Header'
import ProductCard from '../../components/common/ProductCard'
import EmptyState from '../../components/common/EmptyState'
import { useApp } from '../../context/AppContext'

export default function WishlistPage() {
  const { wishlist } = useApp()

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Wishlist" />
      <div className="max-w-[1440px] mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-text-primary">My Wishlist</h1>
          <span className="text-text-secondary text-sm">{wishlist.length} items</span>
        </div>

        {wishlist.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="Your wishlist is empty"
            description="Save items you love to your wishlist and find them easily"
            actionLabel="Start Shopping"
            actionTo="/"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
