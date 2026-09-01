import { useState } from "react";
import { Search, Filter, Download, Plus, CheckCircle, XCircle, Eye, X } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import { payouts } from "@/data/mock";
import { CreditCard, Clock, TrendingUp, AlertCircle } from "lucide-react";

export default function Payouts() {
  const [showConfig, setShowConfig] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Vendor Payouts</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowConfig(true)} className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium">Commission Config</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#16A34A] text-white rounded-md font-medium hover:bg-[#0B6B35]"><Plus size={12} /> Process Payout</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ["Total Payable", "₹14,63,450", CreditCard],
          ["Pending Payouts", "₹2,14,800", Clock],
          ["Processing", "₹1,25,600", TrendingUp],
          ["Completed (This Month)", "₹11,23,050", CheckCircle],
          ["Failed", "₹18,450", AlertCircle],
        ].map(([t, v, Icon]) => (
          <div key={t as string} className="bg-white rounded-lg border border-[#E5E9E8] p-4">
            <p className="text-xs text-[#64748B]">{t as string}</p>
            <p className="text-base font-bold text-[#10252E] mt-1">{v as string}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-lg border border-[#E5E9E8]">
          <div className="p-3 border-b border-[#E5E9E8] flex gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendor, payout ID..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
            </div>
            {["Status", "Method"].map(f => (
              <button key={f} className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] flex items-center gap-1"><Filter size={10} /> {f}</button>
            ))}
            <button className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B]"><Download size={12} /></button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                  {["Vendor", "Payout ID", "Amount", "Method", "Requested On", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {payouts.map(p => (
                  <tr key={p.payoutId} className="hover:bg-[#F8FAFB] transition-colors">
                    <td className="px-3 py-2.5 font-medium text-[#10252E]">{p.vendor}</td>
                    <td className="px-3 py-2.5 text-[#16A34A] font-semibold">{p.payoutId}</td>
                    <td className="px-3 py-2.5 font-semibold text-[#10252E]">{p.amount}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{p.method}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{p.date}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        {p.status === "Pending" && (
                          <>
                            <button className="px-2 py-1 text-[10px] bg-[#16A34A] text-white rounded font-medium hover:bg-[#0B6B35]">Approve</button>
                            <button className="px-2 py-1 text-[10px] border border-[#E5E9E8] text-[#64748B] rounded">Reject</button>
                          </>
                        )}
                        <button className="p-1 text-[#64748B] hover:text-[#10252E]"><Eye size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission config panel */}
        {showConfig && (
          <div className="w-72 flex-shrink-0 bg-white rounded-lg border border-[#E5E9E8] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#10252E]">Commission Configuration</h3>
              <button onClick={() => setShowConfig(false)} className="text-[#64748B] hover:text-[#10252E]"><X size={14} /></button>
            </div>
            <div className="space-y-3">
              {[
                ["Platform-Wide Commission", "12%"],
                ["Vendor-Specific Commission", "Variable"],
                ["Category Commission", "—"],
                ["Product Commission", "£50"],
                ["Fixed Commission", "£50"],
                ["Percentage Commission", "10%"],
              ].map(([k, v]) => (
                <div key={k}>
                  <label className="text-xs text-[#64748B] block mb-1">{k}</label>
                  <input defaultValue={v} className="w-full px-3 py-1.5 text-xs border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
                </div>
              ))}
              <button className="w-full py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] mt-2">Manage Commission Rules</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
