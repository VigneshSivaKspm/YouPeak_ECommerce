import { DollarSign, ShoppingCart, Users, Store, Package, Clock, BarChart2, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import KpiCard from "@/components/ui/KpiCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { revenueData, orderStatusData, orders, topCategories } from "@/data/mock";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#10252E]">Good morning, Admin 👋</h1>
          <p className="text-xs text-[#64748B]">Here's your marketplace performance overview.</p>
        </div>
        <div className="flex gap-2">
          {["Today", "7 Days", "30 Days", "90 Days", "Custom"].map((t, i) => (
            <button key={t} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${i === 1 ? "bg-[#16A34A] text-white" : "bg-white border border-[#E5E9E8] text-[#64748B] hover:text-[#10252E]"}`}>{t}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard title="Total Revenue" value="₹24,82,450" change="+ 18.4%" sub="vs last 30 days" icon={DollarSign} />
        <KpiCard title="Orders" value="18,492" change="+ 15.6%" sub="vs last 30 days" icon={ShoppingCart} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <KpiCard title="Customers" value="1,24,580" change="+ 9.4%" sub="vs last 30 days" icon={Users} iconBg="bg-purple-50" iconColor="text-purple-600" />
        <KpiCard title="Vendors" value="1,284" change="+ 5.2%" sub="vs last 30 days" icon={Store} iconBg="bg-orange-50" iconColor="text-orange-600" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <p className="text-xs text-[#64748B] font-medium">Products</p>
          <p className="text-xl font-bold text-[#10252E] mt-1">48,620</p>
          <p className="text-xs text-[#64748B] mt-1">Active Products</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <p className="text-xs text-[#64748B] font-medium">Pending Orders</p>
          <p className="text-xl font-bold text-[#10252E] mt-1">842</p>
          <p className="text-xs text-red-500 mt-1">Requires Attention</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <p className="text-xs text-[#64748B] font-medium">Platform Commission</p>
          <p className="text-xl font-bold text-[#10252E] mt-1">₹3,84,290</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={10} /> + 16.7%</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <p className="text-xs text-[#64748B] font-medium">Pending Payouts</p>
          <p className="text-xl font-bold text-[#10252E] mt-1">₹2,14,800</p>
          <p className="text-xs text-[#64748B] mt-1">Total Amount</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#10252E]">Revenue Overview</h3>
              <div className="flex gap-4 mt-1">
                {["Revenue", "Orders", "Commission", "Net Earnings"].map((t, i) => (
                  <button key={t} className={`text-xs font-medium px-2 py-0.5 rounded ${i === 0 ? "bg-green-50 text-green-700" : "text-[#64748B]"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#10252E]">₹24,82L</p>
              <p className="text-xs text-green-600">+ 18.41% vs last 30 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #E5E9E8" }} />
              <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#rev)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-1">Order Status Overview</h3>
          <div className="relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [Number(v).toLocaleString(), ""]} contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <p className="text-xl font-bold text-[#10252E]">18,492</p>
              <p className="text-[10px] text-[#64748B]">Total Orders</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {orderStatusData.map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-[10px] text-[#64748B] truncate">{s.name} {s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Health + Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Marketplace Health</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-[#64748B] font-medium mb-2 flex items-center gap-1"><Store size={11} />Vendors</p>
              <div className="space-y-1">
                {[["Active", "1,124"], ["Pending Approval", "86"], ["Suspended", "74"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-xs text-[#64748B]">{l}</span>
                    <span className="text-xs font-semibold text-[#10252E]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium mb-2 flex items-center gap-1"><Package size={11} />Products</p>
              <div className="space-y-1">
                {[["Active", "38,250"], ["Pending Approval", "1,345"], ["Out of Stock", "1,125"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-xs text-[#64748B]">{l}</span>
                    <span className="text-xs font-semibold text-[#10252E]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium mb-2 flex items-center gap-1"><BarChart2 size={11} />Delivery</p>
              <div className="space-y-1">
                {[["Online Partners", "₹5,906"], ["Arno Deliveries", "2,145"], ["Out for Delivery:0", "326"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-xs text-[#64748B] truncate mr-1">{l}</span>
                    <span className="text-xs font-semibold text-[#10252E]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Top Sellings</h3>
          <div className="space-y-2.5">
            {topCategories.map(c => (
              <div key={c.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-[#10252E] font-medium">{c.name}</span>
                  <span className="text-xs text-[#64748B]">{c.revenue}</span>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full">
                  <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E9E8]">
          <h3 className="text-sm font-semibold text-[#10252E]">Recent Orders</h3>
          <button className="text-xs text-[#16A34A] font-medium hover:underline">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                {["Order ID", "Customer", "Vendor", "Items", "Date", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[#64748B] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="px-4 py-2.5 font-semibold text-[#16A34A]">{o.id}</td>
                  <td className="px-4 py-2.5 text-[#10252E]">{o.customer}</td>
                  <td className="px-4 py-2.5 text-[#64748B]">{o.vendor}</td>
                  <td className="px-4 py-2.5 text-[#64748B]">{o.items}</td>
                  <td className="px-4 py-2.5 text-[#64748B]">{o.date}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#10252E]">{o.amount}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-2.5">
                    <button className="text-[#64748B] hover:text-[#10252E]">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
