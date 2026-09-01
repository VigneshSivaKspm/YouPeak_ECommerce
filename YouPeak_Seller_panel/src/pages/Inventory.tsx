import { useState } from "react";
import { Edit, Plus, Download, Upload } from "lucide-react";
import { inventoryItems } from "@/data/mockData";
import { PageHeader, SearchInput, Badge, Button, ActionMenu, Pagination, Card, Modal, Input, useToast } from "@/components/ui";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [adjustItem, setAdjustItem] = useState<typeof inventoryItems[0] | null>(null);
  const [adjustQty, setAdjustQty] = useState("");
  const { show, ToastEl } = useToast();

  const filtered = inventoryItems.filter((i) =>
    !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: 486, inStock: 412, lowStock: 36, outOfStock: 12, value: "₹12,45,680"
  };

  return (
    <div className="space-y-4">
      {ToastEl}

      <Modal open={!!adjustItem} onClose={() => setAdjustItem(null)} title="Stock Adjustment" width="max-w-sm">
        {adjustItem && (
          <div className="space-y-4">
            <div className="p-3 bg-[#F5F7F6] rounded-lg">
              <p className="text-xs font-medium text-[#10252E]">{adjustItem.name}</p>
              <p className="text-[10px] text-[#64748B]">Current Stock: {adjustItem.available}</p>
            </div>
            <Input label="Adjustment Quantity" type="number" value={adjustQty} onChange={(e) => setAdjustQty(e.target.value)} placeholder="e.g. +50 or -10" />
            <Input label="Reason" placeholder="Reason for adjustment..." />
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" size="sm" onClick={() => setAdjustItem(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => { show("Stock adjusted successfully", "success"); setAdjustItem(null); setAdjustQty(""); }}>Update Stock</Button>
            </div>
          </div>
        )}
      </Modal>

      <PageHeader title="Inventory" subtitle="Track and manage your product stock"
        actions={
          <>
            <Button variant="secondary" size="sm">Bulk Update</Button>
            <Button variant="secondary" size="sm" icon={<Upload size={13} />}>Import</Button>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
            <Button variant="primary" size="sm" icon={<Plus size={13} />}>Stock Adjustment</Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Products", value: stats.total, color: "text-[#10252E]" },
          { label: "In Stock", value: stats.inStock, color: "text-green-600" },
          { label: "Low Stock", value: stats.lowStock, color: "text-amber-600" },
          { label: "Out of Stock", value: stats.outOfStock, color: "text-red-600" },
          { label: "Inventory Value", value: stats.value, color: "text-[#10252E]" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-[#64748B]">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="px-4 py-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search products..." />
          {["Category", "Warehouse", "Stock Status"].map((f) => (
            <select key={f} className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none focus:border-[#16A34A]">
              <option>{f}: All</option>
            </select>
          ))}
          <button className="h-8 px-3 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] hover:bg-[#F5F7F6]">More Filters</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E5E9E8]">
              <th className="px-3 py-2.5 w-8"><input type="checkbox" className="rounded" /></th>
              {["Product", "SKU", "Available", "Reserved", "Total", "Low Stock Limit", "Status", "Action"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.map((item) => (
                <tr key={item.id} className={`hover:bg-[#F5F7F6] transition-colors ${item.status === "Out of Stock" ? "bg-red-50/30" : item.status === "Low Stock" ? "bg-amber-50/30" : ""}`}>
                  <td className="px-3 py-2.5"><input type="checkbox" className="rounded" /></td>
                  <td className="px-3 py-2.5">
                    <p className="text-xs font-medium text-[#10252E]">{item.name}</p>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[#64748B]">{item.sku}</td>
                  <td className="px-3 py-2.5 text-xs font-medium">{item.available}</td>
                  <td className="px-3 py-2.5 text-xs">{item.reserved}</td>
                  <td className="px-3 py-2.5 text-xs font-medium">{item.total}</td>
                  <td className="px-3 py-2.5 text-xs text-[#64748B]">{item.lowStockLimit}</td>
                  <td className="px-3 py-2.5"><Badge label={item.status} /></td>
                  <td className="px-3 py-2.5">
                    <ActionMenu items={[
                      { label: "Adjust Stock", icon: <Edit size={13} />, onClick: () => setAdjustItem(item) },
                      { label: "View Product", icon: <Edit size={13} />, onClick: () => {} },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={486} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
        </div>
      </Card>
    </div>
  );
}
