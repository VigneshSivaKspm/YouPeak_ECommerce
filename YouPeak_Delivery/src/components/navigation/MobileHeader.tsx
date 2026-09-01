import { ArrowLeft, Bell, MoreVertical, Power } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const pageLabels: Record<string, string> = {
  "/deliveries": "Deliveries",
  "/history": "Delivery History",
  "/earnings": "Earnings",
  "/payouts": "Payouts",
  "/incentives": "Incentives",
  "/notifications": "Notifications",
  "/performance": "Performance",
  "/profile/documents": "Documents",
  "/profile/vehicle": "Vehicle Details",
  "/profile/bank": "Bank & UPI",
  "/support": "Support",
  "/settings": "Settings",
};

const homeRoutes = ["/", "/earnings", "/deliveries", "/notifications", "/profile"];

export default function MobileHeader() {
  const { driver, isOnline, toggleOnline, unreadCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isMainNav = homeRoutes.includes(location.pathname);
  const title = pageLabels[location.pathname];

  if (isHome) {
    return (
      <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 safe-top" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0" style={{ background: "var(--gm-green)" }}>
              {driver.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-xs text-gray-500">Good morning,</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{driver.name.split(" ")[0]} 👋</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleOnline}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
              {isOnline ? "Online" : "Offline"}
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="relative p-2 rounded-full bg-gray-100"
            >
              <Bell size={18} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ background: "var(--gm-error)" }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center gap-3 safe-top" style={{ borderColor: "var(--gm-border)" }}>
      {!isMainNav && (
        <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      )}
      <h1 className="flex-1 text-base font-semibold" style={{ color: "var(--gm-text)" }}>{title}</h1>
      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
        <MoreVertical size={20} className="text-gray-500" />
      </button>
    </header>
  );
}
