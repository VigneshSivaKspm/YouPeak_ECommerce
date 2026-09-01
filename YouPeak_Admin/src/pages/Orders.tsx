import { useState } from "react";
import { Search, Filter, Download, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/ui/StatusBadge";
import { orders } from "@/data/mock";

const tabs = ["All (18,492)", "New (842)", "Confirmed (1,264)", "Processing (1,384)", "Packed (2,840)", "Shipped (3,840)", "Delivered (4,215)", "Cancelled (879)"];

export default function Orders() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Orders</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] font-medium">
            <Filter size={12} /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] font-medium">
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="flex overflow-x-auto border-b border-[#E5E9E8]">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[#E5E9E8] flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search order ID, customer, vendor..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]"
            />
          </div>
          {["Status", "Vendor", "Date Range", "Payment"].map(f => (
            <button key={f} className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] flex items-center gap-1">
              {f} <ChevronRight size={10} className="rotate-90" />
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                <th className="w-8 px-3 py-2.5"><input type="checkbox" className="rounded" /></th>
                {["Order ID", "Customer", "Vendor", "Items", "Date", "Amount", "Payment", "Status", "Delivery", "Actions"].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map(o => (
                <tr
                  key={o.id}
                  className="hover:bg-[#F8FAFB] transition-colors cursor-pointer"
                  onClick={() => navigate(`/orders/${o.id}`)}
                >
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-[#16A34A]">{o.id}</td>
                  <td className="px-3 py-2.5 text-[#10252E]">{o.customer}</td>
                  <td className="px-3 py-2.5 text-[#64748B]">{o.vendor}</td>
                  <td className="px-3 py-2.5 text-[#64748B]">{o.items}</td>
                  <td className="px-3 py-2.5 text-[#64748B]">{o.date}</td>
                  <td className="px-3 py-2.5 font-semibold text-[#10252E]">{o.amount}</td>
                  <td className="px-3 py-2.5"><span className="text-green-600 font-medium">{o.payment}</span></td>
                  <td className="px-3 py-2.5"><StatusBadge status={o.status} /></td>
                  <td className="px-3 py-2.5">{o.delivery && <StatusBadge status={o.delivery} />}</td>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <button className="p-1 text-[#64748B] hover:text-[#10252E] hover:bg-[#F1F5F9] rounded">
                      <MoreVertical size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E9E8]">
          <span className="text-xs text-[#64748B]">Showing 1 to 10 of 18,492 orders</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded border border-[#E5E9E8] text-[#64748B] hover:text-[#10252E]"><ChevronLeft size={13} /></button>
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} className={`w-7 h-7 text-xs rounded ${p === 1 ? "bg-[#16A34A] text-white" : "border border-[#E5E9E8] text-[#64748B] hover:text-[#10252E]"}`}>{p}</button>
            ))}
            <span className="text-xs text-[#64748B] px-1">...</span>
            <button className="px-2 h-7 text-xs rounded border border-[#E5E9E8] text-[#64748B]">1,850</button>
            <button className="p-1.5 rounded border border-[#E5E9E8] text-[#64748B] hover:text-[#10252E]"><ChevronRight size={13} /></button>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#64748B]">
            10 / page <ChevronRight size={10} className="rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
