import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QrCode, Barcode, Hash, Check, AlertCircle, Package, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

type VerifyMode = "otp" | "qr" | "barcode";

export default function PickupVerifyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  const [mode, setMode] = useState<VerifyMode>("otp");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`potp-${i + 1}`)?.focus();
  };

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered.length === 6) {
      setOtpStatus("success");
      setTimeout(() => {
        if (delivery) updateDeliveryStatus(delivery.id, "pickup_verified");
        navigate(`/deliveries/${id}/package-check`);
      }, 600);
    } else {
      setOtpStatus("error");
    }
  };

  const checklist = [
    "Correct Order",
    "Correct Number of Packages",
    "Package Sealed",
    "Address Verified",
  ];

  if (!delivery) return null;

  return (
    <div className="min-h-full p-4 max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border mb-4 p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-xs text-gray-500 mb-0.5">Pickup Verification</div>
        <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>Order #{delivery.orderId}</div>
        <div className="text-xs text-gray-400 mt-0.5">Vendor: {delivery.vendor.name} · {delivery.packages} Items · ₹{delivery.amount.toLocaleString()}</div>
      </div>

      {/* Mode selector */}
      <div className="bg-white rounded-2xl border p-5 mb-4" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-semibold mb-3" style={{ color: "var(--gm-text)" }}>Verify Pickup</div>
        <p className="text-xs mb-4" style={{ color: "var(--gm-text-muted)" }}>Please verify the order using one of the options below</p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {([
            { id: "otp" as VerifyMode, icon: Hash, label: "OTP", sub: "Enter Pickup OTP" },
            { id: "qr" as VerifyMode, icon: QrCode, label: "QR Code", sub: "Scan QR Code" },
            { id: "barcode" as VerifyMode, icon: Barcode, label: "Barcode", sub: "Scan Barcode" },
          ]).map(({ id: m, icon: Icon, label, sub }) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOtpStatus("idle"); setOtp(["", "", "", "", "", ""]); }}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                mode === m ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Icon size={20} className={`mx-auto mb-1.5 ${mode === m ? "text-green-600" : "text-gray-400"}`} />
              <div className={`text-xs font-bold ${mode === m ? "text-green-700" : "text-gray-600"}`}>{label}</div>
              <div className="text-[10px] text-gray-400">{sub}</div>
            </button>
          ))}
        </div>

        {mode === "otp" && (
          <div>
            <div className="text-sm font-semibold mb-3" style={{ color: "var(--gm-text)" }}>Enter Pickup OTP</div>
            <div className="flex gap-2 justify-between mb-4">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`potp-${i}`}
                  className={`otp-input ${otpStatus === "error" ? "border-red-400" : otpStatus === "success" ? "border-green-400" : ""}`}
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  inputMode="numeric"
                />
              ))}
            </div>
            {otpStatus === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-xs mb-3">
                <AlertCircle size={13} /> Incorrect OTP. Please try again.
              </div>
            )}
            {otpStatus === "success" && (
              <div className="flex items-center gap-2 text-green-600 text-xs mb-3">
                <Check size={13} /> OTP Verified!
              </div>
            )}
            <button
              onClick={handleVerify}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: "var(--gm-green)" }}
            >
              Verify OTP
            </button>
          </div>
        )}

        {(mode === "qr" || mode === "barcode") && (
          <div>
            <div className="w-full aspect-square max-w-[240px] mx-auto rounded-2xl bg-gray-50 border-2 border-dashed flex flex-col items-center justify-center gap-3 mb-4" style={{ borderColor: "var(--gm-border)" }}>
              {mode === "qr" ? <QrCode size={40} className="text-gray-300" /> : <Barcode size={40} className="text-gray-300" />}
              <div className="text-xs text-gray-400">Camera permission required</div>
            </div>
            <button className="w-full py-3.5 rounded-xl text-white font-semibold text-sm" style={{ background: "var(--gm-green)" }}>
              {mode === "qr" ? "Scan QR Code" : "Scan Barcode"}
            </button>
            <button className="w-full py-2 mt-2 text-xs font-medium text-red-500">Report Issue</button>
          </div>
        )}
      </div>

      {/* Package checklist */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-semibold mb-3" style={{ color: "var(--gm-text)" }}>Package Checklist</div>
        <div className="space-y-2.5">
          {checklist.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--gm-green-light)" }}>
                <Check size={12} style={{ color: "var(--gm-green)" }} />
              </div>
              <span className="text-sm" style={{ color: "var(--gm-text)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
