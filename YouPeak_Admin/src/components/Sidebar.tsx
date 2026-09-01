import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Award,
  Store,
  Users,
  Truck,
  RotateCcw,
  Star,
  DollarSign,
  CreditCard,
  Megaphone,
  Ticket,
  BarChart2,
  FileText,
  Headphones,
  Bell,
  FileCode,
  Shield,
  Settings,
  ChevronRight,
  HelpCircle,
  LogOut,
  ShoppingBag,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    label: "Orders",
    icon: ShoppingCart,
    path: "/orders",
    children: [
      { label: "All Orders", path: "/orders" },
      { label: "Order Details", path: "/orders/1" },
    ],
  },
  {
    label: "Products",
    icon: Package,
    path: "/products",
    children: [
      { label: "All Products", path: "/products" },
      { label: "Product Approval", path: "/product-approval" },
    ],
  },
  { label: "Categories", icon: Tag, path: "/categories" },
  { label: "Brands", icon: Award, path: "/brands" },
  {
    label: "Vendors",
    icon: Store,
    path: "/vendors",
    children: [
      { label: "All Vendors", path: "/vendors" },
      { label: "Vendor Details", path: "/vendors/1" },
    ],
  },
  { label: "Customers", icon: Users, path: "/customers" },
  { label: "Delivery", icon: Truck, path: "/delivery" },
  { label: "Returns", icon: RotateCcw, path: "/returns" },
  { label: "Reviews", icon: Star, path: "/reviews" },
  { label: "Finance", icon: DollarSign, path: "/finance" },
  { label: "Payouts", icon: CreditCard, path: "/payouts" },
  { label: "Marketing", icon: Megaphone, path: "/marketing" },
  { label: "Coupons", icon: Ticket, path: "/coupons" },
  { label: "Banners", icon: Package, path: "/banners" },
  { label: "Analytics", icon: BarChart2, path: "/analytics" },
  { label: "Reports", icon: FileText, path: "/reports" },
  { label: "Support", icon: Headphones, path: "/support" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "CMS", icon: FileCode, path: "/cms" },
  { label: "Administration", icon: Shield, path: "/administration" },
  { label: "Audit Logs", icon: FileText, path: "/audit-logs" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: Props) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) =>
    setOpenGroups((p) => ({ ...p, [label]: !p[label] }));

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside
      className={`flex flex-col h-full bg-[#0B2730] transition-all duration-300 ${collapsed ? "w-16" : "w-56"} flex-shrink-0`}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-3 py-4 border-b border-white/10">
        <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingBag size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight">
              YouPeak
            </p>
            <p className="text-[#64748B] text-[10px] uppercase tracking-wider">
              Admin Console
            </p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-[#64748B] hover:text-white transition-colors flex-shrink-0"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const hasChildren = item.children && item.children.length > 0;
          const open = openGroups[item.label];

          if (hasChildren && !collapsed) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-colors text-[13px] ${active ? "bg-[#16A34A] text-white" : "text-[#94A3B8] hover:text-white hover:bg-white/10"}`}
                >
                  <item.icon size={15} className="flex-shrink-0" />
                  <span className="flex-1 truncate font-medium">
                    {item.label}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="ml-6 mt-0.5 space-y-0.5">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive: ia }) =>
                          `block px-2.5 py-1.5 rounded-md text-[12px] transition-colors ${ia ? "text-white bg-white/10" : "text-[#64748B] hover:text-white hover:bg-white/5"}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors text-[13px] ${active ? "bg-[#16A34A] text-white" : "text-[#94A3B8] hover:text-white hover:bg-white/10"}`}
            >
              <item.icon size={15} className="flex-shrink-0" />
              {!collapsed && (
                <span className="truncate font-medium">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-2 space-y-0.5">
        <button className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[#94A3B8] hover:text-white hover:bg-white/10 w-full text-[13px] transition-colors">
          <HelpCircle size={15} />
          {!collapsed && <span className="font-medium">Help Center</span>}
        </button>
        <div
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md ${!collapsed ? "justify-between" : "justify-center"}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              A
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-white text-[12px] font-semibold truncate">
                  Admin
                </p>
                <p className="text-[#64748B] text-[10px]">Super Admin</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button className="text-[#64748B] hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
