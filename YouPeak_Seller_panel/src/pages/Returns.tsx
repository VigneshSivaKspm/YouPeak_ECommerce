import { useState } from "react";
import { Eye } from "lucide-react";
import { returns } from "@/data/mockData";
import { PageHeader, Tabs, SearchInput, Badge, Button, ActionMenu, Pagination, Card, Modal, useToast } from "@/components/ui";

const statusTabs = ["Requested", "Approved", "Pickup", "Received", "Refunded", "Rejected"];

export default function Returns() {
  const [tab, setTab] = useState("Requested");
  const [search, setSearch] = useState("");
  const [viewReturn, setViewReturn] = useState<typeof returns[0] | null>(null);
  const [page, setPage] = useState(1);
  const { show, ToastEl } = useToast();

  const filtered = returns.filter((r) => {
    if (r.status !== tab) return false;
    if (search && !r.id.toLowerCase().includes(search.toLowerCase()) && !r.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {ToastEl}

      <Modal open={!!viewReturn} onClose={() => setViewReturn(null)} title="Return Details" width="max-w-2xl">
        {viewReturn && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#64748B]">Return ID</p>
                <p className="text-sm font-medium text-[#10252E]">{viewReturn.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Order ID</p>
                <p className="text-sm font-medium text-[#10252E]">{viewReturn.orderId}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Customer</p>
                <p className="text-sm font-medium text-[#10252E]">{viewReturn.customer}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Product</p>
                <p className="text-sm font-medium text-[#10252E]">{viewReturn.product}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Reason</p>
                <p className="text-sm text-[#10252E]">{viewReturn.reason}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Amount</p>
                <p className="text-sm font-semibold text-[#10252E]">{viewReturn.amount}</p>
              </div>
            </div>
            <div className="border-t border-[#E5E9E8] pt-4">
              <p className="text-xs font-medium text-[#10252E] mb-2">Return Timeline</p>
              <div className="flex gap-3">
                {["Return Requested", "Under Review", "Waiting for Approval"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`} />
                    <span className="text-xs text-[#64748B]">{s}</span>
                    {i < 2 && <span className="text-[#E5E9E8]">→</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end border-t border-[#E5E9E8] pt-4">
              <Button variant="danger" size="sm" onClick={() => { show("Return rejected", "error"); setViewReturn(null); }}>Reject</Button>
              <Button variant="primary" size="sm" onClick={() => { show("Return approved!", "success"); setViewReturn(null); }}>Approve Return</Button>
            </div>
          </div>
        )}
      </Modal>

      <PageHeader title="Returns" subtitle="Manage customer return requests" />

      <Card padding={false}>
        <div className="px-4 overflow-x-auto border-b border-[#E5E9E8]">
          <Tabs tabs={statusTabs} active={tab} onChange={setTab} />
        </div>

        <div className="px-4 py-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by Return ID or customer..." />
          <button className="h-8 px-3 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] hover:bg-[#F5F7F6]">Filters</button>
        </div>

        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#E5E9E8]">
                {["Return ID", "Order ID", "Customer", "Product", "Reason", "Amount", "Date", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7F6] transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-[#16A34A]">{r.id}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">{r.orderId}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#10252E]">{r.customer}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] max-w-[120px] truncate">{r.product}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">{r.reason}</td>
                    <td className="px-4 py-3 text-xs font-medium">{r.amount}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">{r.date}</td>
                    <td className="px-4 py-3"><Badge label={r.status} /></td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" icon={<Eye size={13} />} onClick={() => setViewReturn(r)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm font-medium text-[#10252E]">No {tab} returns</p>
            <p className="text-xs text-[#64748B] mt-1">No returns with status "{tab}" found.</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={returns.length} perPage={10} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
