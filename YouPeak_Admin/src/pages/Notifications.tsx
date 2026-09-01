import { Bell, ShoppingCart, Package, Store, AlertCircle, CheckCircle } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

const notifications = [
  { icon: ShoppingCart, color: "bg-blue-50 text-blue-600", title: "New Order Received", desc: "Order #ORD-102938 placed by Arun Kumar — ₹4,299", time: "2 min ago", unread: true },
  { icon: Package, color: "bg-yellow-50 text-yellow-600", title: "Product Approval Required", desc: "Running Shoes from Sports Hub pending approval", time: "15 min ago", unread: true },
  { icon: Store, color: "bg-purple-50 text-purple-600", title: "New Vendor Registration", desc: "TechZone India applied to become a vendor", time: "1 hr ago", unread: true },
  { icon: AlertCircle, color: "bg-red-50 text-red-600", title: "Payment Failure Alert", desc: "Order #ORD-102920 payment failed — customer notified", time: "2 hr ago", unread: false },
  { icon: CheckCircle, color: "bg-green-50 text-green-600", title: "Payout Completed", desc: "Tech Store payout ₹45,780 processed successfully", time: "3 hr ago", unread: false },
  { icon: Bell, color: "bg-gray-50 text-gray-600", title: "System Maintenance Scheduled", desc: "Scheduled maintenance on 30 Aug 2026 2:00 AM IST", time: "5 hr ago", unread: false },
];

export default function Notifications() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Notifications</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium">Mark All Read</button>
          <button className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium">Settings</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E5E9E8] divide-y divide-[#F1F5F9]">
        {notifications.map((n, i) => (
          <div key={i} className={`flex items-start gap-3 p-4 hover:bg-[#F8FAFB] transition-colors cursor-pointer ${n.unread ? "bg-green-50/30" : ""}`}>
            <span className={`${n.color} p-2 rounded-lg flex-shrink-0`}><n.icon size={16} /></span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-xs font-semibold ${n.unread ? "text-[#10252E]" : "text-[#64748B]"}`}>{n.title}</p>
                <span className="text-[10px] text-[#94A3B8] whitespace-nowrap flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">{n.desc}</p>
            </div>
            {n.unread && <div className="w-2 h-2 bg-[#16A34A] rounded-full flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
