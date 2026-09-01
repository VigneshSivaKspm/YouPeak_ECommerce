import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Package, CheckCircle2, XCircle } from "lucide-react";
import { mockDeliveries } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

type Period = "today" | "week" | "month" | "custom";
type StatusFilter = "all" | "delivered" | "failed" | "cancelled";

const periods: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "custom", label: "Custom" },
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("today");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = mockDeliveries.filter((d) => {
    if (statusFilter === "all") return ["delivered", "failed", "cancelled"].includes(d.status);
    return d.status === statusFilter || (statusFilter === "failed" && d.status === "failed");
  });

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10" style={{ borderColor: "var(--gm-border)" }}>
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Period */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  period === p.id ? "text-white border-green-500" : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
                style={period === p.id ? { background: "var(--gm-green)" } : {}}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["all", "delivered", "failed", "cancelled"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border capitalize transition-all ${
                  statusFilter === s ? "border-gray-700 bg-gray-700 text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Total", value: filtered.length, icon: <Package size={16} className="text-gray-500" />, bg: "#F8FAFA" },
              { label: "Delivered", value: filtered.filter(d => d.status === "delivered").length, icon: <CheckCircle2 size={16} style={{ color: "var(--gm-green)" }} />, bg: "var(--gm-green-light)" },
              { label: "Failed", value: filtered.filter(d => d.status === "failed" || d.status === "cancelled").length, icon: <XCircle size={16} className="text-red-500" />, bg: "#FFF1F1" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border p-3 text-center" style={{ borderColor: "var(--gm-border)", background: s.bg }}>
                <div className="flex justify-center mb-1">{s.icon}</div>
                <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}>
                  {["Order ID", "Date", "Customer", "Area", "Distance", "Status", "Earnings"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gm-text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--gm-border)" }}>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/deliveries/${d.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: "var(--gm-text)" }}>#{d.orderId}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>27 Aug 2026</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text)" }}>{d.customer.name}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{d.area}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{d.customer.distance}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: d.earning > 0 ? "var(--gm-green)" : "var(--gm-text-muted)" }}>
                      {d.earning > 0 ? `₹${d.earning}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-sm" style={{ color: "var(--gm-text-muted)" }}>No delivery history for this period</div>
            ) : (
              filtered.map((d) => (
                <div
                  key={d.id}
                  className="bg-white rounded-2xl border p-4 cursor-pointer hover:shadow-md transition-all"
                  style={{ borderColor: "var(--gm-border)" }}
                  onClick={() => navigate(`/deliveries/${d.id}`)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>#{d.orderId}</div>
                      <div className="text-xs text-gray-400">27 Aug 2026 · {d.customer.distance}</div>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--gm-text)" }}>{d.customer.name}</div>
                      <div className="text-xs text-gray-400">{d.area}</div>
                    </div>
                    <div className="text-base font-black" style={{ color: d.earning > 0 ? "var(--gm-green)" : "var(--gm-text-muted)" }}>
                      {d.earning > 0 ? `₹${d.earning}` : "—"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
