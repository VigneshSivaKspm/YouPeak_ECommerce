import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DesktopSidebar from "@/components/navigation/DesktopSidebar";
import DesktopHeader from "@/components/navigation/DesktopHeader";
import MobileHeader from "@/components/navigation/MobileHeader";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import NewDeliveryRequest from "@/components/delivery/NewDeliveryRequest";
import { useApp } from "@/context/AppContext";

// Routes where mobile bottom nav is hidden (focused delivery flows)
const hideBottomNavRoutes = [
  "/deliveries/:id/navigation",
  "/deliveries/:id/verify-pickup",
  "/deliveries/:id/package-check",
  "/deliveries/:id/verify-delivery",
  "/deliveries/:id/proof",
];

function shouldHideBottomNav(pathname: string): boolean {
  return (
    pathname.includes("/navigation") ||
    pathname.includes("/verify-pickup") ||
    pathname.includes("/package-check") ||
    pathname.includes("/verify-delivery") ||
    pathname.includes("/proof")
  );
}

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { showNewRequest } = useApp();

  const hideMobileNav = shouldHideBottomNav(location.pathname);

  return (
    <div className="h-full flex" style={{ background: "var(--gm-bg)" }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex relative">
        <DesktopSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden lg:block">
          <DesktopHeader />
        </div>

        {/* Mobile header */}
        <div className="lg:hidden">
          <MobileHeader />
        </div>

        {/* Content */}
        <main
          className={`flex-1 overflow-y-auto page-enter ${!hideMobileNav ? "lg:pb-0 pb-20" : ""}`}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      {!hideMobileNav && (
        <div className="lg:hidden">
          <MobileBottomNav />
        </div>
      )}

      {/* New delivery request overlay */}
      {showNewRequest && <NewDeliveryRequest />}
    </div>
  );
}
