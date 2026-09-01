import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download } from "lucide-react";
import { customers } from "@/data/mockData";
import { PageHeader, SearchInput, Badge, Button, ActionMenu, Pagination, Card, Avatar } from "@/components/ui";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filtered = customers.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <PageHeader title="Customers" subtitle="Customers who purchased from your store"
        actions={
          <>
            <Button variant="secondary" size="sm">Filters</Button>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
          </>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "3,842" },
          { label: "New Customers", value: "142" },
          { label: "Repeat Customers", value: "2,890" },
          { label: "Active Customers", value: "3,120" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-[#64748B]">{s.label}</p>
            <p className="text-2xl font-bold text-[#10252E] mt-1">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="px-4 py-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search customers..." />
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
            <option>Status: All</option><option>Active</option><option>Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E5E9E8]">
              {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F5F7F6] transition-colors cursor-pointer" onClick={() => navigate(`/customers/${c.id}`)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={c.name} size="sm" />
                      <span className="text-xs font-medium text-[#10252E]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-[#10252E]">{c.email}</p>
                    <p className="text-[10px] text-[#64748B]">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#10252E]">{c.orders}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#10252E]">{c.totalSpent}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{c.lastOrder}</td>
                  <td className="px-4 py-3"><Badge label={c.status} /></td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <ActionMenu items={[
                      { label: "View Profile", icon: <Eye size={13} />, onClick: () => navigate(`/customers/${c.id}`) },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={3842} perPage={10} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
