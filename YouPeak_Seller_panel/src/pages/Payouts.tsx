import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { payouts } from "@/data/mockData";
import { PageHeader, Badge, Button, Pagination, Card, Modal, Input, Select, useToast } from "@/components/ui";

export default function Payouts() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { show, ToastEl } = useToast();

  return (
    <div className="space-y-4">
      {ToastEl}

      <Modal open={requestOpen} onClose={() => setRequestOpen(false)} title="Request Payout" width="max-w-sm">
        <div className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700">Available Balance</p>
            <p className="text-2xl font-bold text-[#16A34A]">₹82,450</p>
          </div>
          <Input label="Payout Amount *" type="number" placeholder="Enter amount" defaultValue="82450" />
          <Select label="Payout Method" options={[
            { label: "Bank Transfer", value: "bank" }, { label: "UPI", value: "upi" },
          ]} />
          <Select label="Bank Account" options={[
            { label: "HDFC Bank ****1234", value: "hdfc" }, { label: "Add New Account", value: "new" },
          ]} />
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setRequestOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => { show("Payout request submitted!", "success"); setRequestOpen(false); }}>Confirm Request</Button>
          </div>
        </div>
      </Modal>

      <PageHeader title="Payouts" subtitle="Manage your payout requests and history" />

      {/* Balance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { label: "Available Balance", value: "₹82,450", sub: "Ready for Payout", icon: "💰", green: true },
          { label: "Pending Payout", value: "₹24,800", sub: "Will be processed soon", icon: "⏳" },
          { label: "Next Payout", value: "30 Aug 2026", sub: "Estimated Date", icon: "📅" },
        ].map((s) => (
          <Card key={s.label} className={s.green ? "border-green-200 bg-green-50/30" : ""}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#64748B]">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.green ? "text-[#16A34A]" : "text-[#10252E]"}`}>{s.value}</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">{s.sub}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={() => setRequestOpen(true)}>
        Request Payout
      </Button>

      {/* Payout History */}
      <Card padding={false}>
        <div className="px-4 py-3.5 border-b border-[#E5E9E8] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#10252E]">Payout History</h3>
          <Button variant="secondary" size="sm" icon={<Download size={13} />}>Export</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E5E9E8]">
              {["Date", "Payout ID", "Amount", "Method", "Status", "Transaction ID", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F5F7F6] transition-colors">
                  <td className="px-4 py-3 text-xs text-[#64748B]">{p.date}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#16A34A]">{p.id}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#10252E]">{p.amount}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{p.method}</td>
                  <td className="px-4 py-3"><Badge label={p.status} /></td>
                  <td className="px-4 py-3 font-mono text-[10px] text-[#64748B]">{p.txnId}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" icon={<Download size={12} />}>Receipt</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={payouts.length} perPage={10} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
