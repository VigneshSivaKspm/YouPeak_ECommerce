import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { earningsData } from "@/data/mockData";
import { PageHeader, Card } from "@/components/ui";

export default function Earnings() {
  const stats = [
    { label: "Gross Sales", value: "₹1,10,00,000", change: "+18.8%", up: true },
    { label: "Platform Commission", value: "₹80,000", change: "+4.3%", up: false },
    { label: "Refunds", value: "₹20,000", change: "+0.5%", up: false },
    { label: "Adjustments", value: "₹10,000", change: "+1.3%", up: false },
    { label: "Net Earnings", value: "₹90,000", change: "+16.0%", up: true },
    { label: "Pending Balance", value: "₹1,24,800", change: "", up: true },
    { label: "Available Balance", value: "₹82,450", change: "", up: true },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Earnings" subtitle="Track your revenue, commissions and net earnings" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-[10px] text-[#64748B] font-medium">{s.label}</p>
            <p className="text-lg font-bold text-[#10252E] mt-1">{s.value}</p>
            {s.change && (
              <p className={`text-[10px] font-medium mt-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>{s.change}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Revenue Trend</h3>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E5E9E8", borderRadius: 8 }}
                  formatter={(v: any, name: any) => [`₹${Number(v).toLocaleString()}`, name === "revenue" ? "Gross Revenue" : "Net Earnings"]} />
                <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#revG)" name="revenue" />
                <Area type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} fill="url(#netG)" name="net" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding={false}>
          <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Commission Trend</h3>
          </div>
          <div className="p-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 11, border: "1px solid #E5E9E8", borderRadius: 8 }} formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, "Commission"]} />
                <Bar dataKey="commission" fill="#EF4444" radius={[4, 4, 0, 0]} name="commission" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Earnings Breakdown */}
      <Card>
        <h3 className="text-sm font-semibold text-[#10252E] mb-4">Earnings Breakdown (This Month)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { label: "Product Sales", value: "₹1,06,00,000", color: "bg-green-500" },
              { label: "Platform Commission", value: "-₹80,000", color: "bg-red-400" },
              { label: "Tax / Fees", value: "-₹15,000", color: "bg-amber-400" },
              { label: "Refund Adjustment", value: "-₹20,000", color: "bg-orange-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#E5E9E8]">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-[#64748B]">{item.label}</span>
                </div>
                <span className="text-xs font-medium text-[#10252E]">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-medium text-green-700">NET VENDOR EARNINGS</p>
            <p className="text-4xl font-bold text-[#16A34A] mt-2">₹8,88,000</p>
            <p className="text-xs text-green-700 mt-1">↑ 16.0% vs last month</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
