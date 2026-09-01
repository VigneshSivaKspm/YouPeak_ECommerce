import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) {
      showToast("Please accept terms and conditions", "error");
      return;
    }
    login();
    showToast("Account created successfully!", "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">Y</span>
            </div>
            <span className="text-xl font-bold text-green-deep">YouPeak</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-6 shadow-sm">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Create Account
          </h1>
          <p className="text-sm text-text-secondary mb-5">
            Join millions of happy shoppers
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {[
              {
                key: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Enter your full name",
              },
              {
                key: "phone",
                label: "Mobile Number",
                type: "tel",
                placeholder: "+91 XXXXX XXXXX",
              },
              {
                key: "email",
                label: "Email Address",
                type: "email",
                placeholder: "your@email.com",
              },
              {
                key: "password",
                label: "Password",
                type: "password",
                placeholder: "Min 8 characters",
              },
              {
                key: "confirm",
                label: "Confirm Password",
                type: "password",
                placeholder: "Re-enter password",
              },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-text-secondary mb-1 block">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form] as string}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                  }
                  className="w-full border border-[#E6EBE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-green focus:ring-1 focus:ring-green/20 transition-all"
                />
              </div>
            ))}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, agree: e.target.checked }))
                }
                className="mt-0.5 accent-green"
              />
              <span className="text-xs text-text-secondary">
                I agree to the{" "}
                <a href="#" className="text-green underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 bg-green text-white rounded-xl font-bold text-sm hover:bg-green-deep transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-xs text-text-secondary mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green font-semibold hover:text-green-deep"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
