import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Package, Navigation2, Volume2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import MapView from "@/components/common/MapView";

export default function PickupNavigationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  const handleArrived = () => {
    if (delivery) updateDeliveryStatus(delivery.id, "arrived_pickup");
    navigate(`/deliveries/${id}/verify-pickup`);
  };

  if (!delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-900 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:h-full">
      {/* Map - fills most of screen */}
      <div className="relative flex-1">
        <MapView className="w-full h-full" mode="pickup" pickupLabel="Store" />

        {/* Top overlay */}
        <div className="absolute top-0 left-0 right-0 safe-top">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <div className="bg-white rounded-xl shadow px-4 py-2.5 text-center">
              <div className="text-xs font-medium text-gray-500">Navigate to Pickup</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>
                {delivery.vendor.distance} · ETA {delivery.vendor.eta}
              </div>
            </div>
            <button className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center">
              <Volume2 size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Recenter / compass */}
        <button className="absolute right-4 bottom-72 lg:bottom-60 w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center">
          <Navigation2 size={18} style={{ color: "var(--gm-green)" }} />
        </button>
      </div>

      {/* Bottom card */}
      <div className="bg-white rounded-t-3xl shadow-2xl px-5 pt-3 pb-6 safe-bottom">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-0.5">Pickup Location</div>
            <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>{delivery.vendor.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{delivery.vendor.address}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>{delivery.vendor.distance}</div>
            <div className="text-xs text-gray-400">{delivery.vendor.eta}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 p-3 rounded-xl" style={{ background: "var(--gm-green-light)" }}>
          <Package size={15} style={{ color: "var(--gm-green)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--gm-green-deep)" }}>#{delivery.orderId} · {delivery.packages} packages</span>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={handleArrived}
            className="flex-[3] py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: "var(--gm-green)" }}
          >
            <Navigation2 size={18} />
            I've Arrived
          </button>
          <button className="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)" }}>
            <Phone size={16} style={{ color: "var(--gm-green)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>Call</span>
          </button>
          <button
            onClick={() => navigate(`/deliveries/${id}`)}
            className="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
            style={{ borderColor: "var(--gm-border)" }}
          >
            <Package size={16} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-500">Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
