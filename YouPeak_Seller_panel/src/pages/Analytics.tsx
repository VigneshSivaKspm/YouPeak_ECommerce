import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download } from "lucide-react";
import { analyticsData, salesByCategory } from "@/data/mockData";
import { PageHeader, Card, Button, Badge } from "@/components/ui";

export default function Analytics() {
  const [period, setPeriod] = useState("This Month");

  const kpis = [
    { label: "Revenue", value: "₹10,00,000", change: "+18.6%", up: true },
    { label: "Orders", value: "4,250", change: "+5.4%", up: true },
    { label: "Avg Order Value", value: "₹2,353", change: "+12.2%", up: true },
    { label: "Conversion Rate", value: "3.24%", change: "+11.2%", up: true },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Analytics" subtitle="Deep insights into your store performance"
        actions={
          <>
            <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
              {["Today", "This Week", "This Month", "Last 3 Months", "This Year"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Button variant="secondary" size="sm">Compare: Last Month</Button>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <p className="text-xs text-[#64748B]">{k.label}</p>
            <p className="text-2xl font-bold text-[#10252E] mt-1">{k.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${k.up ? "text-green-600" : "text-red-500"}`}>{k.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Revenue vs Orders</h3>
          </div>
          <div className="p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="aRevG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="aOrdG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E5E9E8", borderRadius: 8 }} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#aRevG)" name="Revenue" />
                <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fill="url(#aOrdG)" name="Orders" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Sales by Category</h3>
          </div>
          <div className="p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={salesByCategory} cx="40%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
                  {salesByCategory.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle"
                  formatter={(value, entry: any) => (
                    <span className="text-[10px] text-[#10252E]">{value} <span className="text-[#64748B]">{entry.payload.value}%</span></span>
                  )} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Best Sellers</h3>
          </div>
          <div className="divide-y divide-[#E5E9E8]">
            {[
              { name: "Wireless Headphones", qty: "1,250" },
              { name: "Smart Watch Series 8", qty: "880" },
              { name: "Running Shoes", qty: "700" },
              { name: "Bluetooth Speaker", qty: "480" },
              { name: "Backpack Premium", qty: "540" },
            ].map((item, i) => (
              <div key={item.name} className="px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-[#64748B] w-4">{i + 1}</span>
                  <span className="text-xs font-medium text-[#10252E]">{item.name}</span>
                </div>
                <span className="text-xs text-[#64748B]">{item.qty}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Most Viewed Products</h3>
          </div>
          <div className="divide-y divide-[#E5E9E8]">
            {[
              { name: "Wireless Headphones", views: "12,640" },
              { name: "Smart Watch Series 8", views: "9,450" },
              { name: "Running Shoes", views: "8,450" },
              { name: "Bluetooth Speaker", views: "7,890" },
              { name: "USB Type-C Cable", views: "4,270" },
            ].map((item, i) => (
              <div key={item.name} className="px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-[#64748B] w-4">{i + 1}</span>
                  <span className="text-xs font-medium text-[#10252E]">{item.name}</span>
                </div>
                <span className="text-xs text-[#64748B]">{item.views}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Store Performance</h3>
          </div>
          <div className="divide-y divide-[#E5E9E8]">
            {[
              { label: "Store Views", value: "56,230" },
              { label: "Product Views", value: "1,28,450" },
              { label: "Add-to-Cart", value: "7,200" },
              { label: "Purchases", value: "4,250" },
              { label: "Purchase Rate", value: "3.34%" },
            ].map((item) => (
              <div key={item.label} className="px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">{item.label}</span>
                <span className="text-xs font-medium text-[#10252E]">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
