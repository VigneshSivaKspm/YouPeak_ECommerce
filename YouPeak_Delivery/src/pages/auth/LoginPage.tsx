import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Eye,
  EyeOff,
  Phone,
  Lock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"otp" | "password">("otp");
  const [phone, setPhone] = useState("98765 43210");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div
      className="min-h-full flex flex-col lg:flex-row"
      style={{ background: "var(--gm-bg)" }}
    >
      {/* Left panel (desktop) */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 p-12"
        style={{ background: "var(--gm-sidebar)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--gm-green)" }}
          >
            <Package size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold">YouPeak</div>
            <div className="text-xs font-medium" style={{ color: "#6EE7A0" }}>
              DELIVERY PARTNER
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
            Delivering happiness,
            <br />
            one order at a time
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Join thousands of delivery partners earning with YouPeak. Fast
            payouts, flexible hours, premium support.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Drivers", value: "12,000+" },
              { label: "Daily Deliveries", value: "50,000+" },
              { label: "Avg Earnings", value: "₹28K/mo" },
              { label: "Payout Speed", value: "Same Day" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-white/8">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/30 text-xs">
          © 2026 YouPeak. All rights reserved.
        </div>
      </div>

      {/* Right panel / mobile full */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-screen lg:min-h-0">
        {/* Mobile logo */}
        <div className="lg:hidden flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "var(--gm-green)" }}
          >
            <Package size={32} className="text-white" />
          </div>
          <div
            className="text-xl font-bold"
            style={{ color: "var(--gm-text)" }}
          >
            YouPeak
          </div>
          <div
            className="text-xs font-semibold"
            style={{ color: "var(--gm-green)" }}
          >
            DELIVERY PARTNER
          </div>
        </div>

        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--gm-text)" }}
          >
            Welcome back
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--gm-text-muted)" }}>
            Sign in to your delivery partner account
          </p>

          {/* Mode toggle */}
          <div className="flex gap-1 p-1 rounded-xl mb-5 bg-gray-100">
            {(["otp", "password"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setOtpSent(false);
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {m === "otp" ? "Login with OTP" : "Password"}
              </button>
            ))}
          </div>

          {/* Phone field */}
          <div className="mb-4">
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "var(--gm-text)" }}
            >
              Mobile Number
            </label>
            <div
              className="flex gap-2 p-3.5 rounded-xl border bg-white items-center"
              style={{ borderColor: "var(--gm-border)" }}
            >
              <div
                className="flex items-center gap-1 pr-2 border-r"
                style={{ borderColor: "var(--gm-border)" }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--gm-text)" }}
                >
                  +91
                </span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
              <Phone size={16} className="text-gray-400 ml-1" />
              <input
                className="flex-1 text-sm outline-none bg-transparent ml-2"
                style={{ color: "var(--gm-text)" }}
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={12}
              />
            </div>
          </div>

          {/* Password mode */}
          {mode === "password" && (
            <div className="mb-5">
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "var(--gm-text)" }}
              >
                Password
              </label>
              <div
                className="flex gap-2 p-3.5 rounded-xl border bg-white items-center"
                style={{ borderColor: "var(--gm-border)" }}
              >
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  className="flex-1 text-sm outline-none bg-transparent ml-2"
                  style={{ color: "var(--gm-text)" }}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowPass((v) => !v)}
                  className="p-0.5"
                >
                  {showPass ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button
                  className="text-xs font-medium"
                  style={{ color: "var(--gm-green)" }}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          {/* OTP sent state */}
          {mode === "otp" && otpSent && (
            <div className="mb-5">
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "var(--gm-text)" }}
              >
                Enter 6-digit OTP
              </label>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--gm-text-muted)" }}
              >
                Sent to +91 {phone}
              </p>
              <div className="flex gap-2 justify-between">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    className="otp-input"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    inputMode="numeric"
                  />
                ))}
              </div>
              <button
                className="text-xs font-medium mt-3"
                style={{ color: "var(--gm-green)" }}
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* CTA */}
          {mode === "otp" && !otpSent ? (
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--gm-green)" }}
            >
              {loading ? (
                "Sending OTP..."
              ) : (
                <>
                  Send OTP <ArrowRight size={16} />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--gm-green)" }}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          )}

          <p
            className="text-center text-xs mt-4"
            style={{ color: "var(--gm-text-muted)" }}
          >
            By continuing, you agree to our{" "}
            <button className="underline" style={{ color: "var(--gm-green)" }}>
              Terms
            </button>{" "}
            &{" "}
            <button className="underline" style={{ color: "var(--gm-green)" }}>
              Privacy Policy
            </button>
          </p>

          <div className="mt-6 text-center">
            <span className="text-sm" style={{ color: "var(--gm-text-muted)" }}>
              New delivery partner?{" "}
            </span>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold"
              style={{ color: "var(--gm-green)" }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
