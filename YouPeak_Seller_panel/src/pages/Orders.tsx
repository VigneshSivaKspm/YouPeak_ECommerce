import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Printer, MessageSquare, XCircle, RefreshCw, Download } from "lucide-react";
import { orders } from "@/data/mockData";
import { PageHeader, Tabs, SearchInput, Badge, Button, ActionMenu, Table, Td, Pagination, Card } from "@/components/ui";

const statusTabs = ["All", "New", "Processing", "Packed", "Ready for Pickup", "Shipped", "Delivered", "Cancelled", "Returned"];
const filterOptions = [
  { label: "Date: This Month", value: "month" },
  { label: "Date: Today", value: "today" },
  { label: "Date: This Week", value: "week" },
];
const paymentOptions = [{ label: "Payment: All", value: "" }, { label: "Paid", value: "Paid" }, { label: "COD", value: "COD" }];

export default function Orders() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const filtered = orders.filter((o) => {
    if (tab !== "All" && o.status !== tab) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader title="Orders" subtitle="Manage and track all your orders"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
          </>
        }
      />

      <Card padding={false}>
        {/* Search & Filters */}
        <div className="px-4 pt-4 pb-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by Order ID, customer..." />
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none focus:border-[#16A34A]">
            {filterOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none focus:border-[#16A34A]">
            {paymentOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none focus:border-[#16A34A]">
            <option>Amount: All</option><option>Under ₹1,000</option><option>₹1,000–₹5,000</option><option>Above ₹5,000</option>
          </select>
          <button className="h-8 px-3 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] hover:bg-[#F5F7F6] transition-colors">More Filters</button>
          <div className="ml-auto">
            <button className="h-8 px-3 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] hover:bg-[#F5F7F6] transition-colors">Bulk Actions</button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="px-4 overflow-x-auto">
          <Tabs tabs={statusTabs} active={tab} onChange={setTab} />
        </div>

        {/* Table */}
        <Table columns={["Order ID", "Customer", "Items", "Date", "Amount", "Payment", "Status", "Delivery", "Actions"]}>
          {filtered.map((o) => (
            <tr key={o.id} className="hover:bg-[#F5F7F6] transition-colors cursor-pointer" onClick={() => navigate(`/orders/${o.id}`)}>
              <Td><span className="text-[#16A34A] font-medium text-xs">{o.id}</span></Td>
              <Td>
                <div>
                  <p className="text-xs font-medium text-[#10252E]">{o.customer}</p>
                  <p className="text-[10px] text-[#64748B]">{o.customerEmail}</p>
                </div>
              </Td>
              <Td><span className="text-xs">{o.items}</span></Td>
              <Td><span className="text-xs text-[#64748B]">{o.date}</span></Td>
              <Td><span className="text-xs font-medium">{o.amount}</span></Td>
              <Td><Badge label={o.payment} /></Td>
              <Td><Badge label={o.status} /></Td>
              <Td><span className="text-xs text-[#64748B]">{o.delivery}</span></Td>
              <Td onClick={(e) => e.stopPropagation()}>
                <ActionMenu items={[
                  { label: "View Order", icon: <Eye size={13} />, onClick: () => navigate(`/orders/${o.id}`) },
                  { label: "Update Status", icon: <RefreshCw size={13} />, onClick: () => {} },
                  { label: "Print", icon: <Printer size={13} />, onClick: () => {} },
                  { label: "Contact Customer", icon: <MessageSquare size={13} />, onClick: () => {} },
                  { label: "Cancel", icon: <XCircle size={13} />, onClick: () => {}, danger: true },
                ]} />
              </Td>
            </tr>
          ))}
        </Table>

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={248} perPage={perPage} onPageChange={setPage} onPerPageChange={setPerPage} />
        </div>
      </Card>
    </div>
  );
}
