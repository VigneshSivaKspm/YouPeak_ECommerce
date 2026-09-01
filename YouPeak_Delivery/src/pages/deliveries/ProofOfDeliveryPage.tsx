import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Camera, Upload, PenLine, Check, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

const handedOptions = ["Customer", "Family Member", "Security", "Reception", "Other"];

export default function ProofOfDeliveryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [handedTo, setHandedTo] = useState("Customer");
  const [notes, setNotes] = useState("");

  if (!delivery) return null;

  const handleComplete = () => {
    updateDeliveryStatus(delivery.id, "delivered");
    navigate(`/deliveries/${id}/success`);
  };

  return (
    <div className="min-h-full p-4 max-w-lg mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-xs text-gray-500">Proof of Delivery</div>
        <div className="text-base font-bold mt-0.5" style={{ color: "var(--gm-text)" }}>Order #{delivery.orderId}</div>
        <div className="text-xs text-gray-500 mt-0.5">Customer: {delivery.customer.name}</div>
      </div>

      {/* Verification summary */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>Verification Status</div>
        <div className="space-y-2.5">
          {[
            { label: "OTP Verified", done: true },
            { label: "Signature", done: signatureDrawn },
            { label: "Delivery Photo", done: photoUploaded },
            { label: "GPS Location", done: true },
            { label: "Delivered Time", done: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className={item.done ? "" : "text-gray-200"}
                style={item.done ? { color: "var(--gm-green)" } : {}}
              />
              <span className="text-sm" style={{ color: item.done ? "var(--gm-text)" : "var(--gm-text-muted)" }}>{item.label}</span>
              {item.done && <span className="ml-auto text-xs font-medium" style={{ color: "var(--gm-green)" }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Photo upload */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>Delivery Photo</div>
        {photoUploaded ? (
          <div className="relative w-full aspect-video rounded-xl bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--gm-green-light)" }}>
              <div className="text-center">
                <CheckCircle2 size={32} className="mx-auto mb-2" style={{ color: "var(--gm-green)" }} />
                <div className="text-sm font-medium" style={{ color: "var(--gm-green)" }}>Photo Uploaded</div>
              </div>
            </div>
            <button
              onClick={() => setPhotoUploaded(false)}
              className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded-lg text-gray-500 shadow"
            >
              Retake
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPhotoUploaded(true)}
              className="p-5 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 hover:border-green-400 transition-colors"
              style={{ borderColor: "var(--gm-border)" }}
            >
              <Camera size={24} style={{ color: "var(--gm-green)" }} />
              <span className="text-xs font-medium text-gray-600">Take Photo</span>
            </button>
            <button
              onClick={() => setPhotoUploaded(true)}
              className="p-5 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 hover:border-green-400 transition-colors"
              style={{ borderColor: "var(--gm-border)" }}
            >
              <Upload size={24} className="text-blue-500" />
              <span className="text-xs font-medium text-gray-600">Upload Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* Signature */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>Customer Signature</div>
        <div
          className="w-full h-28 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
          style={{ borderColor: signatureDrawn ? "var(--gm-green)" : "var(--gm-border)", background: signatureDrawn ? "var(--gm-green-light)" : "#FAFAFA" }}
          onClick={() => setSignatureDrawn(true)}
        >
          {signatureDrawn ? (
            <div className="text-center">
              <div className="text-2xl italic font-serif mb-1" style={{ color: "var(--gm-green-deep)" }}>Arun Kumar</div>
              <div className="text-xs" style={{ color: "var(--gm-green)" }}>Signature captured</div>
            </div>
          ) : (
            <div className="text-center">
              <PenLine size={24} className="mx-auto mb-2 text-gray-300" />
              <div className="text-xs text-gray-400">Tap to capture signature</div>
            </div>
          )}
        </div>
      </div>

      {/* Handed to */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-3" style={{ color: "var(--gm-text)" }}>Package Handed To</div>
        <div className="flex flex-wrap gap-2">
          {handedOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setHandedTo(opt)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${handedTo === opt ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-2" style={{ color: "var(--gm-text)" }}>Delivery Notes (Optional)</div>
        <textarea
          className="w-full p-3 rounded-xl border text-sm outline-none resize-none"
          style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
          rows={3}
          placeholder="Add any notes about this delivery..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* CTA */}
      <button
        onClick={handleComplete}
        className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: "var(--gm-green)" }}
      >
        <Check size={20} />
        Complete Delivery
      </button>
    </div>
  );
}
