import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ShoppingCart, Package, Users, DollarSign, Clock, Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { kpiData, salesChartData, orderStatusData, topProducts, recentOrders } from "@/data/mockData";
import { KPICard, Card, Badge, Stars, Button } from "@/components/ui";

const chartTabs = ["Daily", "Weekly", "Monthly", "Yearly"];

export default function Dashboard() {
  const [chartTab, setChartTab] = useState("Monthly");
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#10252E]">Good morning, Rajesh 👋</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">Today</Button>
          <Button variant="secondary" size="sm">This Week</Button>
          <Button variant="secondary" size="sm">This Month</Button>
          <Button variant="secondary" size="sm">Custom</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Sales" value={kpiData.totalSales.value} change={kpiData.totalSales.change} trend="up" label={kpiData.totalSales.label}
          icon={<TrendingUp size={18} className="text-green-600" />} iconBg="bg-green-50" />
        <KPICard title="Orders" value={kpiData.orders.value} change={kpiData.orders.change} trend="up" label={kpiData.orders.label}
          icon={<ShoppingCart size={18} className="text-blue-600" />} iconBg="bg-blue-50" />
        <KPICard title="Products" value={kpiData.products.value} label={kpiData.products.label}
          icon={<Package size={18} className="text-purple-600" />} iconBg="bg-purple-50" />
        <KPICard title="Customers" value={kpiData.customers.value} change={kpiData.customers.change} trend="up" label={kpiData.customers.label}
          icon={<Users size={18} className="text-cyan-600" />} iconBg="bg-cyan-50" />
        <KPICard title="Pending Orders" value={kpiData.pendingOrders.value} label={kpiData.pendingOrders.label} trend="warning"
          icon={<Clock size={18} className="text-amber-600" />} iconBg="bg-amber-50" />
        <KPICard title="Available Balance" value={kpiData.availableBalance.value} label={kpiData.availableBalance.label}
          icon={<Wallet size={18} className="text-green-600" />} iconBg="bg-green-50" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Overview */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#E5E9E8]">
            <div>
              <h3 className="text-sm font-semibold text-[#10252E]">Sales Overview</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Total Revenue: <span className="font-semibold text-[#10252E]">₹1,24,580</span> · Orders: <span className="font-semibold text-[#10252E]">1,248</span></p>
            </div>
            <div className="flex border border-[#E5E9E8] rounded-lg overflow-hidden">
              {chartTabs.map((t) => (
                <button key={t} onClick={() => setChartTab(t)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${chartTab === t ? "bg-[#16A34A] text-white" : "text-[#64748B] hover:bg-[#F5F7F6]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E5E9E8", borderRadius: 8 }}
                  formatter={(v: any, name: any) => [name === "revenue" ? `₹${Number(v).toLocaleString()}` : v, name === "revenue" ? "Revenue" : "Orders"]} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#revGrad)" name="revenue" />
                <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fill="url(#orderGrad)" name="orders" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Status Donut */}
        <Card padding={false}>
          <div className="px-5 pt-4 pb-3 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Order Status</h3>
            <p className="text-xs text-[#64748B]">1,248 Total Orders</p>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={orderStatusData} cx="40%" cy="50%" innerRadius={52} outerRadius={72} dataKey="value" strokeWidth={0}>
                  {orderStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle"
                  formatter={(value, entry: any) => (
                    <span className="text-[10px] text-[#10252E]">{value} <span className="text-[#64748B]">{entry.payload.value}</span></span>
                  )} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Products */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#10252E]">Top Products</h3>
            <button onClick={() => navigate("/products")} className="text-xs text-[#16A34A] font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E9E8]">
                  {["Product", "Units Sold", "Revenue", "Stock", "Rating"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {topProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F7F6] transition-colors">
                    <td className="px-4 py-2.5">
                      <div>
                        <p className="text-xs font-medium text-[#10252E]">{p.name}</p>
                        <p className="text-[10px] text-[#64748B]">SKU: {p.sku}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-[#10252E]">{p.unitsSold}</td>
                    <td className="px-4 py-2.5 text-xs font-medium text-[#10252E]">{p.revenue}</td>
                    <td className="px-4 py-2.5"><Badge label={p.stock} /></td>
                    <td className="px-4 py-2.5 flex items-center gap-1">
                      <Stars rating={Math.floor(p.rating)} />
                      <span className="text-xs text-[#64748B]">{p.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Orders + Low Stock */}
        <div className="space-y-4">
          <Card padding={false}>
            <div className="px-5 py-3.5 border-b border-[#E5E9E8] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#10252E]">Recent Orders</h3>
              <button onClick={() => navigate("/orders")} className="text-xs text-[#16A34A] font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-[#E5E9E8]">
              {recentOrders.map((o) => (
                <div key={o.id} className="px-4 py-2.5 flex items-center justify-between hover:bg-[#F5F7F6] cursor-pointer"
                  onClick={() => navigate(`/orders/${o.id}`)}>
                  <div>
                    <p className="text-xs font-medium text-[#10252E]">{o.id}</p>
                    <p className="text-[10px] text-[#64748B]">{o.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#10252E]">{o.amount}</p>
                    <Badge label={o.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={false}>
            <div className="px-5 py-3.5 border-b border-[#E5E9E8] flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-[#10252E]">Low Stock Alert</h3>
            </div>
            <div className="divide-y divide-[#E5E9E8]">
              {[
                { name: "Wireless Earbuds", stock: 12, limit: 15, label: "Stock Left: 12" },
                { name: "Smart Watch Series 8", stock: 8, limit: 10, label: "Stock Left: 8" },
                { name: "Backpack Premium", stock: 15, limit: 20, label: "Stock Left: 15" },
              ].map((item) => (
                <div key={item.name} className="px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs font-medium text-[#10252E] truncate max-w-[130px]">{item.name}</p>
                  <Badge label={item.label} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
