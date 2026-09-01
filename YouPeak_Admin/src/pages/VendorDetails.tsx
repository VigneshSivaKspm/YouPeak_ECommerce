import { useState } from "react";
import { ArrowLeft, Edit, Shield, MoreHorizontal, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatusBadge from "@/components/ui/StatusBadge";
import { revenueData, orders } from "@/data/mock";

const tabs = ["Overview", "Orders", "Products", "Customers", "Commission", "Payouts", "Returns", "Reviews", "Documents", "Bank Info", "Activity"];

export default function VendorDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-md border border-[#E5E9E8] bg-white text-[#64748B] hover:text-[#10252E]"><ArrowLeft size={15} /></button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white font-bold flex items-center justify-center text-lg">T</div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#10252E]">Tech Store</h1>
              <StatusBadge status="Active" size="md" />
            </div>
            <p className="text-xs text-[#64748B]">TechStore.com • Joined 17 Jan 2026 • Electronics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Edit size={12} /> Edit</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Shield size={12} /> Suspend</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><MoreHorizontal size={12} /> More Actions</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="flex overflow-x-auto border-b border-[#E5E9E8]">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 0 && (
            <div className="space-y-4">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  ["Total Revenue", "₹24,85,640", "+ 18.4%"],
                  ["Total Orders", "4,852", "+ 15.6%"],
                  ["Avg Order Value", "₹1,145", "+ 6.2%"],
                  ["Throughput", "₹1,245", "This Month"]
                ].map(([t, v, s]) => (
                  <div key={t} className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-3">
                    <p className="text-xs text-[#64748B]">{t}</p>
                    <p className="text-base font-bold text-[#10252E] mt-1">{v}</p>
                    <p className="text-xs text-green-600 mt-0.5 flex items-center gap-0.5"><TrendingUp size={10} /> {s}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue chart */}
                <div className="lg:col-span-2 bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-4">
                  <h3 className="text-sm font-semibold text-[#10252E] mb-3">Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="vendorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E9E8" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid #E5E9E8" }} />
                      <Area type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} fill="url(#vendorRev)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Store info */}
                <div className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-4">
                  <h3 className="text-sm font-semibold text-[#10252E] mb-3">Store Information</h3>
                  <div className="space-y-2">
                    {[
                      ["Store Name", "Tech Store"],
                      ["Owner Name", "Naren Kumar"],
                      ["Phone", "+91 98765-43210"],
                      ["Email", "techstore@gmail.com"],
                      ["Location", "Chennai, Tamil Nadu"],
                      ["Rating", "4.5 / 5.0"],
                      ["Commission", "12%"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-xs text-[#64748B]">{k}</span>
                        <span className="text-xs font-medium text-[#10252E]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h3 className="text-sm font-semibold text-[#10252E] mb-2">Recent Orders</h3>
                <div className="overflow-x-auto border border-[#E5E9E8] rounded-lg">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                        {["Order ID", "Date", "Amount", "Status"].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {orders.filter(o => o.vendor === "Tech Store").map(o => (
                        <tr key={o.id} className="hover:bg-[#F8FAFB]">
                          <td className="px-3 py-2.5 font-semibold text-[#16A34A]">{o.id}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{o.date}</td>
                          <td className="px-3 py-2.5 font-semibold">{o.amount}</td>
                          <td className="px-3 py-2.5"><StatusBadge status={o.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 0 && (
            <div className="flex items-center justify-center h-48 text-[#64748B] text-sm">
              {tabs[activeTab]} content — coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
