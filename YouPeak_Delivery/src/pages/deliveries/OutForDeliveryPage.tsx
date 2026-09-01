import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageSquare, Navigation2, Volume2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import MapView from "@/components/common/MapView";

export default function OutForDeliveryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  const handleArrived = () => {
    if (delivery) updateDeliveryStatus(delivery.id, "arrived_customer");
    navigate(`/deliveries/${id}/verify-delivery`);
  };

  if (!delivery) return null;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gray-900 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent">
      {/* Map */}
      <div className="relative flex-1">
        <MapView className="w-full h-full" mode="delivery" deliveryLabel="Customer" />

        {/* Top overlay */}
        <div className="absolute top-0 left-0 right-0 safe-top">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <div className="bg-white rounded-xl shadow px-4 py-2.5 text-center">
              <div className="text-xs font-medium text-gray-500">Out for Delivery</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>
                {delivery.customer.distance} · ETA {delivery.customer.eta}
              </div>
            </div>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center">
              <Volume2 size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        <button className="absolute right-4 bottom-72 w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center">
          <Navigation2 size={18} style={{ color: "var(--gm-green)" }} />
        </button>
      </div>

      {/* Bottom card */}
      <div className="bg-white rounded-t-3xl shadow-2xl px-5 pt-3 pb-6 safe-bottom">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-400 mb-0.5">Customer</div>
            <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>{delivery.customer.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{delivery.customer.address}</div>
            {delivery.customer.instructions && (
              <div className="text-xs text-amber-600 mt-1 p-2 rounded-lg bg-amber-50">{delivery.customer.instructions}</div>
            )}
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>{delivery.customer.distance}</div>
            <div className="text-xs text-gray-400">{delivery.customer.eta}</div>
            {delivery.paymentMethod === "COD" && (
              <div className="text-xs font-bold text-amber-600 mt-1">COD ₹{delivery.amount.toLocaleString()}</div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleArrived}
            className="flex-[3] py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: "var(--gm-green)" }}
          >
            <Navigation2 size={16} />
            Arrived at Location
          </button>
          <button className="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)" }}>
            <Phone size={16} style={{ color: "var(--gm-green)" }} />
            <span className="text-[10px] font-medium text-gray-500">Call</span>
          </button>
          <button className="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)" }}>
            <MessageSquare size={16} className="text-blue-500" />
            <span className="text-[10px] font-medium text-gray-500">Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
