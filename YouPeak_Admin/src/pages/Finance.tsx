import { TrendingUp, DollarSign, Percent, CreditCard } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import KpiCard from "@/components/ui/KpiCard";
import { financialData, revenueBreakdown } from "@/data/mock";

export default function Finance() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Finance Dashboard</h1>
        <div className="flex gap-2 text-xs">
          <span className="px-3 py-1.5 bg-white border border-[#E5E9E8] rounded-md text-[#64748B]">01 Aug 2026</span>
          <span className="text-[#64748B] py-1.5">—</span>
          <span className="px-3 py-1.5 bg-white border border-[#E5E9E8] rounded-md text-[#64748B]">27 Aug 2026</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ["Gross Revenue", "₹28,75,450", "+ 18.4%", DollarSign],
          ["Net Revenue", "₹24,82,450", "+ 16.2%", TrendingUp],
          ["Platform Commission", "₹3,84,290", "+ 19.8%", Percent],
          ["Vendor Payouts", "₹12,48,600", "+ 14.2%", CreditCard],
          ["Pending Payouts", "₹65,420", "+ 11.3%", CreditCard],
        ].map(([t, v, c, Icon]) => (
          <div key={t as string} className="bg-white rounded-lg border border-[#E5E9E8] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#64748B]">{t as string}</p>
                <p className="text-base font-bold text-[#10252E] mt-1">{v as string}</p>
              </div>
              <span className="bg-green-50 text-green-600 p-1.5 rounded-lg"><Icon size={14} /></span>
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-0.5"><TrendingUp size={10} /> {c as string} vs prev 30 days</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#10252E]">Revenue Trend</h3>
            <div className="flex gap-2">
              {["Monthly", "Weekly", "Daily"].map((t, i) => (
                <button key={t} className={`px-2.5 py-1 text-xs rounded-md font-medium ${i === 0 ? "bg-[#16A34A] text-white" : "bg-[#F5F7F7] text-[#64748B] hover:text-[#10252E]"}`}>{t}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={financialData}>
              <defs>
                <linearGradient id="gross" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="net" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #E5E9E8" }} />
              <Area type="monotone" dataKey="gross" name="Gross Revenue" stroke="#16A34A" strokeWidth={2} fill="url(#gross)" dot={false} />
              <Area type="monotone" dataKey="net" name="Net Revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#net)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Revenue Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value">
                  {revenueBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`, ""]} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {revenueBreakdown.map(b => (
              <div key={b.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                  <span className="text-[10px] text-[#64748B]">{b.name}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#10252E]">₹{b.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
        <h3 className="text-sm font-semibold text-[#10252E] mb-3">Financial Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-3 text-center">
          {[
            ["Payments", "₹38,75,450"],
            ["Escrow", "₹2,09,14,160"],
            ["Cashback", "₹3,84,290"],
            ["Gateway Fees", "₹1,25,250"],
            ["Refunds", "₹60,588"],
            ["Taxes", "₹1,05,310"],
            ["Net Platform Revenue", "₹24,82,450"],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#F8FAFB] rounded-lg p-3 border border-[#E5E9E8]">
              <p className="text-[10px] text-[#64748B] mb-1">{k}</p>
              <p className="text-sm font-bold text-[#10252E]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="text-xs text-[#64748B]">+ 16.4% vs prev period</span>
          <TrendingUp size={14} className="text-green-600" />
        </div>
      </div>
    </div>
  );
}
