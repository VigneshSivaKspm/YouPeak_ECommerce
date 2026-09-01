import { useState } from "react";
import { Send, Paperclip, ArrowLeft } from "lucide-react";
import { tickets } from "@/data/mockData";
import { PageHeader, Tabs, SearchInput, Badge, Button, Card, Input, Textarea, Select, useToast } from "@/components/ui";

const tabs = ["Create Ticket", "My Tickets", "FAQ", "Help Center", "Contact Support"];
const faqs = [
  { q: "How do I update my order status?", a: "Go to Orders, find the order, click the three-dot menu and select Update Status." },
  { q: "When will I receive my payout?", a: "Payouts are processed every 7 days. You can request an early payout from the Payouts page." },
  { q: "How do I add a new product?", a: "Go to Products → Add Product and follow the multi-step form to list your product." },
  { q: "What are the commission rates?", a: "Commission rates vary by category, typically 5–15%. Check your category in Earnings > Commission Report." },
];

const messages = [
  { from: "seller", text: "Order not picked up for 2 days. It's showing out for delivery from morning.", time: "27 Aug 2026, 09:15 AM" },
  { from: "support", text: "We are checking with the delivery partner. Please allow some time.", time: "27 Aug 2026, 11:35 AM" },
  { from: "seller", text: "Okay, please let me know.", time: "27 Aug 2026, 11:40 AM" },
];

export default function Support() {
  const [tab, setTab] = useState("My Tickets");
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);
  const [message, setMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { show, ToastEl } = useToast();

  return (
    <div className="space-y-4">
      {ToastEl}
      <PageHeader title="Support" subtitle="Get help with your seller account" />

      <Card padding={false}>
        <div className="px-4 overflow-x-auto border-b border-[#E5E9E8]">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>

        {tab === "Create Ticket" && (
          <div className="p-5 max-w-lg">
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Create Support Ticket</h3>
            <div className="space-y-4">
              <Select label="Category" options={[
                { label: "Order Issue", value: "order" }, { label: "Product Issue", value: "product" },
                { label: "Payment Issue", value: "payment" }, { label: "Account Issue", value: "account" },
                { label: "Technical Issue", value: "tech" }, { label: "Other", value: "other" },
              ]} />
              <Select label="Priority" options={[
                { label: "Low", value: "low" }, { label: "Medium", value: "medium" }, { label: "High", value: "high" },
              ]} />
              <Input label="Subject *" placeholder="Brief description of your issue" />
              <Input label="Related Order ID (optional)" placeholder="e.g. ORD-102938" />
              <Textarea label="Description *" rows={5} placeholder="Describe your issue in detail..." />
              <Button variant="primary" size="md" onClick={() => show("Ticket created! We'll respond within 24 hours.", "success")}>
                Submit Ticket
              </Button>
            </div>
          </div>
        )}

        {tab === "My Tickets" && (
          <div className="flex h-96">
            {/* Ticket List */}
            <div className={`${selectedTicket ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-80 border-r border-[#E5E9E8]`}>
              <div className="p-3 border-b border-[#E5E9E8]">
                <SearchInput value="" onChange={() => {}} placeholder="Search tickets..." />
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-[#E5E9E8]">
                {tickets.map((t) => (
                  <div key={t.id} onClick={() => setSelectedTicket(t)}
                    className={`px-4 py-3 cursor-pointer hover:bg-[#F5F7F6] transition-colors ${selectedTicket?.id === t.id ? "bg-green-50 border-l-2 border-[#16A34A]" : ""}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#16A34A]">{t.id}</span>
                      <Badge label={t.priority} />
                    </div>
                    <p className="text-xs font-medium text-[#10252E] truncate">{t.subject}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge label={t.status} />
                      <span className="text-[10px] text-[#64748B]">{t.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation */}
            {selectedTicket ? (
              <div className="flex-1 flex flex-col">
                <div className="px-4 py-3 border-b border-[#E5E9E8] flex items-center gap-3">
                  <button onClick={() => setSelectedTicket(null)} className="lg:hidden text-[#64748B]">
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#10252E]">{selectedTicket.subject}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge label={selectedTicket.status} />
                      <Badge label={selectedTicket.priority} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "seller" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-xl text-xs ${m.from === "seller" ? "bg-[#16A34A] text-white" : "bg-[#F5F7F6] text-[#10252E] border border-[#E5E9E8]"}`}>
                        <p>{m.text}</p>
                        <p className={`text-[10px] mt-1 ${m.from === "seller" ? "text-white/70" : "text-[#64748B]"}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-[#E5E9E8] flex items-end gap-2">
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." rows={2} className="flex-1" />
                  <div className="flex flex-col gap-1">
                    <button className="p-2 text-[#64748B] hover:text-[#10252E] transition-colors"><Paperclip size={16} /></button>
                    <button onClick={() => { show("Message sent!", "success"); setMessage(""); }}
                      className="p-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#08783D] transition-colors"><Send size={16} /></button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-1 items-center justify-center text-[#64748B] text-sm">
                Select a ticket to view conversation
              </div>
            )}
          </div>
        )}

        {tab === "FAQ" && (
          <div className="p-5 max-w-2xl">
            <h3 className="text-sm font-semibold text-[#10252E] mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#E5E9E8] rounded-xl overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#F5F7F6] transition-colors">
                    <span className="text-sm font-medium text-[#10252E]">{faq.q}</span>
                    <span className="text-[#64748B]">{expandedFaq === i ? "−" : "+"}</span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 py-3 border-t border-[#E5E9E8] bg-[#F5F7F6]">
                      <p className="text-xs text-[#64748B]">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(tab === "Help Center" || tab === "Contact Support") && (
          <div className="p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">{tab === "Help Center" ? "📚" : "📞"}</span>
            </div>
            <p className="text-sm font-medium text-[#10252E]">{tab}</p>
            <p className="text-xs text-[#64748B] mt-1">{tab === "Help Center" ? "Browse our knowledge base and guides." : "Reach our support team directly."}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => show("Opening...", "info")}>Open {tab}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
