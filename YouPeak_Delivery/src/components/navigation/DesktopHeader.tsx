import {
  Bell,
  Search,
  HelpCircle,
  ChevronDown,
  CheckCircle,
  Power,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

const pageLabels: Record<string, string> = {
  "/": "Dashboard",
  "/deliveries": "Deliveries",
  "/history": "Delivery History",
  "/earnings": "Earnings",
  "/payouts": "Payouts",
  "/incentives": "Incentives",
  "/notifications": "Notifications",
  "/performance": "Performance",
  "/profile": "Profile",
  "/profile/documents": "Documents",
  "/profile/vehicle": "Vehicle Details",
  "/profile/bank": "Bank & UPI",
  "/support": "Support",
  "/settings": "Settings",
};

export default function DesktopHeader() {
  const { driver, isOnline, toggleOnline, unreadCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const title = pageLabels[location.pathname] ?? "YouPeak Driver";

  return (
    <header
      className="h-14 flex items-center gap-4 px-6 border-b bg-white flex-shrink-0"
      style={{ borderColor: "var(--gm-border)" }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-base font-semibold truncate"
          style={{ color: "var(--gm-text)" }}
        >
          {title}
        </h1>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border w-48"
        style={{ borderColor: "var(--gm-border)" }}
      >
        <Search size={14} className="text-gray-400 flex-shrink-0" />
        <input
          className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder:text-gray-400"
          placeholder="Search..."
        />
      </div>

      {/* Status */}
      <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
        <CheckCircle size={13} className="text-green-600" />
        All Systems Operational
      </div>

      {/* Online toggle */}
      <button
        onClick={toggleOnline}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          isOnline ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
        }`}
      >
        <Power size={13} />
        {isOnline ? "Online" : "Offline"}
      </button>

      {/* Notifications */}
      <button
        onClick={() => navigate("/notifications")}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell size={18} className="text-gray-500" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            style={{ background: "var(--gm-error)" }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Help */}
      <button
        onClick={() => navigate("/support")}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <HelpCircle size={18} className="text-gray-500" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
            style={{ background: "var(--gm-green)" }}
          >
            {driver.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="hidden lg:block text-left">
            <div
              className="text-sm font-semibold leading-tight"
              style={{ color: "var(--gm-text)" }}
            >
              {driver.name}
            </div>
            <div
              className="text-xs flex items-center gap-1"
              style={{
                color: isOnline ? "var(--gm-green)" : "var(--gm-text-muted)",
              }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
              />
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
        {profileOpen && (
          <div
            className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border z-50 py-1"
            style={{ borderColor: "var(--gm-border)" }}
          >
            <button
              onClick={() => {
                navigate("/profile");
                setProfileOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: "var(--gm-text)" }}
            >
              My Profile
            </button>
            <button
              onClick={() => {
                navigate("/settings");
                setProfileOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: "var(--gm-text)" }}
            >
              Settings
            </button>
            <hr style={{ borderColor: "var(--gm-border)" }} className="my-1" />
            <button
              onClick={() => {
                navigate("/login");
                setProfileOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
