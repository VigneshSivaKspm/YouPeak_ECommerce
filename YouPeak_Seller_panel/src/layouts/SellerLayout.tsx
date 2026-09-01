import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  Store,
  Megaphone,
  Star,
  RotateCcw,
  DollarSign,
  Wallet,
  BarChart2,
  FileText,
  Headphones,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  CircleDot,
} from "lucide-react";
import { seller } from "@/data/mockData";
import { Avatar } from "@/components/ui";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Orders", icon: ShoppingCart, path: "/orders" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Inventory", icon: Boxes, path: "/inventory" },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Store", icon: Store, path: "/store" },
  { label: "Marketing", icon: Megaphone, path: "/marketing" },
  { label: "Reviews", icon: Star, path: "/reviews" },
  { label: "Returns", icon: RotateCcw, path: "/returns" },
  { label: "Earnings", icon: DollarSign, path: "/earnings" },
  { label: "Payouts", icon: Wallet, path: "/payouts" },
  { label: "Analytics", icon: BarChart2, path: "/analytics" },
  { label: "Reports", icon: FileText, path: "/reports" },
  { label: "Support", icon: Headphones, path: "/support" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

function YouPeakLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}
    >
      <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5" />
          <path
            d="M16 10a4 4 0 0 1-8 0"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      {!collapsed && (
        <div>
          <div className="text-white font-bold text-base leading-tight">
            YouPeak
          </div>
          <div className="text-[#64A77E] text-[10px] leading-tight font-medium">
            Vendor Panel
          </div>
        </div>
      )}
    </div>
  );
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`flex items-center justify-between px-4 py-4 border-b border-white/10`}
      >
        <YouPeakLogo collapsed={collapsed} />
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-white/40 hover:text-white/80 transition-colors hidden lg:flex"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-3 px-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            onClick={() => setMobileSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 transition-all text-sm font-medium group
              ${
                isActive
                  ? "bg-[#16A34A] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/8"
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-3 border-t border-white/10 pt-3">
        <NavLink
          to="/support"
          onClick={() => setMobileSidebarOpen(false)}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all text-sm font-medium mb-2"
          title={collapsed ? "Help Center" : undefined}
        >
          <HelpCircle size={16} className="shrink-0" />
          {!collapsed && <span>Help Center</span>}
        </NavLink>

        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg ${collapsed ? "justify-center" : ""}`}
        >
          <Avatar name={seller.name} size="sm" />
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">
                {seller.name}
              </p>
              <p className="text-white/50 text-[10px] truncate">
                {seller.store}
              </p>
            </div>
          )}
          {!collapsed && (
            <div className="flex items-center gap-1">
              <CircleDot size={10} className="text-green-400" />
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium mt-1"
          >
            <LogOut size={16} className="shrink-0" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full bg-[#F5F7F6]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 bg-[#102A33] transition-all duration-300 ${collapsed ? "w-14" : "w-56"}`}
      >
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute left-2 top-4 z-10 text-white/40 hover:text-white/80 transition-colors mt-1 ml-1"
          ></button>
        )}
        {sidebarContent}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute left-0 top-0 w-14 flex items-center justify-center h-16 text-white/40 hover:text-white/80 transition-colors z-20"
          >
            <PanelLeft size={16} />
          </button>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-[#102A33] flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-[#E5E9E8] flex items-center px-4 gap-3 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-[#64748B] hover:text-[#10252E]"
          >
            <Menu size={20} />
          </button>

          {/* Status */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            <span>All Systems Operational</span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden sm:block">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="h-8 w-52 pl-8 pr-3 text-xs border border-[#E5E9E8] rounded-lg bg-[#F5F7F6] text-[#10252E] placeholder:text-[#64748B] focus:outline-none focus:border-[#16A34A] focus:bg-white transition-colors"
            />
          </div>

          {/* Notif */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F6] transition-colors"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E5E9E8] rounded-xl shadow-xl z-30 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E5E9E8] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#10252E]">
                    Notifications
                  </span>
                  <span className="text-xs text-[#16A34A] font-medium cursor-pointer">
                    Mark all read
                  </span>
                </div>
                {[
                  {
                    title: "New order received",
                    desc: "ORD-102938 from Ramesh Kumar",
                    time: "2m ago",
                    unread: true,
                  },
                  {
                    title: "Low stock alert",
                    desc: "Wireless Earbuds — only 12 left",
                    time: "1h ago",
                    unread: true,
                  },
                  {
                    title: "Payout processed",
                    desc: "₹78,450 credited to your account",
                    time: "Yesterday",
                    unread: false,
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 flex gap-3 ${n.unread ? "bg-green-50/50" : ""} hover:bg-[#F5F7F6] cursor-pointer border-b border-[#E5E9E8] last:border-0`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? "bg-[#16A34A]" : "bg-transparent"}`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#10252E]">
                        {n.title}
                      </p>
                      <p className="text-xs text-[#64748B] truncate">
                        {n.desc}
                      </p>
                      <p className="text-[10px] text-[#64748B] mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help */}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F6] transition-colors">
            <HelpCircle size={18} />
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-[#F5F7F6] transition-colors"
            >
              <Avatar name={seller.name} size="sm" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-[#10252E] leading-tight">
                  {seller.name}
                </p>
                <p className="text-[10px] text-[#64748B] leading-tight">
                  {seller.store}
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`text-[#64748B] transition-transform ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E5E9E8] rounded-xl shadow-xl z-30 py-1 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E5E9E8]">
                  <p className="text-sm font-semibold text-[#10252E]">
                    {seller.name}
                  </p>
                  <p className="text-xs text-[#64748B]">{seller.email}</p>
                </div>
                {[
                  { label: "My Profile" },
                  { label: "Store Profile" },
                  { label: "Account Settings" },
                  { label: "Security" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#10252E] hover:bg-[#F5F7F6] transition-colors flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronRight size={14} className="text-[#64748B]" />
                  </button>
                ))}
                <div className="border-t border-[#E5E9E8] mt-1 pt-1">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}
