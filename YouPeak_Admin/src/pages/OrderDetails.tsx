import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Phone, MoreHorizontal, CheckCircle, Clock, Package, Truck, MapPin } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

const timeline = [
  { label: "Placed", time: "27 Aug 2026, 10:32 AM", done: true },
  { label: "Confirmed", time: "27 Aug 2026, 10:35 AM", done: true },
  { label: "Processing", time: "27 Aug 2026, 10:40 AM", done: true },
  { label: "Packed", time: "—", done: false },
  { label: "Picked Up", time: "—", done: false },
  { label: "Out for Delivery", time: "—", done: false },
  { label: "Delivered", time: "—", done: false },
];

export default function OrderDetails() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-md border border-[#E5E9E8] bg-white text-[#64748B] hover:text-[#10252E]">
            <ArrowLeft size={15} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#10252E]">Order #ORD-102938</h1>
              <StatusBadge status="Processing" size="md" />
            </div>
            <p className="text-xs text-[#64748B]">27 Aug 2026, 10:32 AM • Multiple Vendors</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] font-medium">
            <Printer size={12} /> Print Invoice
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] font-medium">
            <Phone size={12} /> Contact Customer
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] hover:text-[#10252E] font-medium">
            <MoreHorizontal size={12} /> More Actions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Timeline */}
        <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
          <h3 className="text-sm font-semibold text-[#10252E] mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {timeline.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`}>
                    {step.done ? <CheckCircle size={12} className="text-white" /> : <Clock size={12} className="text-[#94A3B8]" />}
                  </div>
                  {i < timeline.length - 1 && <div className={`w-0.5 flex-1 mt-1 min-h-[24px] ${step.done ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`} />}
                </div>
                <div className="pb-4">
                  <p className={`text-xs font-semibold ${step.done ? "text-[#10252E]" : "text-[#94A3B8]"}`}>{step.label}</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main info */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Order Info */}
            <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
              <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><Package size={12} className="text-[#16A34A]" />Order Information</h3>
              <div className="space-y-2">
                {[["Order ID", "ORD-102938"], ["Order Date", "27 Aug 2026, 10:32 AM"], ["Order Type", "Multiple Vendors"], ["Payment Method", "UPI"], ["Sub Order", "2"]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] text-[#64748B]">{k}</p>
                    <p className="text-xs font-medium text-[#10252E]">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
              <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><Phone size={12} className="text-[#16A34A]" />Customer Information</h3>
              <div className="space-y-2">
                {[["Name", "Arun Kumar"], ["Phone", "+91 98765-43210"], ["Email", "arun.k@gmail.com"], ["Location", "Chennai, TN"], ["Customer ID", "C-001"]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] text-[#64748B]">{k}</p>
                    <p className="text-xs font-medium text-[#10252E]">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
              <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><MapPin size={12} className="text-[#16A34A]" />Delivery Information</h3>
              <div className="space-y-2">
                {[["Partner", "Ramesh Kumar"], ["Partner ID", "DP-00293"], ["Vehicle", "Scooter"], ["Tracking ID", "TRK026479"], ["Address", "12, Park Street, 7 Bay Chennai, Tamil Nadu - 600001"]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[10px] text-[#64748B]">{k}</p>
                    <p className="text-xs font-medium text-[#10252E]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-lg border border-[#E5E9E8] p-4">
            <h3 className="text-xs font-semibold text-[#10252E] mb-3">Payment Breakdown</h3>
            <div className="space-y-1.5">
              {[["Total Amount", "₹4,060"], ["Discount", "-₹350"], ["Platform Fee", "₹140"], ["Delivery Fee", "₹50"], ["GST", "₹100"]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-xs text-[#64748B]">{k}</span>
                  <span className={`text-xs font-medium ${v.startsWith("-") ? "text-green-600" : "text-[#10252E]"}`}>{v}</span>
                </div>
              ))}
              <div className="border-t border-[#E5E9E8] pt-1.5 flex justify-between">
                <span className="text-xs font-bold text-[#10252E]">Total Amount</span>
                <span className="text-xs font-bold text-[#10252E]">₹4,500</span>
              </div>
            </div>
          </div>

          {/* Sub orders table */}
          <div className="bg-white rounded-lg border border-[#E5E9E8]">
            <div className="px-4 py-3 border-b border-[#E5E9E8]">
              <h3 className="text-sm font-semibold text-[#10252E]">Vendor Sub-Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                    {["Sub Order", "Vendor", "Items", "Amount", "Status", "Delivery"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[#64748B] font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  <tr className="hover:bg-[#F8FAFB]">
                    <td className="px-4 py-2.5 font-semibold text-[#10252E]">SUB-100939-A</td>
                    <td className="px-4 py-2.5 text-[#64748B]">Tech Store</td>
                    <td className="px-4 py-2.5">2 Items</td>
                    <td className="px-4 py-2.5 font-semibold">₹2,000</td>
                    <td className="px-4 py-2.5"><StatusBadge status="Processing" /></td>
                    <td className="px-4 py-2.5 text-[#64748B]">Partner Assigned</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFB]">
                    <td className="px-4 py-2.5 font-semibold text-[#10252E]">SUB-100939-B</td>
                    <td className="px-4 py-2.5 text-[#64748B]">Home Needs</td>
                    <td className="px-4 py-2.5">1 Item</td>
                    <td className="px-4 py-2.5 font-semibold">₹2,500</td>
                    <td className="px-4 py-2.5"><StatusBadge status="Packed" /></td>
                    <td className="px-4 py-2.5 text-[#64748B]">Ready for Pickup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#16A34A] text-white text-xs font-semibold rounded-md hover:bg-[#0B6B35] transition-colors">Accept Order</button>
            <button className="px-4 py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] transition-colors">Mark as Packed</button>
            <button className="px-4 py-2 bg-white border border-[#E5E9E8] text-[#10252E] text-xs font-semibold rounded-md hover:bg-[#F5F7F7] transition-colors">Request Pickup</button>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-semibold rounded-md hover:bg-red-50 transition-colors ml-auto">Cancel Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
