import { useNavigate } from "react-router-dom";
import { Package, MapPin, Phone, Navigation, Clock, TrendingUp, CheckCircle2, AlertCircle, DollarSign, Scan, History, HeadphonesIcon, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import StatusBadge from "@/components/common/StatusBadge";
import MapView from "@/components/common/MapView";

export default function DashboardPage() {
  const { driver, isOnline, currentDelivery, deliveries, setShowNewRequest } = useApp();
  const navigate = useNavigate();

  const todayDeliveries = deliveries.length;
  const completed = deliveries.filter((d) => d.status === "delivered").length;
  const pending = deliveries.filter((d) => !["delivered", "failed", "cancelled"].includes(d.status)).length;
  const todayEarnings = deliveries.reduce((sum, d) => sum + d.earning, 0);
  const upcoming = deliveries.filter((d) => d.status === "assigned");

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Desktop status banner */}
      <div className="hidden lg:flex items-center justify-between p-4 rounded-2xl text-white" style={{ background: "var(--gm-sidebar)" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: "var(--gm-green)" }}>
            {driver.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-xs text-white/60 font-medium">Good morning,</div>
            <div className="text-xl font-bold">{driver.name} 👋</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`} />
              <span className="text-xs font-medium" style={{ color: isOnline ? "#6EE7A0" : "#94A3B8" }}>
                {isOnline ? "You're available for deliveries" : "You're currently offline"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-black text-white">₹{todayEarnings}</div>
            <div className="text-xs text-white/60">Today's Earnings</div>
          </div>
          <button
            onClick={() => setShowNewRequest(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Bell size={14} className="inline mr-1.5" />
            Simulate Request
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard
          label="Today's Deliveries"
          value={todayDeliveries}
          icon={<Package size={18} style={{ color: "var(--gm-green)" }} />}
          iconBg="var(--gm-green-light)"
          trend="+2 from yesterday"
        />
        <KPICard
          label="Completed"
          value={completed}
          icon={<CheckCircle2 size={18} className="text-blue-600" />}
          iconBg="#DBEAFE"
          trend={`${Math.round((completed / todayDeliveries) * 100)}% rate`}
        />
        <KPICard
          label="Pending"
          value={pending}
          icon={<AlertCircle size={18} className="text-amber-600" />}
          iconBg="#FEF3C7"
        />
        <KPICard
          label="Today's Earnings"
          value={`₹${todayEarnings}`}
          icon={<DollarSign size={18} style={{ color: "var(--gm-green)" }} />}
          iconBg="var(--gm-green-light)"
          trend="+₹215 incentives"
          green
        />
      </div>

      {/* Performance bar (mobile-friendly) */}
      <div className="hidden lg:block bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm" style={{ color: "var(--gm-text)" }}>Today's Performance</h3>
          <button onClick={() => navigate("/performance")} className="text-xs font-medium" style={{ color: "var(--gm-green)" }}>View All</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PerfBar label="Acceptance Rate" value={96} />
          <PerfBar label="Completion Rate" value={98} />
        </div>
      </div>

      {/* Current delivery */}
      {currentDelivery ? (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
          <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "var(--gm-border)", background: "var(--gm-green-light)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold" style={{ color: "var(--gm-green-deep)" }}>Active Delivery</span>
            </div>
            <StatusBadge status={currentDelivery.status} />
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-0">
            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Order</div>
                  <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>#{currentDelivery.orderId}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Payment</div>
                  <div className={`text-sm font-semibold ${currentDelivery.paymentMethod === "COD" ? "text-amber-600" : "text-green-600"}`}>
                    {currentDelivery.paymentMethod === "COD" ? `COD ₹${currentDelivery.amount.toLocaleString()}` : "Online Paid"}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <LocationRow
                  color="bg-amber-100"
                  icon={<MapPin size={12} className="text-amber-600" />}
                  label={currentDelivery.vendor.name}
                  sub={`${currentDelivery.vendor.distance} · ETA ${currentDelivery.vendor.eta}`}
                />
                <LocationRow
                  color="bg-red-100"
                  icon={<MapPin size={12} className="text-red-600" />}
                  label={currentDelivery.customer.name}
                  sub={`${currentDelivery.customer.distance} · ETA ${currentDelivery.customer.eta}`}
                />
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => navigate(`/deliveries/${currentDelivery.id}`)}
                  className="flex-[2] py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                  style={{ background: "var(--gm-green)" }}
                >
                  Continue Delivery
                </button>
                <button className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}>
                  <Phone size={14} /> Call
                </button>
                <button className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}>
                  <Navigation size={14} /> Nav
                </button>
              </div>
            </div>

            {/* Map */}
            <MapView className="h-40 lg:h-auto lg:min-h-[200px]" mode="delivery" deliveryLabel="Customer" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border p-8 text-center" style={{ borderColor: "var(--gm-border)" }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-gray-50">
            <Package size={24} className="text-gray-300" />
          </div>
          <div className="text-sm font-semibold mb-1" style={{ color: "var(--gm-text)" }}>No Active Deliveries</div>
          <div className="text-xs mb-4" style={{ color: "var(--gm-text-muted)" }}>Go online to start receiving delivery requests</div>
          <button className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: "var(--gm-green)" }}>
            Go Online
          </button>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-2 lg:gap-5 space-y-5 lg:space-y-0">
        {/* Upcoming deliveries */}
        <div className="bg-white rounded-2xl border" style={{ borderColor: "var(--gm-border)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="font-semibold text-sm" style={{ color: "var(--gm-text)" }}>Upcoming Deliveries</h3>
            <button onClick={() => navigate("/deliveries")} className="text-xs font-medium" style={{ color: "var(--gm-green)" }}>View All</button>
          </div>
          {upcoming.length > 0 ? (
            <div className="divide-y" style={{ borderColor: "var(--gm-border)" }}>
              {upcoming.map((d) => (
                <div key={d.id} className="px-5 py-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--gm-green-light)" }}>
                    <Package size={16} style={{ color: "var(--gm-green)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: "var(--gm-text)" }}>#{d.orderId}</div>
                    <div className="text-xs truncate" style={{ color: "var(--gm-text-muted)" }}>{d.vendor.name} → {d.area}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock size={11} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{d.customer.distance} · {d.scheduledTime}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/deliveries/${d.id}`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-sm" style={{ color: "var(--gm-text-muted)" }}>No upcoming deliveries</div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border" style={{ borderColor: "var(--gm-border)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="font-semibold text-sm" style={{ color: "var(--gm-text)" }}>Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {[
              { label: "Scan Package", icon: Scan, color: "var(--gm-green-light)", iconColor: "var(--gm-green)", action: () => {} },
              { label: "Navigate", icon: Navigation, color: "#EFF6FF", iconColor: "#3B82F6", action: () => currentDelivery && navigate(`/deliveries/${currentDelivery.id}/navigation`) },
              { label: "Delivery History", icon: History, color: "#F5F3FF", iconColor: "#7C3AED", action: () => navigate("/history") },
              { label: "Call Support", icon: HeadphonesIcon, color: "#FFF7ED", iconColor: "#EA580C", action: () => navigate("/support") },
            ].map(({ label, icon: Icon, color, iconColor, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex flex-col items-center gap-2.5 p-4 rounded-xl hover:shadow-md transition-all hover:-translate-y-0.5 border"
                style={{ background: color, borderColor: "transparent" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
                  <Icon size={18} style={{ color: iconColor }} />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile simulate button */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowNewRequest(true)}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
          style={{ background: "var(--gm-green)" }}
        >
          <Bell size={16} /> Simulate New Request
        </button>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon, iconBg, trend, green }: { label: string; value: string | number; icon: React.ReactNode; iconBg: string; trend?: string; green?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--gm-border)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>
      <div className={`text-xl font-black mb-0.5 ${green ? "" : ""}`} style={green ? { color: "var(--gm-green)" } : { color: "var(--gm-text)" }}>{value}</div>
      <div className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{label}</div>
      {trend && <div className="text-[10px] mt-1 font-medium" style={{ color: "var(--gm-green)" }}>{trend}</div>}
    </div>
  );
}

function PerfBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: "var(--gm-green)" }} />
      </div>
    </div>
  );
}

function LocationRow({ color, icon, label, sub }: { color: string; icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: "var(--gm-text)" }}>{label}</div>
        <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{sub}</div>
      </div>
    </div>
  );
}
