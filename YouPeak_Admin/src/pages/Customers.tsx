import { useState } from "react";
import { Search, Filter, Download, MoreVertical, X, Mail, Phone, ShoppingBag, Wallet } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import { customers } from "@/data/mock";
import { Users, UserCheck, UserPlus, RefreshCcw } from "lucide-react";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Customers</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Download size={12} /> Export</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard title="Total Customers" value="1,24,580" change="+ 9.4%" sub="vs last month" icon={Users} />
        <KpiCard title="New Customers (Today)" value="1,248" change="+ 12.1%" sub="vs yesterday" icon={UserPlus} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <KpiCard title="Active Customers" value="1,01,250" icon={UserCheck} iconBg="bg-green-50" iconColor="text-green-600" sub="Ordered in 30 days" />
        <KpiCard title="Returning Customers" value="34,560" icon={RefreshCcw} iconBg="bg-purple-50" iconColor="text-purple-600" sub="Repeat buyers" />
      </div>

      <div className="flex gap-4">
        {/* Table */}
        <div className={`bg-white rounded-lg border border-[#E5E9E8] ${selected ? "flex-1 min-w-0" : "w-full"}`}>
          <div className="p-3 border-b border-[#E5E9E8] flex gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
            </div>
            {["Status", "Date"].map(f => (
              <button key={f} className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] flex items-center gap-1"><Filter size={10} /> {f}</button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                  <th className="w-8 px-3 py-2.5"><input type="checkbox" className="rounded" /></th>
                  {["Customer", "Email / Phone", "Orders", "Total Spent", "Last Order", "Wallet", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c)} className={`hover:bg-[#F8FAFB] transition-colors cursor-pointer ${selected?.id === c.id ? "bg-green-50" : ""}`}>
                    <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded" /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center">{c.name[0]}</div>
                        <span className="font-medium text-[#10252E]">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[#64748B]">
                      <div>{c.email}</div>
                      <div className="text-[10px]">{c.phone}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[#64748B]">{c.orders}</td>
                    <td className="px-3 py-2.5 font-semibold text-[#10252E]">{c.spent}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{c.lastOrder}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{c.wallet}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={c.status} /></td>
                    <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                      <button className="p-1 text-[#64748B] hover:text-[#10252E] hover:bg-[#F1F5F9] rounded"><MoreVertical size={13} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E9E8]">
            <span className="text-xs text-[#64748B]">Showing 1 to 5 of 1,24,580 customers</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(p => (
                <button key={p} className={`w-7 h-7 text-xs rounded ${p === 1 ? "bg-[#16A34A] text-white" : "border border-[#E5E9E8] text-[#64748B]"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Side panel */}
        {selected && (
          <div className="w-64 flex-shrink-0 bg-white rounded-lg border border-[#E5E9E8] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#10252E]">Customer Details</h3>
              <button onClick={() => setSelected(null)} className="text-[#64748B] hover:text-[#10252E]"><X size={14} /></button>
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white font-bold flex items-center justify-center text-xl">{selected.name[0]}</div>
              <p className="text-sm font-semibold text-[#10252E] mt-2">{selected.name}</p>
              <StatusBadge status={selected.status} size="md" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B]"><Mail size={12} />{selected.email}</div>
              <div className="flex items-center gap-2 text-xs text-[#64748B]"><Phone size={12} />{selected.phone}</div>
              <div className="flex items-center gap-2 text-xs text-[#64748B]"><ShoppingBag size={12} />{selected.orders} orders • {selected.spent} spent</div>
              <div className="flex items-center gap-2 text-xs text-[#64748B]"><Wallet size={12} />Wallet: {selected.wallet}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E9E8] space-y-2">
              <button className="w-full py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] transition-colors">View Full Profile</button>
              <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] transition-colors">Send Email</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
