import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, AlertCircle, Check, MapPin, CreditCard, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

type Stage = "arrived" | "otp" | "cod" | "otp_done";

export default function VerifyDeliveryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deliveries, updateDeliveryStatus } = useApp();
  const delivery = deliveries.find((d) => d.id === id);

  const [stage, setStage] = useState<Stage>("arrived");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
  const [codMethod, setCodMethod] = useState<"cash" | "upi">("cash");
  const [codConfirmed, setCodConfirmed] = useState(false);

  if (!delivery) return null;

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) document.getElementById(`dotp-${i + 1}`)?.focus();
  };

  const handleVerifyOtp = () => {
    const entered = otp.join("");
    if (entered.length === 6) {
      setOtpStatus("success");
      updateDeliveryStatus(delivery.id, "otp_verified");
      setTimeout(() => {
        if (delivery.paymentMethod === "COD") setStage("cod");
        else navigate(`/deliveries/${id}/proof`);
      }, 700);
    } else {
      setOtpStatus("error");
    }
  };

  return (
    <div className="min-h-full p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border p-5 mb-4" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-gray-500">Arrived at Delivery Location</div>
            <div className="text-base font-bold mt-0.5" style={{ color: "var(--gm-text)" }}>#{delivery.orderId}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <MapPin size={18} style={{ color: "var(--gm-green)" }} />
          </div>
        </div>
        <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{delivery.customer.name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{delivery.customer.address}</div>
        {delivery.paymentMethod === "COD" && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-xs font-medium text-amber-700">Amount to Collect</div>
            <div className="text-2xl font-black text-amber-700">₹{delivery.amount.toLocaleString()}</div>
          </div>
        )}
      </div>

      {stage === "arrived" && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>What would you like to do?</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => setStage("otp")}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all hover:border-green-400"
                style={{ borderColor: "var(--gm-green)", background: "var(--gm-green-light)" }}
              >
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--gm-green-deep)" }}>Verify Delivery OTP</div>
                  <div className="text-xs text-gray-500">Ask customer for 6-digit OTP</div>
                </div>
                <ChevronRight size={18} style={{ color: "var(--gm-green)" }} />
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)" }}>
                <Phone size={18} style={{ color: "var(--gm-green)" }} />
                <div className="text-left">
                  <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>Call Customer</div>
                  <div className="text-xs text-gray-400">{delivery.customer.phone}</div>
                </div>
              </button>
              <button
                onClick={() => navigate(`/deliveries/${id}`)}
                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-red-50 border-red-200 transition-colors"
              >
                <AlertCircle size={18} className="text-red-500" />
                <div className="text-left">
                  <div className="text-sm font-semibold text-red-600">Unable to Deliver</div>
                  <div className="text-xs text-gray-400">Report failed delivery</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === "otp" && (
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <h3 className="text-sm font-bold mb-1" style={{ color: "var(--gm-text)" }}>Enter Delivery OTP</h3>
          <p className="text-xs mb-5" style={{ color: "var(--gm-text-muted)" }}>Ask customer for the 6-digit OTP and enter it below.</p>

          <div className="flex gap-2 justify-between mb-4">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`dotp-${i}`}
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

          <div className="text-xs text-green-600 mb-4">OTP valid for 10:00</div>

          <button onClick={handleVerifyOtp} className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mb-3" style={{ background: "var(--gm-green)" }}>
            Verify & Complete Delivery
          </button>
          <button className="w-full py-2 text-xs font-medium" style={{ color: "var(--gm-green)" }}>Resend OTP</button>
          <button className="w-full py-2 text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>Scan QR Instead</button>
        </div>
      )}

      {stage === "cod" && (
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <h3 className="text-sm font-bold mb-1" style={{ color: "var(--gm-text)" }}>Collect COD Payment</h3>
          <p className="text-xs mb-4" style={{ color: "var(--gm-text-muted)" }}>Collect cash or confirm UPI payment from the customer.</p>

          <div className="text-3xl font-black mb-5 text-center" style={{ color: "var(--gm-text)" }}>₹{delivery.amount.toLocaleString()}</div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {(["cash", "upi"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setCodMethod(m)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${codMethod === m ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                {m === "cash" ? <span className="text-2xl">💵</span> : <CreditCard size={24} className="mx-auto text-blue-500" />}
                <div className={`text-sm font-semibold mt-1.5 ${codMethod === m ? "text-green-700" : "text-gray-600"}`}>
                  {m === "cash" ? "Cash" : "UPI"}
                </div>
              </button>
            ))}
          </div>

          <div
            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all mb-5 ${codConfirmed ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            onClick={() => setCodConfirmed(!codConfirmed)}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${codConfirmed ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
              {codConfirmed && <Check size={12} className="text-white" />}
            </div>
            <span className="text-sm" style={{ color: "var(--gm-text)" }}>
              Payment of ₹{delivery.amount.toLocaleString()} received via {codMethod === "cash" ? "Cash" : "UPI"}
            </span>
          </div>

          <button
            disabled={!codConfirmed}
            onClick={() => navigate(`/deliveries/${id}/proof`)}
            className="w-full py-4 rounded-xl text-white font-bold text-base disabled:opacity-50"
            style={{ background: "var(--gm-green)" }}
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}
