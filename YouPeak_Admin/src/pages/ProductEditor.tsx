import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tabs = ["Overview", "Inventory", "Variants", "Pricing", "Media", "SEO", "Reviews", "History"];

export default function ProductEditor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-md border border-[#E5E9E8] bg-white text-[#64748B] hover:text-[#10252E]"><ArrowLeft size={15} /></button>
        <h1 className="text-base font-bold text-[#10252E] flex-1">Product Editor</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#16A34A] text-white rounded-md font-medium hover:bg-[#0B6B35]"><Save size={12} /> Save Changes</button>
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
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[["Product Name", "text", "Running Shoes Pro X"], ["SKU", "text", "SH-RX-001"], ["Brand", "text", "SportX"], ["Category", "text", "Footwear"], ["Tags", "text", "running, sport, shoes"]].map(([l, t, p]) => (
                <div key={l as string}>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">{l as string}</label>
                  <input type={t as string} placeholder={p as string} className="w-full px-3 py-2 text-xs border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]" />
                </div>
              ))}
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-[#64748B] mb-1">Description</label>
                <textarea rows={4} placeholder="Product description..." className="w-full px-3 py-2 text-xs border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A] resize-none" />
              </div>
            </div>
          )}
          {activeTab !== 0 && (
            <div className="flex items-center justify-center h-48 text-[#64748B] text-sm">{tabs[activeTab]} editor panel</div>
          )}
        </div>
      </div>
    </div>
  );
}
