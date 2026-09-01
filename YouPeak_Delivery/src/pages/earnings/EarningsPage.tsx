import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockTransactions, mockEarningsChart } from "@/data/mockData";

type Period = "daily" | "weekly" | "monthly" | "yearly";

export default function EarningsPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("weekly");

  const totalEarnings = 28450;
  const available = 8420;
  const pending = 1200;

  const transactionIcons: Record<string, string> = {
    delivery: "📦", incentive: "⭐", bonus: "🎁", tip: "💝", adjustment: "⚖️",
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* Balance cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main balance */}
        <div className="lg:col-span-1 rounded-2xl p-5 text-white" style={{ background: "var(--gm-sidebar)" }}>
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={16} className="text-white/70" />
            <span className="text-xs font-medium text-white/70">Available Balance</span>
          </div>
          <div className="text-4xl font-black mb-4">₹{available.toLocaleString()}</div>
          <button
            onClick={() => navigate("/payouts")}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--gm-green)" }}
          >
            Request Payout
          </button>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-3 gap-3">
          {[
            { label: "Today", value: 1240 },
            { label: "This Week", value: 7840 },
            { label: "This Month", value: totalEarnings },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--gm-border)" }}>
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>₹{s.value.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={11} style={{ color: "var(--gm-green)" }} />
                <span className="text-[10px] font-medium" style={{ color: "var(--gm-green)" }}>+12%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm" style={{ color: "var(--gm-text)" }}>Earnings Overview</h3>
          <div className="flex gap-1 p-1 rounded-xl bg-gray-100">
            {(["daily", "weekly", "monthly", "yearly"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${period === p ? "bg-white shadow-sm text-gray-800" : "text-gray-500"}`}
              >
                {p === "daily" ? "D" : p === "weekly" ? "W" : p === "monthly" ? "M" : "Y"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={mockEarningsChart} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="earningGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip
              formatter={(v) => [`₹${v}`, "Earnings"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E6EBE8", fontSize: 12 }}
            />
            <Area type="monotone" dataKey="amount" stroke="#16A34A" strokeWidth={2.5} fill="url(#earningGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "var(--gm-text)" }}>Earnings Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: "Delivery Earnings", amount: 22850, pct: 80 },
              { label: "Incentives & Bonuses", amount: 3600, pct: 13 },
              { label: "Customer Tips", amount: 1200, pct: 4 },
              { label: "Adjustments", amount: -1200, pct: -4 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{item.label}</span>
                  <span className={`text-sm font-bold ${item.amount < 0 ? "text-red-500" : ""}`} style={item.amount >= 0 ? { color: "var(--gm-text)" } : {}}>
                    {item.amount < 0 ? "-" : ""}₹{Math.abs(item.amount).toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.abs(item.pct)}%`, background: item.amount < 0 ? "#EF4444" : "var(--gm-green)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm" style={{ color: "var(--gm-text)" }}>Pending Amount</h3>
            <span className="text-xl font-black text-amber-600">₹{pending.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500 mb-4">Next payout scheduled for 30 Aug 2026</div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-xs text-amber-700">
            Pending amount will be credited after order verification.
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--gm-border)" }}>
          <h3 className="font-bold text-sm" style={{ color: "var(--gm-text)" }}>Transaction History</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}>
                {["Type", "Order ID", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gm-text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--gm-border)" }}>
              {mockTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{transactionIcons[t.type]}</span>
                      <span className="text-sm capitalize" style={{ color: "var(--gm-text)" }}>{t.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{t.orderId}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{t.date}</td>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: t.amount < 0 ? "#EF4444" : "var(--gm-green)" }}>
                    {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.status === "credited" ? "badge-active" : t.status === "debited" ? "badge-failed" : "badge-pending"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="lg:hidden divide-y" style={{ borderColor: "var(--gm-border)" }}>
          {mockTransactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gray-50 flex-shrink-0">
                {transactionIcons[t.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold capitalize" style={{ color: "var(--gm-text)" }}>{t.type}</div>
                <div className="text-xs text-gray-400">{t.orderId !== "-" ? `#${t.orderId} · ` : ""}{t.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-sm font-bold ${t.amount < 0 ? "text-red-500" : ""}`} style={t.amount >= 0 ? { color: "var(--gm-green)" } : {}}>
                  {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                </div>
                <div className="text-xs text-gray-400 capitalize">{t.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
