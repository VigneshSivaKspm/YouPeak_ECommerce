import { Download, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList
} from "recharts";
import { revenueData, salesFunnelData, topVendors, topCategories } from "@/data/mock";

const categoryColors = ["#16A34A", "#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"];

const customerGrowth = [
  { name: "Apr", value: 18000 },
  { name: "May", value: 22000 },
  { name: "Jun", value: 25000 },
  { name: "Jul", value: 28000 },
  { name: "Aug", value: 34580 },
];

export default function Analytics() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <select className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] outline-none">
            <option>30 Days</option>
            <option>7 Days</option>
            <option>90 Days</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Download size={12} /> Export</button>
        </div>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#10252E]">Sales Trend</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-[#16A34A] rounded-full inline-block" />Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-[#3B82F6] rounded-full inline-block" />Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="analyticsRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #E5E9E8" }} />
              <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#analyticsRev)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Top Selling Categories</h3>
          <div className="flex items-center justify-center mb-3">
            <div className="relative">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={topCategories.map((c, i) => ({ ...c, value: c.pct, color: categoryColors[i] }))} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                    {topCategories.map((_, i) => <Cell key={i} fill={categoryColors[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-bold text-[#10252E]">₹24.82L</p>
                  <p className="text-[9px] text-[#64748B]">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            {topCategories.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: categoryColors[i] }} />
                <span className="text-[10px] text-[#64748B] flex-1 truncate">{c.name}</span>
                <span className="text-[10px] font-semibold text-[#10252E]">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Customer Growth */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#10252E]">Customer Growth</h3>
            <span className="text-xs text-green-600 flex items-center gap-0.5"><TrendingUp size={11} /> +9.6%</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={customerGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #E5E9E8" }} />
              <Bar dataKey="value" fill="#16A34A" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Funnel */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Sales Funnel</h3>
          <div className="space-y-1.5">
            {salesFunnelData.map((step, i) => (
              <div key={step.name}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[10px] text-[#64748B]">{step.name}</span>
                  <span className="text-[10px] font-semibold text-[#10252E]">{step.value.toLocaleString()} <span className="text-[#64748B]">({step.pct}%)</span></span>
                </div>
                <div className="h-4 bg-[#F1F5F9] rounded" style={{ paddingLeft: `${i * 5}%`, paddingRight: `${i * 5}%` }}>
                  <div className="h-full bg-[#16A34A] rounded" style={{ width: `${step.pct}%`, opacity: 0.9 - i * 0.1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Top Vendors by Revenue</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#E5E9E8]">
                  {["Vendor", "Orders", "Revenue", "Commission"].map(h => (
                    <th key={h} className="text-left pb-2 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {topVendors.map(v => (
                  <tr key={v.name} className="hover:bg-[#F8FAFB]">
                    <td className="py-2 text-[#10252E] font-medium">{v.name}</td>
                    <td className="py-2 text-[#64748B]">{v.orders.toLocaleString()}</td>
                    <td className="py-2 font-semibold text-[#10252E]">{v.revenue}</td>
                    <td className="py-2 text-[#64748B]">{v.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
