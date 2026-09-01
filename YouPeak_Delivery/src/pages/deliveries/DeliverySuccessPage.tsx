import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Star, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DeliverySuccessPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  if (!delivery) return null;

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 text-center" style={{ background: "var(--gm-bg)" }}>
      {/* Confetti-style background */}
      <div className="w-full max-w-sm">
        {/* Success icon */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: "var(--gm-green)" }} />
          <div className="relative w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "var(--gm-green)" }}>
            <CheckCircle2 size={52} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-black mb-2" style={{ color: "var(--gm-text)" }}>Delivery Completed!</h1>
        <p className="text-sm mb-1" style={{ color: "var(--gm-text-muted)" }}>Great job, {delivery.customer.name.split(" ")[0]}!</p>

        {/* Order card */}
        <div className="bg-white rounded-2xl border p-5 my-6 text-left" style={{ borderColor: "var(--gm-border)" }}>
          <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: "var(--gm-border)" }}>
            <div className="text-sm text-gray-500">Order</div>
            <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>#{delivery.orderId}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">Delivered To</div>
            <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{delivery.customer.name}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">Delivery Time</div>
            <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>
              {new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
          <div className="pt-3 border-t" style={{ borderColor: "var(--gm-border)" }}>
            <div className="text-xs text-gray-500 mb-0.5">Earnings</div>
            <div className="text-3xl font-black" style={{ color: "var(--gm-green)" }}>₹{delivery.earning}</div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={28} className={s <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: "var(--gm-green)" }}
          >
            Back to Deliveries <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/earnings")}
            className="w-full py-3.5 rounded-2xl border font-semibold text-sm transition-colors hover:bg-white"
            style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}
          >
            View Earnings
          </button>
        </div>
      </div>
    </div>
  );
}
