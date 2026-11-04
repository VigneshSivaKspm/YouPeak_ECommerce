import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setTimer((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      showToast("Please enter complete OTP", "error");
      return;
    }
    login();
    showToast("Verified successfully!", "success");
    navigate("/");
  };

  const resend = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    showToast("OTP sent again!", "success");
    refs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">Y</span>
            </div>
            <span className="text-xl font-bold text-green-deep">YouPeak</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-6 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Verify OTP
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Enter the 6-digit code sent to +91 98765 43210
          </p>

          {/* OTP inputs */}
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all ${
                  digit
                    ? "border-green bg-green-soft text-green"
                    : "border-[#E6EBE8] text-text-primary focus:border-green"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-3.5 bg-green text-white rounded-xl font-bold text-sm hover:bg-green-deep transition-colors mb-4"
          >
            Verify OTP
          </button>

          {timer > 0 ? (
            <p className="text-sm text-text-secondary">
              Resend OTP in{" "}
              <span className="text-green font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={resend}
              className="text-sm text-green font-bold hover:text-green-deep"
            >
              Resend OTP
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="mt-3 block text-xs text-text-secondary hover:text-green mx-auto"
          >
            Change Number
          </button>
        </div>
      </div>
    </div>
  );
}
