import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    showToast("Welcome back! Logged in successfully.", "success");
    navigate("/");
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verify");
  };

  const handleGuest = () => {
    login();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-green rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">Y</span>
            </div>
            <span className="text-2xl font-bold text-green-deep">YouPeak</span>
          </div>
          <p className="text-text-secondary text-sm">
            Better Choices. Brighter Tomorrow.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-6 shadow-sm">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Welcome Back!
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Login to continue your shopping journey
          </p>

          {!useOtp ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
                  Mobile / Email
                </label>
                <input
                  type="text"
                  placeholder="Enter mobile number or email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#E6EBE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green/20 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E6EBE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green/20 transition-all"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-green font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-green text-white rounded-xl font-bold text-sm hover:bg-green-deep transition-colors"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
                  Mobile Number
                </label>
                <div className="flex items-center border border-[#E6EBE8] rounded-xl overflow-hidden focus-within:border-green transition-all">
                  <span className="px-3 py-3 text-sm text-text-secondary border-r border-[#E6EBE8] bg-gray-50">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-green text-white rounded-xl font-bold text-sm hover:bg-green-deep transition-colors"
              >
                Continue
              </button>
            </form>
          )}

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setUseOtp(!useOtp)}
              className="w-full text-sm text-green font-medium text-center hover:text-green-deep"
            >
              {useOtp
                ? "Login with Password instead"
                : "Login with OTP instead"}
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E6EBE8]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-text-secondary">
                or continue with
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { icon: "🔵", label: "Continue with Google" },
              { icon: "🍎", label: "Continue with Apple" },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={handleGuest}
                className="w-full flex items-center gap-3 py-3 border border-[#E6EBE8] rounded-xl text-sm font-medium text-text-primary hover:border-green hover:bg-gray-50 transition-all"
              >
                <span className="ml-4 text-lg">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleGuest}
            className="w-full mt-3 text-sm text-text-secondary hover:text-green font-medium transition-colors"
          >
            Continue as Guest
          </button>

          <p className="text-center text-xs text-text-secondary mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green font-semibold hover:text-green-deep"
            >
              Create Account
            </Link>
          </p>

          <p className="text-center text-[10px] text-text-secondary mt-3">
            By continuing, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
