import { useState } from "react";
import { Search, Plus, Filter, Download, Upload, MoreVertical, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import { products } from "@/data/mock";
import { Package, CheckCircle, XCircle, Archive } from "lucide-react";

export default function Products() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Products</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Upload size={12} /> Import</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium"><Download size={12} /> Export</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#16A34A] text-white rounded-md font-medium hover:bg-[#0B6B35]"><Plus size={12} /> Add Product</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard title="Total Products" value="48,620" change="+ 12.4%" sub="vs last month" icon={Package} />
        <KpiCard title="Active Products" value="38,250" change="+ 8.2%" sub="vs last month" icon={CheckCircle} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <KpiCard title="Pending Approval" value="1,345" icon={Archive} iconBg="bg-yellow-50" iconColor="text-yellow-600" sub="Requires review" />
        <KpiCard title="Out of Stock" value="1,125" icon={XCircle} iconBg="bg-red-50" iconColor="text-red-600" sub="Needs restock" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="p-3 border-b border-[#E5E9E8] flex gap-2 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F7] border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
          </div>
          {["Category", "Vendor", "Status", "Price Range"].map(f => (
            <button key={f} className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] flex items-center gap-1">
              <Filter size={10} /> {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                <th className="w-8 px-3 py-2.5"><input type="checkbox" className="rounded" /></th>
                {["Product", "SKU", "Vendor", "Category", "Price", "Stock", "Rating", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#F8FAFB] transition-colors cursor-pointer" onClick={() => navigate(`/products/${p.id}`)}>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded" /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#F5F7F7] rounded border border-[#E5E9E8] flex items-center justify-center text-[#64748B]">
                        <Package size={14} />
                      </div>
                      <div>
                        <p className="font-medium text-[#10252E]">{p.name}</p>
                        <p className="text-[10px] text-[#64748B]">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[#64748B]">{p.sku}</td>
                  <td className="px-3 py-2.5 text-[#64748B]">{p.vendor}</td>
                  <td className="px-3 py-2.5 text-[#64748B]">{p.category}</td>
                  <td className="px-3 py-2.5 font-semibold text-[#10252E]">{p.price}</td>
                  <td className="px-3 py-2.5">
                    <span className={`font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 100 ? "text-yellow-600" : "text-green-600"}`}>{p.stock}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="flex items-center gap-0.5 text-yellow-500 font-medium">
                      <Star size={10} fill="currentColor" /> {p.rating}
                    </span>
                  </td>
                  <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                  <td className="px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <button className="p-1 text-[#64748B] hover:text-[#10252E] hover:bg-[#F1F5F9] rounded"><MoreVertical size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-[#E5E9E8]">
          <span className="text-xs text-[#64748B]">Showing 1 to 6 of 48,620 products</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} className={`w-7 h-7 text-xs rounded ${p === 1 ? "bg-[#16A34A] text-white" : "border border-[#E5E9E8] text-[#64748B]"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
