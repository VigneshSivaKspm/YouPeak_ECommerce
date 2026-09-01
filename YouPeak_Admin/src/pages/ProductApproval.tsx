import { useState } from "react";
import { Search, CheckCircle, XCircle, MessageSquare, Package } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { approvalProducts } from "@/data/mock";

const tabs = ["Pending (245)", "Approved (38,293)", "Rejected (876)", "Requested Changes (234)"];

export default function ProductApproval() {
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(approvalProducts[0]);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Product Approval</h1>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        {/* Tabs */}
        <div className="flex border-b border-[#E5E9E8]">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === i ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex h-[calc(100vh-280px)] min-h-[400px]">
          {/* List */}
          <div className="flex-1 min-w-0 border-r border-[#E5E9E8] flex flex-col">
            <div className="p-3 border-b border-[#E5E9E8]">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
              </div>
            </div>

            <div className="overflow-x-auto flex-1 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="sticky top-0">
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                    {["Product", "Vendor", "Category", "Price", "Submitted", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {approvalProducts.map(p => (
                    <tr key={p.id} onClick={() => setSelected(p)}
                      className={`hover:bg-[#F8FAFB] transition-colors cursor-pointer ${selected.id === p.id ? "bg-green-50" : ""}`}>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#F5F7F7] rounded border border-[#E5E9E8] flex items-center justify-center">
                            <Package size={13} className="text-[#64748B]" />
                          </div>
                          <span className="font-medium text-[#10252E]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-[#64748B]">{p.vendor}</td>
                      <td className="px-3 py-2.5 text-[#64748B]">{p.category}</td>
                      <td className="px-3 py-2.5 font-semibold text-[#10252E]">{p.price}</td>
                      <td className="px-3 py-2.5 text-[#64748B]">{p.submitted}</td>
                      <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-1">
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded"><CheckCircle size={13} /></button>
                          <button className="p-1 text-red-500 hover:bg-red-50 rounded"><XCircle size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          <div className="w-72 flex-shrink-0 p-4 overflow-y-auto">
            <div className="w-full h-40 bg-[#F5F7F7] rounded-lg border border-[#E5E9E8] flex items-center justify-center mb-4">
              <Package size={40} className="text-[#CBD5E1]" />
            </div>
            <h3 className="font-semibold text-[#10252E] text-sm">{selected.name}</h3>
            <p className="text-xs text-[#64748B] mt-0.5">SKU: SH-RX-001</p>
            <div className="mt-3 space-y-2">
              {[["Brand", "SportX"], ["Category", selected.category], ["Price", selected.price], ["Stock", "45"], ["Vendor", selected.vendor]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs text-[#64748B]">{k}</span>
                  <span className="text-xs font-medium text-[#10252E]">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#64748B] mt-3">Lightweight and comfortable running shoes for all terrains.</p>
            <button className="text-xs text-[#16A34A] font-medium mt-1">View Full Details</button>
            <div className="mt-4 space-y-2">
              <button className="w-full py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] transition-colors flex items-center justify-center gap-1.5">
                <CheckCircle size={13} /> Approve Product
              </button>
              <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] transition-colors flex items-center justify-center gap-1.5">
                <MessageSquare size={13} /> Request Changes
              </button>
              <button className="w-full py-2 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5">
                <XCircle size={13} /> Reject Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
