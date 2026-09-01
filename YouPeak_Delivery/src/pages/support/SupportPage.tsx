import { useNavigate } from "react-router-dom";
import { Phone, Plus, MessageSquare, AlertTriangle, Package, CreditCard, User, Truck, Smartphone, Shield, ChevronRight, HelpCircle } from "lucide-react";
import { mockSupportTickets } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

const categories = [
  { icon: Package, label: "Delivery Issue", bg: "var(--gm-green-light)", color: "var(--gm-green)" },
  { icon: CreditCard, label: "Payment Issue", bg: "#EFF6FF", color: "#3B82F6" },
  { icon: User, label: "Customer Issue", bg: "#FFF7ED", color: "#EA580C" },
  { icon: Truck, label: "Vendor Issue", bg: "#F5F3FF", color: "#7C3AED" },
  { icon: Smartphone, label: "App Issue", bg: "#F0FDF4", color: "var(--gm-green)" },
  { icon: Shield, label: "Account Issue", bg: "#FFF1F1", color: "#EF4444" },
];

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-5">
      {/* Emergency */}
      <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: "var(--gm-sidebar)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Emergency Support</div>
            <div className="text-white/60 text-xs">24/7 Urgent Assistance</div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold">Call Now</button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Phone, label: "Call Support", desc: "24/7 Assistance", bg: "var(--gm-green-light)", color: "var(--gm-green)" },
          { icon: Plus, label: "Create Ticket", desc: "Report an issue", bg: "#EFF6FF", color: "#3B82F6" },
          { icon: HelpCircle, label: "FAQ", desc: "Quick answers", bg: "#FFF7ED", color: "#EA580C" },
        ].map(({ icon: Icon, label, desc, bg, color }) => (
          <div key={label} className="bg-white rounded-2xl border p-4 text-center hover:shadow-md transition-all cursor-pointer" style={{ borderColor: "var(--gm-border)" }}>
            <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: bg }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-xs font-bold" style={{ color: "var(--gm-text)" }}>{label}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{desc}</div>
          </div>
        ))}
      </div>

      {/* Category grid */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>Report an Issue</div>
        <div className="space-y-1">
          {categories.map(({ icon: Icon, label, bg, color }) => (
            <button
              key={label}
              onClick={() => navigate("/support/new")}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon size={17} style={{ color }} />
              </div>
              <span className="flex-1 text-sm font-medium text-left" style={{ color: "var(--gm-text)" }}>{label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* My tickets */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--gm-border)" }}>
          <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>My Tickets</div>
        </div>
        {mockSupportTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="px-5 py-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ borderColor: "var(--gm-border)" }}
            onClick={() => navigate(`/support/${ticket.id}`)}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{ticket.subject}</div>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{ticket.id}</span>
              <span>·</span>
              <span>{ticket.category}</span>
              <span>·</span>
              <span>{ticket.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Need help */}
      <div className="p-4 rounded-2xl border" style={{ background: "var(--gm-green-light)", borderColor: "rgba(22,163,74,0.2)" }}>
        <div className="flex items-start gap-3">
          <MessageSquare size={18} style={{ color: "var(--gm-green)" }} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold mb-0.5" style={{ color: "var(--gm-green-deep)" }}>Need Help?</div>
            <div className="text-xs mb-2" style={{ color: "var(--gm-green-deep)", opacity: 0.8 }}>We are here to help you anytime.</div>
            <div className="text-xs font-medium" style={{ color: "var(--gm-green)" }}>
              🟢 Live Chat Available · Average reply time: 2 min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
