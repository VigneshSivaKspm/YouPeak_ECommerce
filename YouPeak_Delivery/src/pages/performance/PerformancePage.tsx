import { useApp } from "@/context/AppContext";
import { Star, TrendingUp, Package, Clock, CheckCircle2, XCircle } from "lucide-react";

function RingChart({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 90 90" className="w-full h-full">
          <circle cx="45" cy="45" r={r} fill="none" stroke="#F1F5F9" strokeWidth="8" />
          <circle
            cx="45" cy="45" r={r}
            fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            className="perf-ring"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black" style={{ color: "var(--gm-text)" }}>{value}%</span>
        </div>
      </div>
      <div className="text-xs font-medium text-center" style={{ color: "var(--gm-text-muted)" }}>{label}</div>
    </div>
  );
}

export default function PerformancePage() {
  const { driver } = useApp();

  const metrics = [
    { label: "Total Deliveries", value: "1,248", icon: <Package size={18} style={{ color: "var(--gm-green)" }} />, bg: "var(--gm-green-light)" },
    { label: "Avg Rating", value: "4.8★", icon: <Star size={18} className="fill-yellow-400 text-yellow-400" />, bg: "#FFFBEB" },
    { label: "On-Time Rate", value: "94%", icon: <Clock size={18} className="text-blue-500" />, bg: "#EFF6FF" },
    { label: "Cancellation Rate", value: "2%", icon: <XCircle size={18} className="text-red-500" />, bg: "#FFF1F1" },
  ];

  const periods = ["This Month", "Last Month", "All Time"];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ background: "var(--gm-green)" }}>
            {driver.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="text-lg font-bold" style={{ color: "var(--gm-text)" }}>{driver.name}</div>
            <div className="text-xs text-gray-400">{driver.id} · Joined {driver.joinDate}</div>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={13} className={s <= Math.floor(driver.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
              ))}
              <span className="text-xs font-semibold ml-1" style={{ color: "var(--gm-text)" }}>{driver.rating}</span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-3xl font-black" style={{ color: "var(--gm-text)" }}>{driver.totalDeliveries.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Deliveries</div>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--gm-border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: m.bg }}>
              {m.icon}
            </div>
            <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>{m.value}</div>
            <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Performance rings */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-sm" style={{ color: "var(--gm-text)" }}>Performance Overview</h3>
          <select className="text-xs border rounded-lg px-2 py-1.5 outline-none" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}>
            {periods.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex justify-around flex-wrap gap-4">
          <RingChart value={96} label="Acceptance Rate" color="#16A34A" />
          <RingChart value={98} label="Completion Rate" color="#3B82F6" />
          <RingChart value={94} label="On-Time Rate" color="#F59E0B" />
          <RingChart value={96} label="Customer Rating" color="#8B5CF6" />
        </div>
      </div>

      {/* Monthly breakdown */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <h3 className="font-bold text-sm mb-4" style={{ color: "var(--gm-text)" }}>Monthly Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: "Deliveries Completed", value: "9 of 12 assigned", pct: 75 },
            { label: "On-Time Deliveries", value: "8 of 9 completed", pct: 89 },
            { label: "5-Star Ratings", value: "7 of 9", pct: 78 },
            { label: "Zero-Issue Deliveries", value: "9 of 9", pct: 100 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{item.label}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--gm-text)" }}>{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.pct >= 80 ? "var(--gm-green)" : "#F59E0B" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
