import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  SearchIcon,
  CartIcon,
  HeartIcon,
  BellIcon,
  UserIcon,
  MapPinIcon,
  ChevronDownIcon,
} from "../common/Icons";

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

const NAV_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Grocery",
  "Sports",
  "Mobiles",
  "Appliances",
];

export function DesktopHeader() {
  const { cartCount } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim())
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="hidden md:block bg-white border-b border-[#E6EBE8] sticky top-0 z-40 shadow-sm">
      {/* Main header row */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-green rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">Y</span>
          </div>
          <div>
            <div className="text-green-deep font-bold text-xl leading-tight tracking-tight">
              YouPeak
            </div>
            <div className="text-[9px] text-text-secondary leading-tight">
              Better Choices. Brighter Tomorrow.
            </div>
          </div>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="flex items-center bg-[#F7F9F8] border border-[#E6EBE8] rounded-xl overflow-hidden focus-within:border-green focus-within:ring-1 focus-within:ring-green transition-all">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands and categories..."
              className="flex-1 px-4 py-2.5 bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-green text-white flex items-center gap-2 hover:bg-green-deep transition-colors shrink-0"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="text-sm font-medium hidden lg:block">
                Search
              </span>
            </button>
          </div>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-text-secondary hover:text-green">
            <MapPinIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium hidden lg:block">
              Deliver to
            </span>
          </button>
          <Link
            to="/wishlist"
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-text-secondary hover:text-green"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium hidden lg:block">
              Wishlist
            </span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-text-secondary hover:text-green"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="text-[10px] font-medium hidden lg:block">
              Orders
            </span>
          </Link>
          <Link
            to="/cart"
            className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-text-secondary hover:text-green"
          >
            <CartIcon className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 right-0 min-w-[18px] h-[18px] bg-green text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] font-medium hidden lg:block">
              Cart
            </span>
          </Link>
          <Link
            to="/account"
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-text-secondary hover:text-green"
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium hidden lg:block">
              Account
            </span>
          </Link>
        </div>
      </div>

      {/* Category nav row */}
      <div className="border-t border-[#E6EBE8] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center gap-1 overflow-x-auto hide-scrollbar">
          <Link
            to="/categories"
            className="flex items-center gap-1.5 px-3 py-2.5 bg-green text-white rounded-b-lg text-sm font-medium shrink-0 hover:bg-green-deep transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
            All Categories
          </Link>
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
              className="px-3 py-2.5 text-sm text-text-secondary hover:text-green hover:border-b-2 hover:border-green shrink-0 transition-colors font-medium"
            >
              {cat}
            </Link>
          ))}
          <Link
            to="/search?q=deals"
            className="px-3 py-2.5 text-sm text-red font-semibold shrink-0"
          >
            🔥 Deals
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MobileHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim())
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="md:hidden bg-white border-b border-[#E6EBE8] sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Link to="/" className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-7 bg-green rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-bold">Y</span>
          </div>
          <span className="text-green-deep font-bold text-base leading-tight">
            YouPeak
          </span>
        </Link>
        <button className="flex items-center gap-1 text-text-secondary text-xs flex-1 min-w-0">
          <MapPinIcon className="w-4 h-4 text-green shrink-0" />
          <span className="truncate font-medium">Coimbatore</span>
          <ChevronDownIcon className="w-3 h-3 shrink-0" />
        </button>
        <div className="flex items-center gap-1 shrink-0">
          <Link
            to="/account/notifications"
            className="relative p-1.5 text-text-secondary"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-green rounded-full" />
          </Link>
          <Link to="/cart" className="relative p-1.5 text-text-secondary">
            <CartIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="px-3 pb-2.5">
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-[#F7F9F8] border border-[#E6EBE8] rounded-xl overflow-hidden focus-within:border-green transition-all">
            <SearchIcon className="w-4 h-4 text-text-secondary ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="flex-1 px-3 py-2 bg-transparent text-sm text-text-primary placeholder-text-secondary outline-none"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

export function MobilePageHeader({
  title,
  showBack = true,
}: {
  title: string;
  showBack?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <header className="md:hidden bg-white border-b border-[#E6EBE8] sticky top-0 z-40 flex items-center gap-3 px-4 py-3">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-text-primary p-1 -ml-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <h1 className="text-base font-semibold text-text-primary flex-1">
        {title}
      </h1>
    </header>
  );
}
