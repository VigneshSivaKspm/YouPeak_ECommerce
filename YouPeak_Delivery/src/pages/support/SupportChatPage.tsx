import { useState } from "react";
import { useParams } from "react-router-dom";
import { Send, Paperclip } from "lucide-react";
import { mockSupportTickets } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

export default function SupportChatPage() {
  const { id } = useParams();
  const ticket = mockSupportTickets.find((t) => t.id === id) ?? mockSupportTickets[0];
  const [messages, setMessages] = useState(ticket.messages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "driver", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Ticket header */}
      <div className="bg-white border-b px-4 py-3 flex items-start justify-between" style={{ borderColor: "var(--gm-border)" }}>
        <div>
          <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{ticket.subject}</div>
          <div className="text-xs text-gray-400 mt-0.5">{ticket.id} · {ticket.category}</div>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "var(--gm-bg)" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "driver" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "support" && (
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
                G
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "driver" ? "rounded-br-sm text-white" : "rounded-bl-sm bg-white border"
              }`}
              style={{
                background: msg.sender === "driver" ? "var(--gm-green)" : "white",
                borderColor: msg.sender === "support" ? "var(--gm-border)" : "transparent",
                color: msg.sender === "driver" ? "white" : "var(--gm-text)",
              }}
            >
              <div>{msg.text}</div>
              <div className={`text-[10px] mt-1 ${msg.sender === "driver" ? "text-white/70" : "text-gray-400"}`}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-3 safe-bottom flex items-end gap-2" style={{ borderColor: "var(--gm-border)" }}>
        <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0">
          <Paperclip size={18} className="text-gray-400" />
        </button>
        <div className="flex-1 px-3.5 py-2.5 rounded-xl border flex items-end gap-2" style={{ borderColor: "var(--gm-border)" }}>
          <textarea
            className="flex-1 text-sm outline-none resize-none bg-transparent max-h-28"
            style={{ color: "var(--gm-text)" }}
            placeholder="Type a message..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl text-white flex-shrink-0 disabled:opacity-40 transition-opacity"
          style={{ background: "var(--gm-green)" }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
