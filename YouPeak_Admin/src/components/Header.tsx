import { useLocation } from "react-router-dom";
import { Search, Bell, Zap, HelpCircle, ChevronDown, CheckCircle } from "lucide-react";
import { useState } from "react";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/orders": "Orders",
  "/products": "Products",
  "/product-approval": "Product Approval",
  "/categories": "Categories",
  "/brands": "Brands",
  "/vendors": "Vendors",
  "/customers": "Customers",
  "/delivery": "Delivery Operations",
  "/returns": "Returns & Refunds",
  "/reviews": "Reviews & Moderation",
  "/finance": "Finance Dashboard",
  "/payouts": "Vendor Payouts",
  "/marketing": "Marketing Center",
  "/coupons": "Coupons",
  "/banners": "Banners",
  "/analytics": "Analytics",
  "/reports": "Reports Center",
  "/support": "Support Center",
  "/notifications": "Notifications",
  "/cms": "CMS",
  "/administration": "Administration",
  "/audit-logs": "Audit Logs",
  "/settings": "Settings & Security",
};

export default function Header() {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const pathKey = "/" + location.pathname.split("/")[1];
  const title = titleMap[pathKey] ?? "Dashboard";
  const breadcrumbs = ["Dashboard", title].filter((b, i, arr) => b !== arr[i - 1]);

  return (
    <header className="h-14 bg-white border-b border-[#E5E9E8] flex items-center px-4 gap-4 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0 flex-shrink-0">
        {breadcrumbs.map((b, i) => (
          <span key={b} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[#CBD5E1] text-xs">/</span>}
            <span className={`text-sm ${i === breadcrumbs.length - 1 ? "font-semibold text-[#10252E]" : "text-[#64748B]"}`}>{b}</span>
          </span>
        ))}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs ml-4">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search orders, products, customers..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A] transition-colors placeholder:text-[#94A3B8]"
          />
        </div>
      </div>

      {/* Status */}
      <div className="ml-auto flex items-center gap-1.5 text-xs text-[#10252E] border border-[#E5E9E8] rounded-md px-2.5 py-1.5">
        <CheckCircle size={13} className="text-green-500" fill="currentColor" />
        <span className="font-medium hidden sm:block">All Systems Operational</span>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-1">
        {[Bell, Zap, HelpCircle].map((Icon, i) => (
          <button key={i} className="relative p-1.5 text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F7] rounded-md transition-colors">
            <Icon size={16} />
            {i === 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
            )}
          </button>
        ))}
      </div>

      {/* Profile */}
      <button className="flex items-center gap-2 pl-2 border-l border-[#E5E9E8]">
        <div className="w-7 h-7 rounded-full bg-[#16A34A] flex items-center justify-center text-white text-xs font-bold">A</div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-semibold text-[#10252E] leading-tight">Admin</p>
          <p className="text-[10px] text-[#64748B]">Super Admin</p>
        </div>
        <ChevronDown size={12} className="text-[#94A3B8]" />
      </button>
    </header>
  );
}
