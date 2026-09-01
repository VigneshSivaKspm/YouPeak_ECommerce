import { useState } from "react";
import { Upload, Star, ExternalLink } from "lucide-react";
import { PageHeader, Input, Textarea, Select, Toggle, Button, Card, useToast } from "@/components/ui";

export default function Store() {
  const [storeName, setStoreName] = useState("Tech World Store");
  const [desc, setDesc] = useState("We provide high quality electronics and accessories at the best prices with fast delivery.");
  const [showOnMarket, setShowOnMarket] = useState(true);
  const { show, ToastEl } = useToast();

  return (
    <div className="space-y-5">
      {ToastEl}
      <PageHeader title="My Store" subtitle="Manage your store profile, branding and information"
        actions={<Button variant="ghost" size="sm" icon={<ExternalLink size={13} />}>View Store</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Store Profile */}
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Store Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              <Select label="Store Category" options={[
                { label: "Electronics", value: "electronics" }, { label: "Fashion", value: "fashion" },
                { label: "Home & Kitchen", value: "home" }, { label: "Sports", value: "sports" },
              ]} />
              <Input label="Store Phone" defaultValue="+91 98765 43210" />
              <Input label="Store Email" defaultValue="support@techworldstore.com" />
              <Input label="Store Website" defaultValue="www.techworldstore.com" />
              <Input label="Established Date" type="date" defaultValue="2021-01-15" />
            </div>
            <Textarea label="Store Description" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="mt-4" />
          </Card>

          {/* Branding */}
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Store Branding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-[#10252E] mb-2">Store Logo</p>
                <div className="border-2 border-dashed border-[#E5E9E8] rounded-xl p-6 text-center hover:border-[#16A34A] cursor-pointer transition-colors">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-[#F5F7F6] flex items-center justify-center mb-2">
                    <Upload size={24} className="text-[#64748B]" />
                  </div>
                  <p className="text-xs text-[#64748B]">Upload Logo</p>
                  <p className="text-[10px] text-[#64748B]">200×200px recommended</p>
                </div>
                <button className="mt-2 w-full text-xs text-[#16A34A] font-medium hover:underline">Change Logo</button>
              </div>
              <div>
                <p className="text-xs font-medium text-[#10252E] mb-2">Store Banner</p>
                <div className="border-2 border-dashed border-[#E5E9E8] rounded-xl p-6 text-center hover:border-[#16A34A] cursor-pointer transition-colors aspect-video flex flex-col items-center justify-center">
                  <Upload size={24} className="text-[#64748B] mb-2" />
                  <p className="text-xs text-[#64748B]">Upload Banner</p>
                  <p className="text-[10px] text-[#64748B]">1200×400px recommended</p>
                </div>
                <button className="mt-2 w-full text-xs text-[#16A34A] font-medium hover:underline">Change Banner</button>
              </div>
            </div>
          </Card>

          {/* Store Info */}
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Store Type / Business Type" options={[
                { label: "Individual", value: "individual" }, { label: "Private Limited", value: "pvt" },
                { label: "Partnership", value: "partnership" }, { label: "LLP", value: "llp" },
              ]} />
              <Input label="GST Number" defaultValue="33ABCDE1234F1Z5" />
              <Input label="PAN Number" defaultValue="ABCDE1234F" />
              <Input label="Business Start Date" type="date" defaultValue="2021-01-15" />
            </div>
            <Textarea label="Store Address" rows={2} className="mt-4" defaultValue="12, Tech Park, Anna Nagar, Chennai – 600040, Tamil Nadu" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input label="Business Hours" defaultValue="Mon – Sat: 9:00 AM – 6:00 PM" />
              <Input label="Support Email" defaultValue="support@techworldstore.com" />
            </div>
          </Card>

          {/* Storefront Sections */}
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Storefront Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Featured Products", count: "12 Products" },
                { label: "Collections", count: "8 Collections" },
                { label: "Top Categories", count: "4 Categories" },
                { label: "Active Offers", count: "3 Offers" },
              ].map((s) => (
                <div key={s.label} className="p-3 border border-[#E5E9E8] rounded-xl text-center hover:border-[#16A34A] cursor-pointer transition-colors">
                  <p className="text-xs font-medium text-[#10252E]">{s.label}</p>
                  <p className="text-[10px] text-[#16A34A] font-medium mt-1">{s.count}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="primary" size="lg" onClick={() => show("Store settings saved!", "success")}>Save Changes</Button>
          </div>
        </div>

        {/* Store Preview */}
        <div>
          <Card padding={false} className="sticky top-5 overflow-hidden">
            <div className="relative h-28 bg-gradient-to-r from-[#16A34A] to-[#08783D] flex items-end p-4">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <p className="text-white/80 text-xs font-medium relative">Store Banner</p>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-end gap-3 -mt-5">
                <div className="w-14 h-14 rounded-xl bg-white border-2 border-white shadow-md flex items-center justify-center text-2xl shrink-0">🛒</div>
                <div className="pb-1">
                  <p className="text-sm font-bold text-[#10252E]">{storeName}</p>
                  <p className="text-[10px] text-[#64748B]">Premium Quality | Best Prices | Trusted</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={12} className={i <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />)}
                  <span className="text-xs text-[#64748B] ml-1">4.6 (1,248 Reviews)</span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] mt-2">Total Products: <span className="font-semibold text-[#10252E]">486</span></p>
              <Button variant="primary" size="sm" className="w-full mt-3" icon={<ExternalLink size={12} />}>View Store</Button>
            </div>
            <div className="border-t border-[#E5E9E8] px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[#10252E]">Store Status</p>
                <Toggle checked={showOnMarket} onChange={setShowOnMarket} />
              </div>
              <p className="text-[10px] text-[#64748B]">{showOnMarket ? "Your store is visible on the marketplace" : "Your store is hidden"}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
