import { useState } from "react";
import { Send, Paperclip, Tag, User, Clock, ChevronDown } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { tickets } from "@/data/mock";

const messages = [
  { from: "customer", name: "Arun Kumar", time: "10:42 AM", text: "I have paid for my order but it is still showing unpaid" },
  { from: "agent", name: "Support Agent", time: "10:44 AM", text: "Hi Arun! We are checking your payment. Please allow a few minutes." },
  { from: "customer", name: "Arun Kumar", time: "10:48 AM", text: "Thank you" },
];

export default function Support() {
  const [selected, setSelected] = useState(tickets[0]);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Support Center</h1>
        <div className="flex items-center gap-4">
          {[["Open", "568"], ["Pending", "284"], ["High Priority", "52"], ["Resolved Today", "126"]].map(([l, v]) => (
            <div key={l} className="text-center">
              <p className="text-lg font-bold text-[#10252E]">{v}</p>
              <p className="text-[10px] text-[#64748B]">{l}</p>
            </div>
          ))}
          <div className="text-center">
            <p className="text-lg font-bold text-[#10252E]">4.6/5 ★</p>
            <p className="text-[10px] text-[#64748B]">Satisfaction lon</p>
          </div>
        </div>
      </div>

      <div className="flex gap-0 h-[calc(100vh-220px)] min-h-[500px] bg-white rounded-lg border border-[#E5E9E8] overflow-hidden">
        {/* Ticket list */}
        <div className="w-72 flex-shrink-0 border-r border-[#E5E9E8] flex flex-col">
          <div className="p-3 border-b border-[#E5E9E8]">
            <div className="flex gap-1 mb-2">
              {["All", "Open", "Pending", "Resolved", "Closed"].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-2 py-1 text-[10px] rounded font-medium transition-colors ${activeFilter === f ? "bg-[#16A34A] text-white" : "text-[#64748B] hover:bg-[#F5F7F7]"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9]">
            {tickets.map(t => (
              <button key={t.id} onClick={() => setSelected(t)}
                className={`w-full text-left p-3 hover:bg-[#F8FAFB] transition-colors ${selected.id === t.id ? "bg-green-50 border-l-2 border-[#16A34A]" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-[#10252E] truncate">{t.id}</p>
                    <p className="text-xs font-medium text-[#10252E] truncate mt-0.5">{t.subject}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">{t.customer}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusBadge status={t.priority} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <StatusBadge status={t.status} />
                  <span className="text-[9px] text-[#94A3B8]">{t.date.split(",")[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 min-w-0 flex flex-col border-r border-[#E5E9E8]">
          <div className="px-4 py-3 border-b border-[#E5E9E8] flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#10252E]">{selected.id} — {selected.subject}</p>
              <p className="text-xs text-[#64748B]">Order: ORD-102938 | {selected.date}</p>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={selected.status} size="md" />
              <StatusBadge status={selected.priority} size="md" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === "agent" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${m.from === "agent" ? "bg-[#3B82F6]" : "bg-[#16A34A]"}`}>
                  {m.name[0]}
                </div>
                <div className={`max-w-xs ${m.from === "agent" ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`px-3 py-2 rounded-lg text-xs ${m.from === "agent" ? "bg-[#3B82F6] text-white" : "bg-[#F5F7F7] text-[#10252E]"}`}>
                    {m.text}
                  </div>
                  <p className="text-[9px] text-[#94A3B8] mt-0.5">{m.name} • {m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[#E5E9E8]">
            <div className="flex gap-2">
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your reply..."
                className="flex-1 px-3 py-2 text-xs border border-[#E5E9E8] rounded-md outline-none focus:border-[#16A34A]"
                onKeyDown={e => e.key === "Enter" && setMessage("")}
              />
              <button className="p-2 text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F7] rounded-md"><Paperclip size={14} /></button>
              <button className="px-3 py-2 bg-[#16A34A] text-white text-xs rounded-md hover:bg-[#0B6B35] flex items-center gap-1.5"><Send size={12} /> Send</button>
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="w-60 flex-shrink-0 p-4 overflow-y-auto">
          <h3 className="text-xs font-semibold text-[#10252E] mb-3">Customer Details</h3>
          <div className="flex flex-col items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white font-bold flex items-center justify-center text-base">A</div>
            <p className="text-xs font-semibold text-[#10252E] mt-2">{selected.customer}</p>
            <p className="text-[10px] text-[#64748B]">arun.kumar@gmail.com</p>
          </div>
          <div className="space-y-2">
            {[["Phone", "+91 98765-43210"], ["Location", "Chennai, Tamil Nadu"], ["Total Spent", "₹24,680"], ["Total Orders", "18"]].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] text-[#64748B]">{k}</p>
                <p className="text-xs font-medium text-[#10252E]">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#E5E9E8]">
            <h3 className="text-xs font-semibold text-[#10252E] mb-2">Ticket Details</h3>
            <div className="space-y-2">
              {[["Priority", selected.priority], ["Status", selected.status], ["Created On", selected.date]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-[#64748B]">{k}</p>
                  <p className="text-xs font-medium text-[#10252E]">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full py-1.5 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35]">View Full Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
