import { useState } from "react";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { campaigns } from "@/data/mock";

const tabs = ["Coupons", "Promotions", "Flash Sales", "Banners", "Featured", "Push Campaigns", "Referral", "Loyalty"];

const scheduledCampaigns = [
  { name: "Independence Day Mega Sale", type: "Flash Sale", start: "15 Sep 2026", end: "16 Sep 2026", target: "All Users", status: "Scheduled" },
  { name: "Back to School", type: "Promotion", start: "01 Sep 2026", end: "10 Sep 2026", target: "Students", status: "Active" },
  { name: "Weekend Bonanza", type: "Push Campaign", start: "Every Sat", end: "Every Sun", target: "All Users", status: "Active" },
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState(0);
  const [toggles, setToggles] = useState<Record<string, boolean>>({ "BIG FESTIVAL SALE": true });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Marketing Center</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#16A34A] text-white rounded-md font-medium hover:bg-[#0B6B35]"><Plus size={12} /> Create Coupon</button>
      </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Coupon table */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto border border-[#E5E9E8] rounded-lg">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                      {["Coupon Code", "Type", "Discount", "Usage", "Limit", "Expiry", "Status", "Action"].map(h => (
                        <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {campaigns.map(c => (
                      <tr key={c.name} className="hover:bg-[#F8FAFB]">
                        <td className="px-3 py-2.5 font-mono font-semibold text-[#10252E]">{c.name}</td>
                        <td className="px-3 py-2.5 text-[#64748B]">{c.type}</td>
                        <td className="px-3 py-2.5 font-semibold text-green-600">{c.discount}</td>
                        <td className="px-3 py-2.5 text-[#64748B]">{c.usage.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-[#64748B]">{typeof c.limit === "number" ? c.limit.toLocaleString() : c.limit}</td>
                        <td className="px-3 py-2.5 text-[#64748B]">{c.expiry}</td>
                        <td className="px-3 py-2.5"><StatusBadge status={c.status} /></td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1">
                            <button className="p-1 text-[#64748B] hover:text-[#10252E] hover:bg-[#F1F5F9] rounded"><Edit size={11} /></button>
                            <button className="p-1 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded"><Trash2 size={11} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Scheduled campaigns */}
              <div className="mt-4">
                <h3 className="text-xs font-semibold text-[#10252E] mb-2">Recently Scheduled Campaigns</h3>
                <div className="border border-[#E5E9E8] rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                        {["Campaign Name", "Type", "Start Date", "End Date", "Target", "Status"].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {scheduledCampaigns.map(c => (
                        <tr key={c.name} className="hover:bg-[#F8FAFB]">
                          <td className="px-3 py-2.5 font-medium text-[#10252E]">{c.name}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{c.type}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{c.start}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{c.end}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{c.target}</td>
                          <td className="px-3 py-2.5"><StatusBadge status={c.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Active Banner */}
            <div>
              <h3 className="text-xs font-semibold text-[#10252E] mb-2">Active Banner</h3>
              <div className="border border-[#E5E9E8] rounded-lg overflow-hidden">
                <div className="h-36 bg-gradient-to-br from-[#0B2730] to-[#16A34A] flex items-center justify-center text-white relative p-4">
                  <div>
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Big Festival Sale</p>
                    <p className="text-2xl font-black mt-1">UP TO 70% OFF</p>
                    <button className="mt-2 px-3 py-1 bg-[#16A34A] text-white text-xs rounded-md font-semibold">Shop Now</button>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {[["Title", "Big Festival Sale"], ["Placement", "Homepage Top"], ["Start Date", "25 Aug 2026"], ["End Date", "10 Sep 2026"], ["Paying", ""]].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-xs text-[#64748B]">{k}</span>
                      <span className="text-xs font-medium text-[#10252E]">{v}</span>
                    </div>
                  ))}
                  <button className="w-full py-1.5 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] mt-1">Manage Banners</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
