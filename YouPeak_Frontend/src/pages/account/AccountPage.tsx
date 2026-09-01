import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useApp } from "../../context/AppContext";
import {
  PackageIcon,
  HeartIcon,
  UserIcon,
  MapPinIcon,
  WalletIcon,
  GiftIcon,
  TagIcon,
  UsersIcon,
  BellIcon,
  HelpIcon,
  SettingsIcon,
  LockIcon,
  GlobeIcon,
  LogoutIcon,
  ChevronRightIcon,
  ShieldIcon,
} from "../../components/common/Icons";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
  badge?: string;
  color?: string;
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "ORDERS",
    items: [
      { icon: PackageIcon, label: "My Orders", to: "/orders" },
      { icon: HeartIcon, label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { icon: UserIcon, label: "Profile", to: "/account/profile" },
      { icon: MapPinIcon, label: "Addresses", to: "/account/addresses" },
      {
        icon: WalletIcon,
        label: "Wallet",
        to: "/account/wallet",
        badge: "₹1,250",
      },
      {
        icon: GiftIcon,
        label: "Rewards",
        to: "/account/rewards",
        badge: "320 pts",
      },
      {
        icon: TagIcon,
        label: "Coupons",
        to: "/account/coupons",
        badge: "5 Available",
        color: "text-green",
      },
      {
        icon: UsersIcon,
        label: "Refer & Earn",
        to: "/account/referral",
        badge: "Earn ₹500",
      },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      {
        icon: BellIcon,
        label: "Notifications",
        to: "/account/notifications",
        badge: "2 new",
        color: "text-red",
      },
      { icon: HelpIcon, label: "Help & Support", to: "/account/support" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { icon: GlobeIcon, label: "Language", to: "/account/settings" },
      { icon: LockIcon, label: "Privacy", to: "/account/settings" },
      { icon: ShieldIcon, label: "Security", to: "/account/settings" },
    ],
  },
];

export default function AccountPage() {
  const { user, isLoggedIn, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainLayout hideMobileHeader>
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#E6EBE8] px-4 py-3">
        <h1 className="text-base font-bold text-text-primary">My Account</h1>
      </div>

      <div className="max-w-2xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {user?.name?.[0] ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-text-primary">
                {user?.name ?? "Guest User"}
              </p>
              <p className="text-xs text-text-secondary">{user?.phone}</p>
              <p className="text-xs text-text-secondary">{user?.email}</p>
            </div>
            <Link
              to="/account/profile"
              className="shrink-0 px-3 py-1.5 border border-green text-green rounded-lg text-xs font-semibold hover:bg-green-soft transition-colors"
            >
              Edit Profile
            </Link>
          </div>
          {/* Premium badge */}
          <div className="mt-4 flex items-center gap-2 bg-gradient-to-r from-green-deep to-green rounded-xl p-3 text-white">
            <span className="text-xl">🌟</span>
            <div className="flex-1">
              <p className="text-xs font-bold">YouPeak Premium</p>
              <p className="text-[10px] opacity-80">
                Enjoy unlimited free delivery & more
              </p>
            </div>
            <button className="bg-white text-green text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              Join Now
            </button>
          </div>
        </div>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden"
          >
            <div className="px-4 py-2.5 bg-gray-50 border-b border-[#E6EBE8]">
              <p className="text-[10px] font-bold text-text-secondary tracking-wider">
                {section.title}
              </p>
            </div>
            {section.items.map((item, i) => (
              <Link
                key={item.to + i}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E6EBE8] last:border-0 hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-green-soft flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-green" />
                </div>
                <span className="flex-1 text-sm font-medium text-text-primary">
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className={`text-xs font-semibold mr-1 ${item.color ?? "text-text-secondary"}`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              </Link>
            ))}
          </div>
        ))}

        {/* Logout */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red/5 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-red/10 flex items-center justify-center shrink-0">
              <LogoutIcon className="w-4 h-4 text-red" />
            </div>
            <span className="flex-1 text-sm font-medium text-red text-left">
              Logout
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
