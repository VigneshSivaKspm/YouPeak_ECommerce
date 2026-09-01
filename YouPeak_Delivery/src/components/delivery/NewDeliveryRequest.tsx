import { useEffect, useState } from "react";
import { MapPin, Package, Clock, DollarSign, X, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { newDeliveryRequest } from "@/data/mockData";

export default function NewDeliveryRequest() {
  const { acceptRequest, declineRequest } = useApp();
  const [timeLeft, setTimeLeft] = useState(newDeliveryRequest.timeoutSeconds);

  useEffect(() => {
    if (timeLeft <= 0) { declineRequest(); return; }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, declineRequest]);

  const progress = (timeLeft / newDeliveryRequest.timeoutSeconds) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="bg-white w-full lg:max-w-md rounded-t-3xl lg:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: "var(--gm-border)" }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Delivery Request</div>
              <div className="text-base font-bold mt-0.5" style={{ color: "var(--gm-text)" }}>Order #{newDeliveryRequest.orderId}</div>
            </div>
            <div className={`flex items-center gap-1.5 ${isUrgent ? "countdown-urgent" : ""}`}>
              <div
                className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-4 ${
                  isUrgent ? "border-red-500 text-red-600" : "border-green-500 text-green-600"
                }`}
              >
                <span className={`text-xl font-black ${isUrgent ? "text-red-600" : "text-green-600"}`}>{timeLeft}</span>
                <span className="text-[9px] font-medium text-gray-500">sec</span>
              </div>
            </div>
          </div>

          {/* Countdown bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Route */}
        <div className="px-5 py-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <MapPin size={14} className="text-amber-600" />
              </div>
              <div className="w-0.5 h-6 bg-gray-200 my-1" />
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <MapPin size={14} className="text-red-600" />
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <div className="text-xs text-gray-500 font-medium">Pickup From</div>
                <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{newDeliveryRequest.vendor}</div>
                <div className="text-xs text-gray-500">{newDeliveryRequest.pickupDistance} away</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Deliver To</div>
                <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{newDeliveryRequest.customer}</div>
                <div className="text-xs text-gray-500">{newDeliveryRequest.deliveryDistance} away</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t" style={{ borderColor: "var(--gm-border)" }}>
            <div className="text-center">
              <div className="text-xs text-gray-500">Distance</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{newDeliveryRequest.totalDistance}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Earnings</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-green)" }}>₹{newDeliveryRequest.estimatedEarning}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Items</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{newDeliveryRequest.packages}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">ETA</div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{newDeliveryRequest.eta}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-blue-50">
            <Package size={14} className="text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">{newDeliveryRequest.paymentMethod} Payment · ₹{newDeliveryRequest.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pb-6 safe-bottom flex gap-3">
          <button
            onClick={declineRequest}
            className="flex-1 py-3.5 rounded-xl border-2 font-semibold text-sm transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}
          >
            Decline
          </button>
          <button
            onClick={acceptRequest}
            className="flex-2 flex-grow-[2] py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: "var(--gm-green)" }}
          >
            <Check size={18} />
            Accept Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
