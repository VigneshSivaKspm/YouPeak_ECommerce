import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { coupons } from "@/data/mockData";
import { PageHeader, Tabs, SearchInput, Badge, Button, ActionMenu, Pagination, Card, Modal, Input, Select, Toggle, useToast } from "@/components/ui";

const tabs = ["Coupons", "Offers", "Flash Sales", "Product Promotions", "Campaigns", "Referral"];

export default function Marketing() {
  const [tab, setTab] = useState("Coupons");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [showOnStorefront, setShowOnStorefront] = useState(true);
  const { show, ToastEl } = useToast();

  const filtered = coupons.filter((c) =>
    !search || c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {ToastEl}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Create New Coupon" width="max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Coupon Code *" placeholder="e.g. SAVE20" />
          <Select label="Discount Type" options={[
            { label: "Percentage (%)", value: "percent" }, { label: "Fixed Amount (₹)", value: "fixed" }, { label: "Free Shipping", value: "shipping" },
          ]} />
          <Input label="Discount Value *" placeholder="e.g. 20" type="number" />
          <Input label="Minimum Order Value" placeholder="e.g. ₹999" type="number" />
          <Input label="Maximum Discount" placeholder="e.g. ₹500" type="number" />
          <Input label="Usage Limit" placeholder="e.g. 500" type="number" />
          <Select label="Applicable Products" options={[{ label: "All Products", value: "all" }, { label: "Selected Products", value: "selected" }]} />
          <div />
          <Input label="Start Date" type="date" />
          <Input label="End Date" type="date" />
        </div>
        <div className="mt-4 flex items-center justify-between py-3 border-t border-[#E5E9E8]">
          <Toggle checked={showOnStorefront} onChange={setShowOnStorefront} label="Show on Storefront" />
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => { show("Coupon created!", "success"); setShowForm(false); }}>Create Coupon</Button>
        </div>
      </Modal>

      <PageHeader title="Marketing" subtitle="Manage your promotions, coupons and campaigns" />

      <Card padding={false}>
        <div className="px-4 overflow-x-auto border-b border-[#E5E9E8]">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>

        {tab === "Coupons" && (
          <>
            <div className="px-4 py-3 flex flex-wrap items-center gap-2">
              <SearchInput value={search} onChange={setSearch} placeholder="Search coupons..." />
              <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
                <option>Status: All</option><option>Active</option><option>Expired</option>
              </select>
              <div className="ml-auto">
                <Button variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => setShowForm(true)}>Create Coupon</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[#E5E9E8]">
                  {["Coupon Code", "Discount", "Min. Order", "Usage", "Valid Till", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-[#E5E9E8]">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F5F7F6] transition-colors">
                      <td className="px-4 py-3"><span className="font-mono font-bold text-xs bg-[#F5F7F6] px-2 py-1 rounded">{c.code}</span></td>
                      <td className="px-4 py-3 text-xs font-medium text-[#10252E]">{c.discount}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B]">{c.minOrder}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B]">{c.usage}</td>
                      <td className="px-4 py-3 text-xs text-[#64748B]">{c.expiry}</td>
                      <td className="px-4 py-3"><Badge label={c.status} /></td>
                      <td className="px-4 py-3">
                        <ActionMenu items={[
                          { label: "Edit", icon: <Edit size={13} />, onClick: () => setShowForm(true) },
                          { label: "Delete", icon: <Trash2 size={13} />, onClick: () => show("Coupon deleted", "error"), danger: true },
                        ]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-[#E5E9E8]">
              <Pagination current={page} total={coupons.length} perPage={10} onPageChange={setPage} />
            </div>
          </>
        )}

        {tab !== "Coupons" && (
          <div className="px-4 py-16 text-center">
            <p className="text-sm font-medium text-[#10252E]">{tab}</p>
            <p className="text-xs text-[#64748B] mt-1">Coming soon. Set up your {tab.toLowerCase()} here.</p>
            <Button variant="outline" size="sm" className="mt-4" icon={<Plus size={13} />}>Create {tab.replace(/s$/, "")}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
