import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Check, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function PackageCheckPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);
  const [checked, setChecked] = useState<boolean[]>(Array(delivery?.packages ?? 1).fill(false));
  const [confirmed, setConfirmed] = useState(false);

  if (!delivery) return null;

  const allChecked = checked.every(Boolean) && confirmed;

  const handleConfirm = () => {
    updateDeliveryStatus(delivery.id, "picked_up");
    navigate(`/deliveries/${id}/delivery`);
  };

  return (
    <div className="min-h-full p-4 max-w-lg mx-auto flex flex-col">
      {/* Header card */}
      <div className="bg-white rounded-2xl border p-5 mb-4" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Package Check</div>
            <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>#{delivery.orderId}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black" style={{ color: "var(--gm-green)" }}>{delivery.packages}</div>
            <div className="text-xs text-gray-400">total packages</div>
          </div>
        </div>
      </div>

      {/* Package list */}
      <div className="bg-white rounded-2xl border p-5 mb-4 flex-1" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>Verify All Packages</div>

        {delivery.packages > 0 && (
          <div className="space-y-2.5 mb-4">
            {Array.from({ length: delivery.packages }, (_, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  checked[i] ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => {
                  const next = [...checked];
                  next[i] = !next[i];
                  setChecked(next);
                }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${checked[i] ? "bg-green-100" : "bg-gray-100"}`}>
                  {checked[i] ? <CheckCircle2 size={18} style={{ color: "var(--gm-green)" }} /> : <Package size={18} className="text-gray-400" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>Package {i + 1} of {delivery.packages}</div>
                  <div className="text-xs text-gray-400">PKG-{delivery.orderId}-{i + 1}</div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked[i] ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {checked[i] && <Check size={12} className="text-white" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special handling */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs mb-4">
          <div className="font-semibold text-amber-800 mb-1">Special Handling Instructions</div>
          <div className="text-amber-700">Handle with care. Keep upright at all times.</div>
        </div>

        {/* Confirmation checkbox */}
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${confirmed ? "border-green-400 bg-green-50" : "border-gray-200"}`}
          onClick={() => setConfirmed(!confirmed)}
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${confirmed ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
            {confirmed && <Check size={12} className="text-white" />}
          </div>
          <span className="text-sm" style={{ color: "var(--gm-text)" }}>
            I confirm all packages were received in good condition from {delivery.vendor.name}.
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleConfirm}
        disabled={!allChecked}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        style={{ background: "var(--gm-green)" }}
      >
        Confirm Pickup ({checked.filter(Boolean).length}/{delivery.packages} verified)
      </button>
    </div>
  );
}
