import { useState } from "react";
import { Download, CheckCircle, XCircle, Phone, X } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { returns } from "@/data/mock";
import { Package } from "lucide-react";

const tabs = ["Requests", "Approved", "Pickup", "Received", "Refunded", "Rejected"];

export default function Returns() {
  const [activeTab, setActiveTab] = useState(0);
  const [selected, setSelected] = useState(returns[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Returns & Refunds</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Download size={12} /> Export</button>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="flex border-b border-[#E5E9E8]">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-medium border-b-2 transition-colors ${activeTab === i ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex h-[calc(100vh-260px)] min-h-[400px]">
          {/* Table */}
          <div className="flex-1 min-w-0 border-r border-[#E5E9E8] overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0">
                <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                  {["Return ID", "Order ID", "Customer", "Vendor", "Product", "Amount", "Status", "Date", "Action"].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {returns.map(r => (
                  <tr key={r.id} onClick={() => setSelected(r)}
                    className={`hover:bg-[#F8FAFB] cursor-pointer transition-colors ${selected.id === r.id ? "bg-green-50" : ""}`}>
                    <td className="px-3 py-2.5 font-semibold text-[#16A34A]">{r.id}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.orderId}</td>
                    <td className="px-3 py-2.5 text-[#10252E]">{r.customer}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.vendor}</td>
                    <td className="px-3 py-2.5 text-[#10252E]">{r.product}</td>
                    <td className="px-3 py-2.5 font-semibold">{r.amount}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={r.status} /></td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.date}</td>
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

          {/* Detail panel */}
          <div className="w-72 flex-shrink-0 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-[#10252E] mb-3">Return Details</h3>
            <div className="w-full h-32 bg-[#F5F7F7] rounded-lg border border-[#E5E9E8] flex items-center justify-center mb-3">
              <Package size={32} className="text-[#CBD5E1]" />
            </div>
            <p className="font-semibold text-[#10252E] text-sm">{selected.product}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{selected.vendor}</p>
            <div className="mt-3 space-y-2">
              {[["Return Reason", "Product not working"], ["Customer Comment", "Not connecting via Bluetooth."], ["Refund Amount", selected.amount], ["Refund Method", "Original Payment Method"]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-[#64748B]">{k}</p>
                  <p className="text-xs font-medium text-[#10252E]">{v}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#10252E] mb-2">Return Timeline</p>
              <div className="space-y-2">
                {[["Return Requested", "27 Aug 2026, 10:30 AM", true], ["Approved", "27 Aug 2026, 12:15 PM", true], ["Pickup Scheduled", "—", false], ["Received", "—", false], ["Refunded", "—", false]].map(([l, t, done]) => (
                  <div key={l as string} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${done ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${done ? "bg-white" : "bg-[#94A3B8]"}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#10252E]">{l as string}</p>
                      <p className="text-[10px] text-[#64748B]">{t as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button className="w-full py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] flex items-center justify-center gap-1.5"><CheckCircle size={13} /> Approve Refund</button>
              <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7]">Partial Refund</button>
              <button className="w-full py-2 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded-md hover:bg-red-50 flex items-center justify-center gap-1.5"><XCircle size={13} /> Reject Return</button>
              <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#64748B] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] flex items-center justify-center gap-1.5"><Phone size={13} /> Contact Customer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
