import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  History,
  Wallet,
  CreditCard,
  Gift,
  Bell,
  BarChart2,
  FileText,
  Truck,
  HeadphonesIcon,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Power,
  Star,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/deliveries", icon: Package, label: "Deliveries" },
  { path: "/history", icon: History, label: "Delivery History" },
  { path: "/earnings", icon: Wallet, label: "Earnings" },
  { path: "/payouts", icon: CreditCard, label: "Payouts" },
  { path: "/incentives", icon: Gift, label: "Incentives" },
  { path: "/notifications", icon: Bell, label: "Notifications" },
  { path: "/performance", icon: BarChart2, label: "Performance" },
  { path: "/profile/documents", icon: FileText, label: "Documents" },
  { path: "/profile/vehicle", icon: Truck, label: "Vehicle" },
  { path: "/support", icon: HeadphonesIcon, label: "Support" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DesktopSidebar({ collapsed, onToggle }: Props) {
  const { driver, isOnline, toggleOnline, unreadCount } = useApp();
  const navigate = useNavigate();

  return (
    <aside
      className={`sidebar-transition flex-shrink-0 h-full flex flex-col ${collapsed ? "w-16" : "w-60"}`}
      style={{ background: "var(--gm-sidebar)" }}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--gm-green)" }}
        >
          <Package size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-sm leading-tight">
              YouPeak
            </div>
            <div className="text-xs font-medium" style={{ color: "#6EE7A0" }}>
              DELIVERY PARTNER
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors group relative ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                    style={{ background: "var(--gm-green)" }}
                  />
                )}
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{label}</span>
                )}
                {label === "Notifications" && unreadCount > 0 && !collapsed && (
                  <span
                    className="ml-auto text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--gm-error)" }}
                  >
                    {unreadCount}
                  </span>
                )}
                {label === "Notifications" && unreadCount > 0 && collapsed && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ background: "var(--gm-error)" }}
                  />
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <button
          onClick={() => navigate("/support")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-white/8 hover:text-white transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <HelpCircle size={18} />
          {!collapsed && (
            <span className="text-sm font-medium">Help Center</span>
          )}
        </button>

        {/* Driver info */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/6">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
              style={{ background: "var(--gm-green-deep)" }}
            >
              {driver.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">
                {driver.name}
              </div>
              <div className="text-white/50 text-xs">{driver.id}</div>
            </div>
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              <span className="text-white/70 text-xs">{driver.rating}</span>
            </div>
          </div>
        )}

        {/* Online toggle */}
        <button
          onClick={toggleOnline}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isOnline
              ? "bg-green-900/40 text-green-400"
              : "bg-white/6 text-white/60"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <Power size={15} />
          {!collapsed && (
            <span className="text-xs font-semibold">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate("/login")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400/80 hover:bg-red-900/20 hover:text-red-400 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
        style={{
          position: "sticky",
          marginTop: "-1rem",
          alignSelf: "flex-end",
        }}
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-gray-500" />
        ) : (
          <ChevronLeft size={12} className="text-gray-500" />
        )}
      </button>
    </aside>
  );
}
