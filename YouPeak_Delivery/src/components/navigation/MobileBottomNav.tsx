import { NavLink } from "react-router-dom";
import { Home, Package, Wallet, Bell, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

const items = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/deliveries", icon: Package, label: "Deliveries" },
  { path: "/earnings", icon: Wallet, label: "Earnings" },
  { path: "/notifications", icon: Bell, label: "Alerts" },
  { path: "/profile", icon: User, label: "Profile" },
];

export default function MobileBottomNav() {
  const { unreadCount } = useApp();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t mobile-bottom-nav"
      style={{ borderColor: "var(--gm-border)" }}
    >
      <div className="flex items-stretch">
        {items.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className="flex-1"
          >
            {({ isActive }) => (
              <div className={`flex flex-col items-center justify-center pt-2.5 pb-1 gap-0.5 transition-colors ${
                isActive ? "" : "text-gray-400"
              }`}>
                <div className="relative">
                  <Icon
                    size={22}
                    className={isActive ? "" : ""}
                    style={isActive ? { color: "var(--gm-green)" } : {}}
                  />
                  {label === "Alerts" && unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                      style={{ background: "var(--gm-error)" }}
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}
                  style={isActive ? { color: "var(--gm-green)" } : {}}
                >
                  {label}
                </span>
                {isActive && (
                  <span className="w-4 h-0.5 rounded-full mt-0.5" style={{ background: "var(--gm-green)" }} />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
