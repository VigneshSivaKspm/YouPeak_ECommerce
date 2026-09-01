import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Phone, Navigation, Package, CreditCard, Clock, ChevronRight, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import StatusBadge from "@/components/common/StatusBadge";
import MapView from "@/components/common/MapView";
import type { DeliveryStatus } from "@/data/mockData";

const timeline: { status: DeliveryStatus; label: string }[] = [
  { status: "assigned", label: "Assigned" },
  { status: "accepted", label: "Accepted" },
  { status: "navigating_pickup", label: "Navigating to Pickup" },
  { status: "arrived_pickup", label: "Arrived at Pickup" },
  { status: "pickup_verified", label: "Pickup Verified" },
  { status: "picked_up", label: "Picked Up" },
  { status: "out_for_delivery", label: "Out for Delivery" },
  { status: "arrived_customer", label: "Arrived at Customer" },
  { status: "otp_verified", label: "OTP Verified" },
  { status: "delivered", label: "Delivered" },
];

const statusOrder = timeline.map((t) => t.status);

const nextActions: Partial<Record<DeliveryStatus, { label: string; path: string; nextStatus: DeliveryStatus }>> = {
  assigned: { label: "Accept & Navigate to Pickup", path: "navigation", nextStatus: "navigating_pickup" },
  accepted: { label: "Navigate to Pickup", path: "navigation", nextStatus: "navigating_pickup" },
  navigating_pickup: { label: "Arrived at Pickup", path: "pickup", nextStatus: "arrived_pickup" },
  arrived_pickup: { label: "Verify Pickup", path: "verify-pickup", nextStatus: "pickup_verified" },
  pickup_verified: { label: "Confirm Package Check", path: "package-check", nextStatus: "picked_up" },
  picked_up: { label: "Start Delivery", path: "delivery", nextStatus: "out_for_delivery" },
  out_for_delivery: { label: "Arrived at Customer", path: "delivery", nextStatus: "arrived_customer" },
  arrived_customer: { label: "Verify Delivery", path: "verify-delivery", nextStatus: "otp_verified" },
  otp_verified: { label: "Upload Proof of Delivery", path: "proof", nextStatus: "proof_submitted" },
  proof_submitted: { label: "Complete Delivery", path: "proof", nextStatus: "delivered" },
};

export default function DeliveryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();

  const delivery = deliveries.find((d) => d.id === id);
  if (!delivery) return <div className="p-8 text-center text-gray-400">Delivery not found</div>;

  const currentIdx = statusOrder.indexOf(delivery.status);
  const action = nextActions[delivery.status];
  const isComplete = ["delivered", "failed", "cancelled"].includes(delivery.status);

  const handleAction = () => {
    if (!action) return;
    if (action.path === "pickup" || action.path === "delivery") {
      updateDeliveryStatus(delivery.id, action.nextStatus);
    } else {
      navigate(`/deliveries/${id}/${action.path}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 bg-white rounded-2xl border px-5 py-4" style={{ borderColor: "var(--gm-border)" }}>
        <div>
          <div className="text-xs text-gray-500 font-medium">Order Details</div>
          <div className="text-xl font-black mt-0.5" style={{ color: "var(--gm-text)" }}>#{delivery.orderId}</div>
        </div>
        <StatusBadge status={delivery.status} />
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-5 space-y-4 lg:space-y-0">
        {/* Left col */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <MapView className="h-48 lg:h-64 rounded-2xl" mode="overview" />

          {/* Timeline */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>Delivery Timeline</h3>
            <div className="space-y-0">
              {timeline.map((step, i) => {
                const done = i < currentIdx;
                const current = i === currentIdx;
                const upcoming = i > currentIdx;
                return (
                  <div key={step.status} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        done ? "bg-green-100" : current ? "bg-green-500" : "bg-gray-100"
                      }`}>
                        {done ? (
                          <CheckCircle2 size={14} style={{ color: "var(--gm-green)" }} />
                        ) : current ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        ) : (
                          <Circle size={14} className="text-gray-300" />
                        )}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className={`w-0.5 h-5 mt-0.5 ${done ? "bg-green-200" : "bg-gray-100"}`} />
                      )}
                    </div>
                    <div className={`pb-4 ${i === timeline.length - 1 ? "pb-0" : ""}`}>
                      <div className={`text-sm font-medium ${done ? "text-green-600" : current ? "font-bold" : "text-gray-400"}`} style={current ? { color: "var(--gm-green)" } : {}}>
                        {step.label}
                      </div>
                      {current && <div className="text-xs text-gray-400 mt-0.5">Current stage</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Pickup + Customer side by side */}
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard
              title="Pickup Details"
              color="bg-amber-50"
              items={[
                { label: "Store", value: delivery.vendor.name },
                { label: "Address", value: delivery.vendor.address },
                { label: "Distance", value: delivery.vendor.distance },
                { label: "ETA", value: delivery.vendor.eta },
              ]}
              actions={[
                { label: "Call Store", icon: <Phone size={14} />, onClick: () => {} },
                { label: "Navigate", icon: <Navigation size={14} />, onClick: () => navigate(`/deliveries/${id}/navigation`) },
              ]}
            />
            <InfoCard
              title="Customer Details"
              color="bg-blue-50"
              items={[
                { label: "Customer", value: delivery.customer.name },
                { label: "Address", value: delivery.customer.address },
                { label: "Instructions", value: delivery.customer.instructions || "None" },
                { label: "Distance", value: delivery.customer.distance },
              ]}
              actions={[
                { label: "Call", icon: <Phone size={14} />, onClick: () => {} },
                { label: "Navigate", icon: <Navigation size={14} />, onClick: () => navigate(`/deliveries/${id}/navigation`) },
              ]}
            />
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>Order Summary</h3>
            <div className="space-y-2.5">
              <SummaryRow label="Items" value={`${delivery.packages} packages`} />
              <SummaryRow label="Order Value" value={`₹${delivery.amount.toLocaleString()}`} />
              <SummaryRow label="Payment" value={delivery.paymentMethod} highlight={delivery.paymentMethod === "COD"} />
              <SummaryRow label="Status" value={delivery.paymentStatus} green={delivery.paymentStatus === "Paid"} />
              <div className="pt-2 border-t mt-2" style={{ borderColor: "var(--gm-border)" }}>
                <SummaryRow label="Your Earning" value={`₹${delivery.earning}`} green />
              </div>
            </div>
          </div>

          {/* Package details */}
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>Package Information</h3>
            <div className="space-y-2">
              {Array.from({ length: delivery.packages }, (_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--gm-green-light)" }}>
                  <Package size={16} style={{ color: "var(--gm-green)" }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--gm-text)" }}>Package {i + 1} of {delivery.packages}</div>
                    <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>PKG-{delivery.orderId}-{i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      {!isComplete && action && (
        <div className="fixed bottom-0 left-0 right-0 lg:sticky lg:bottom-auto p-4 bg-white border-t lg:mt-5 lg:rounded-2xl lg:border safe-bottom" style={{ borderColor: "var(--gm-border)" }}>
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleAction}
              className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "var(--gm-green)" }}
            >
              {action.label}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ title, color, items, actions }: {
  title: string; color: string;
  items: { label: string; value: string }[];
  actions: { label: string; icon: React.ReactNode; onClick: () => void }[];
}) {
  return (
    <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>{title}</h3>
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="text-xs text-gray-400">{item.label}</div>
            <div className="text-sm font-medium" style={{ color: "var(--gm-text)" }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className="flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
            style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
          >
            {a.icon} {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight, green }: { label: string; value: string; highlight?: boolean; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: "var(--gm-text-muted)" }}>{label}</span>
      <span className={`text-sm font-semibold ${green ? "" : highlight ? "text-amber-600" : ""}`} style={green ? { color: "var(--gm-green)" } : {}}>
        {value}
      </span>
    </div>
  );
}
