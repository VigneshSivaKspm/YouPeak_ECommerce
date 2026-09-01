import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  ArrowRight,
  Package,
} from "lucide-react";

export default function ApprovalStatusPage() {
  const navigate = useNavigate();
  const status = "review" as
    | "review"
    | "approved"
    | "rejected"
    | "doc_required";

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center p-6"
      style={{ background: "var(--gm-bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
            style={{ background: "var(--gm-green)" }}
          >
            <Package size={24} className="text-white" />
          </div>
          <div className="font-bold" style={{ color: "var(--gm-text)" }}>
            YouPeak Delivery Partner
          </div>
        </div>

        {status === "review" && (
          <div
            className="bg-white rounded-2xl shadow-sm border p-8 text-center"
            style={{ borderColor: "var(--gm-border)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-amber-50">
              <Clock size={36} className="text-amber-500" />
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "var(--gm-text)" }}
            >
              Application Under Review
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--gm-text-muted)" }}
            >
              Your application is being reviewed by our team. This usually takes
              24–48 hours. We'll notify you once it's approved.
            </p>
            <div className="space-y-3 text-left mb-6">
              {[
                "Identity Verified",
                "Vehicle Documents",
                "Bank Details",
                "Background Check",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${i < 2 ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    {i < 2 ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <Clock size={12} className="text-gray-400" />
                    )}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: i < 2 ? "var(--gm-text)" : "var(--gm-text-muted)",
                    }}
                  >
                    {step}
                  </span>
                  <span
                    className={`ml-auto text-xs font-medium ${i < 2 ? "text-green-600" : "text-amber-600"}`}
                  >
                    {i < 2 ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
              style={{
                borderColor: "var(--gm-border)",
                color: "var(--gm-text-muted)",
              }}
            >
              Back to Login
            </button>
          </div>
        )}

        {status === "approved" && (
          <div
            className="bg-white rounded-2xl shadow-sm border p-8 text-center"
            style={{ borderColor: "var(--gm-border)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-50">
              <CheckCircle size={36} style={{ color: "var(--gm-green)" }} />
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "var(--gm-text)" }}
            >
              Application Approved!
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--gm-text-muted)" }}
            >
              Congratulations! You are now a YouPeak Delivery Partner.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: "var(--gm-green)" }}
            >
              Start Delivering <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
