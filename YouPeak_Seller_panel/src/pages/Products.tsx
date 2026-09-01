import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Copy, EyeOff, Trash2, Plus, Download, Upload } from "lucide-react";
import { products } from "@/data/mockData";
import { PageHeader, SearchInput, Badge, Button, Stars, ActionMenu, Pagination, Card, ConfirmModal, useToast } from "@/components/ui";

export default function Products() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { show, ToastEl } = useToast();

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {ToastEl}
      <ConfirmModal open={deleteId !== null} onClose={() => setDeleteId(null)}
        onConfirm={() => { show("Product deleted", "error"); setDeleteId(null); }}
        title="Delete Product" message="Are you sure you want to delete this product? This action cannot be undone." confirmLabel="Delete" danger />

      <PageHeader title="Products" subtitle="Manage your product catalog"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Upload size={13} />}>Import</Button>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
            <Button variant="primary" size="sm" icon={<Plus size={13} />} onClick={() => navigate("/products/add")}>Add Product</Button>
          </>
        }
      />

      <Card padding={false}>
        {/* Filters */}
        <div className="px-4 py-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search products..." />
          {["Category", "Brand", "Status", "Stock"].map((f) => (
            <select key={f} className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none focus:border-[#16A34A]">
              <option>{f}: All</option>
            </select>
          ))}
          <button className="h-8 px-3 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] hover:bg-[#F5F7F6]">More Filters</button>
        </div>

        {/* Filter tabs */}
        <div className="px-4 py-2 flex gap-2 border-b border-[#E5E9E8] overflow-x-auto">
          {[
            { label: "All", count: 486 }, { label: "Active", count: 412 }, { label: "Draft", count: 38 },
            { label: "Pending", count: 12 }, { label: "Rejected", count: 5 },
          ].map((t) => (
            <button key={t.label}
              className="px-3 py-1 text-xs font-medium rounded-full border border-[#E5E9E8] whitespace-nowrap hover:bg-[#F5F7F6] transition-colors">
              {t.label} <span className="text-[#64748B]">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E5E9E8]">
              <th className="px-3 py-2.5 w-8"><input type="checkbox" className="rounded" /></th>
              {["Product", "SKU", "Category", "Price", "Stock", "Sales", "Rating", "Status", "Actions"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F7F6] transition-colors">
                  <td className="px-3 py-2.5"><input type="checkbox" className="rounded" /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#F5F7F6] flex items-center justify-center text-xl shrink-0">{p.image}</div>
                      <div>
                        <p className="text-xs font-medium text-[#10252E]">{p.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[#64748B]">{p.sku}</td>
                  <td className="px-3 py-2.5 text-xs text-[#64748B]">{p.category}</td>
                  <td className="px-3 py-2.5 text-xs font-medium">{p.price}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 15 ? "text-amber-600" : "text-[#10252E]"}`}>{p.stock}</span>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[#64748B]">{p.sales}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <Stars rating={Math.floor(p.rating)} />
                      <span className="text-xs text-[#64748B]">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><Badge label={p.status} /></td>
                  <td className="px-3 py-2.5">
                    <ActionMenu items={[
                      { label: "View", icon: <Eye size={13} />, onClick: () => navigate(`/products/${p.id}/edit`) },
                      { label: "Edit", icon: <Edit size={13} />, onClick: () => navigate(`/products/${p.id}/edit`) },
                      { label: "Duplicate", icon: <Copy size={13} />, onClick: () => show("Product duplicated", "success") },
                      { label: "Disable", icon: <EyeOff size={13} />, onClick: () => show("Product disabled", "info") },
                      { label: "Delete", icon: <Trash2 size={13} />, onClick: () => setDeleteId(p.id), danger: true },
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
