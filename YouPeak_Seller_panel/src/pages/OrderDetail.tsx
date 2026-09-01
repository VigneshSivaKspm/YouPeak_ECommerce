import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Check } from "lucide-react";
import { Button, Badge, Card, ConfirmModal, useToast } from "@/components/ui";

const steps = ["Order Received", "Accepted", "Processing", "Packed", "Ready for Pickup", "Picked Up", "Delivered"];

const orderDetail = {
  id: "ORD-102938",
  status: "Processing",
  date: "28 Aug 2026, 10:30 AM",
  customer: { name: "Ramesh Kumar", phone: "+91 98765 43210", email: "ramesh@gmail.com" },
  address: { line1: "No 12, Park Street,", line2: "Coimbatore, Tamil Nadu – 641001", pin: "641001", phone: "+91 98765 43210" },
  items: [
    { name: "Men's Denim Jacket", sku: "FM-DJ-102", qty: 1, price: "₹2,499", total: "₹2,499" },
    { name: "Casual Sneakers", sku: "SH-SN-2210", qty: 1, price: "₹950", total: "₹950" },
  ],
  summary: { itemTotal: "₹3,449", shipping: "₹0", discount: "-₹199", platformFees: "-₹180", tax: "₹380", total: "₹3,450" },
  payment: { method: "UPI", id: "UPI-345671930087" },
  timeline: [
    { step: "Order Received", date: "28 Aug 2026, 10:36 AM", done: true },
    { step: "Accepted", date: "28 Aug 2026, 11:05 AM", done: true },
    { step: "Processing", date: "28 Aug 2026, 11:30 AM", done: true },
    { step: "Packed", date: "", done: false },
  ],
};

const statusOrder = ["New", "Processing", "Packed", "Ready for Pickup", "Shipped", "Delivered"];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(orderDetail.status);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { show, ToastEl } = useToast();
  const currentStep = steps.indexOf(status === "Processing" ? "Processing" : status) + 1;

  const advance = (next: string) => { setStatus(next); show(`Order marked as ${next}`, "success"); };

  return (
    <div className="space-y-4 max-w-5xl">
      {ToastEl}
      <ConfirmModal open={cancelOpen} onClose={() => setCancelOpen(false)}
        onConfirm={() => { setStatus("Cancelled"); show("Order cancelled", "error"); }}
        title="Cancel Order" message="Are you sure you want to cancel this order? This action cannot be undone." confirmLabel="Cancel Order" danger />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/orders")} className="p-1.5 rounded-lg text-[#64748B] hover:text-[#10252E] hover:bg-white border border-[#E5E9E8] transition-colors">
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-[#10252E]">Order #{id || orderDetail.id}</h1>
              <Badge label={status} />
            </div>
            <p className="text-xs text-[#64748B]">Placed on: {orderDetail.date}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Printer size={13} />}>Print</Button>
          <Button variant="primary" size="sm" onClick={() => { const next = statusOrder[statusOrder.indexOf(status) + 1]; if (next) advance(next); }}>
            Update Status
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <h3 className="text-sm font-semibold text-[#10252E] mb-4">Order Timeline</h3>
        <div className="flex items-start gap-0 overflow-x-auto">
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep - 1;
            return (
              <div key={step} className="flex flex-col items-center flex-1 min-w-[80px]">
                <div className="flex items-center w-full">
                  {i > 0 && <div className={`flex-1 h-0.5 ${done ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`} />}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors
                    ${done ? "bg-[#16A34A] border-[#16A34A]" : active ? "border-[#16A34A] bg-white" : "border-[#E5E9E8] bg-white"}`}>
                    {done ? <Check size={12} className="text-white" /> : <span className="text-[10px] text-[#64748B]">{i + 1}</span>}
                  </div>
                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${done && i < currentStep - 1 ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`} />}
                </div>
                <p className={`text-[9px] font-medium text-center mt-1.5 ${done ? "text-[#16A34A]" : "text-[#64748B]"}`}>{step}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Items + Summary */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Items */}
          <Card padding={false}>
            <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
              <h3 className="text-sm font-semibold text-[#10252E]">Items</h3>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#E5E9E8]">
                {["Product", "SKU", "Qty", "Price", "Total"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B]">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {orderDetail.items.map((item) => (
                  <tr key={item.sku}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[#F5F7F6] flex items-center justify-center text-lg">👕</div>
                        <span className="text-xs font-medium text-[#10252E]">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">{item.sku}</td>
                    <td className="px-4 py-3 text-xs">{item.qty}</td>
                    <td className="px-4 py-3 text-xs">{item.price}</td>
                    <td className="px-4 py-3 text-xs font-medium">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Payment */}
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-3">Payment Information</h3>
            <div className="flex gap-8">
              <div><p className="text-xs text-[#64748B]">Payment Method</p><p className="text-sm font-medium text-[#10252E] mt-0.5">{orderDetail.payment.method}</p></div>
              <div><p className="text-xs text-[#64748B]">Payment ID</p><p className="text-sm font-medium text-[#10252E] mt-0.5">{orderDetail.payment.id}</p></div>
              <div><p className="text-xs text-[#64748B]">Status</p><Badge label="Paid" /></div>
            </div>
          </Card>
        </div>

        {/* Right: Customer + Summary + Actions */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-3">Customer Information</h3>
            <p className="text-sm font-medium text-[#10252E]">{orderDetail.customer.name}</p>
            <p className="text-xs text-[#64748B] mt-0.5">{orderDetail.customer.phone}</p>
            <p className="text-xs text-[#64748B]">{orderDetail.customer.email}</p>
            <div className="mt-3 pt-3 border-t border-[#E5E9E8]">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-medium text-[#10252E]">Delivery Address</p>
                <button className="text-xs text-[#16A34A] font-medium">Change</button>
              </div>
              <p className="text-xs text-[#64748B]">{orderDetail.address.line1}</p>
              <p className="text-xs text-[#64748B]">{orderDetail.address.line2}</p>
              <p className="text-xs text-[#64748B]">PIN: {orderDetail.address.pin}</p>
              <p className="text-xs text-[#64748B]">Ph: {orderDetail.address.phone}</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-[#10252E] mb-3">Order Summary</h3>
            <div className="space-y-2">
              {Object.entries(orderDetail.summary).filter(([k]) => k !== "total").map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-[#64748B] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-xs text-[#10252E]">{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-[#E5E9E8]">
                <span className="text-sm font-semibold text-[#10252E]">Total Amount</span>
                <span className="text-sm font-bold text-[#16A34A]">{orderDetail.summary.total}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => advance("Accepted")}>Accept</Button>
            <Button variant="primary" size="sm" onClick={() => advance("Packed")}>Mark as Packed</Button>
            <Button variant="secondary" size="sm" onClick={() => advance("Ready for Pickup")}>Request Pickup</Button>
            <Button variant="danger" size="sm" onClick={() => setCancelOpen(true)}>Cancel Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
