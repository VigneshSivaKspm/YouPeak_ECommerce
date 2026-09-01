import { useState } from "react";
import { Star, CheckCircle, EyeOff, Trash2, Flag, X } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import { reviews } from "@/data/mock";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={11} className={s <= rating ? "text-yellow-400" : "text-[#E5E9E8]"} fill={s <= rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const [selected, setSelected] = useState(reviews[0]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-[#10252E]">Reviews & Moderation</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[["Total Reviews", "68,542"], ["Average Rating", "4.5/5"], ["Approved", "64,210"], ["Pending", "2,125"], ["Flagged", "412"]].map(([t, v]) => (
          <div key={t} className="bg-white rounded-lg border border-[#E5E9E8] p-4">
            <p className="text-xs text-[#64748B]">{t}</p>
            <p className="text-lg font-bold text-[#10252E] mt-1">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Table */}
        <div className="flex-1 bg-white rounded-lg border border-[#E5E9E8]">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                  {["Product", "Customer", "Vendor", "Rating", "Review", "Images", "Date", "Status"].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {reviews.map(r => (
                  <tr key={r.id} onClick={() => setSelected(r)}
                    className={`hover:bg-[#F8FAFB] cursor-pointer transition-colors ${selected.id === r.id ? "bg-green-50" : ""}`}>
                    <td className="px-3 py-2.5 font-medium text-[#10252E]">{r.product}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.customer}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.vendor}</td>
                    <td className="px-3 py-2.5"><Stars rating={r.rating} /></td>
                    <td className="px-3 py-2.5 text-[#64748B] max-w-32 truncate">{r.review}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.images}</td>
                    <td className="px-3 py-2.5 text-[#64748B]">{r.date}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="w-64 flex-shrink-0 bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-3">Review Detail</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center">{selected.customer[0]}</div>
            <div>
              <p className="text-xs font-semibold text-[#10252E]">{selected.customer}</p>
              <p className="text-[10px] text-[#64748B]">{selected.vendor}</p>
            </div>
          </div>
          <Stars rating={selected.rating} />
          <p className="text-xs text-[#64748B] mt-2">{selected.review}</p>
          <div className="mt-3">
            <p className="text-[10px] text-[#64748B]">Product: {selected.product}</p>
            <p className="text-[10px] text-[#64748B] mt-0.5">Date: {selected.date}</p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-[#10252E]">Moderation Actions</p>
            <button className="w-full py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] flex items-center justify-center gap-1.5"><CheckCircle size={12} /> Approve</button>
            <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] flex items-center justify-center gap-1.5"><EyeOff size={12} /> Hide Review</button>
            <button className="w-full py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] flex items-center justify-center gap-1.5"><Flag size={12} /> Mark as Spam</button>
            <button className="w-full py-2 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded-md hover:bg-red-50 flex items-center justify-center gap-1.5"><Trash2 size={12} /> Delete Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
