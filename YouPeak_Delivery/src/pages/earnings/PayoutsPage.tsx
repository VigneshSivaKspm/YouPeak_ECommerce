import { useState } from "react";
import { Wallet, CreditCard, ArrowRight, Check, X } from "lucide-react";
import { mockPayouts } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";
import BottomSheet from "@/components/common/BottomSheet";

export default function PayoutsPage() {
  const [showRequest, setShowRequest] = useState(false);
  const [amount, setAmount] = useState("8420");
  const [method, setMethod] = useState<"upi" | "bank">("upi");
  const [submitted, setSubmitted] = useState(false);

  const available = 8420;
  const pending = 1200;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowRequest(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* Balance summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <div className="text-xs text-gray-500 mb-1">Available Balance</div>
          <div className="text-3xl font-black mb-3" style={{ color: "var(--gm-green)" }}>₹{available.toLocaleString()}</div>
          <button
            onClick={() => setShowRequest(true)}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            style={{ background: "var(--gm-green)" }}
          >
            <Wallet size={15} /> Request Payout
          </button>
        </div>
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <div className="text-xs text-gray-500 mb-1">Pending Payout</div>
          <div className="text-2xl font-black text-amber-600">₹{pending.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-2">Being processed</div>
        </div>
        <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
          <div className="text-xs text-gray-500 mb-1">Next Payout</div>
          <div className="text-xl font-bold" style={{ color: "var(--gm-text)" }}>30 Aug 2026</div>
          <div className="text-xs text-gray-400 mt-2">Automatic weekly payout</div>
        </div>
      </div>

      {/* Payout history */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--gm-border)" }}>
          <h3 className="font-bold text-sm" style={{ color: "var(--gm-text)" }}>Payout History</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--gm-border)", background: "#F8FAFA" }}>
                {["Payout ID", "Date", "Amount", "Method", "Status", "Transaction ID"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gm-text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPayouts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50" style={{ borderColor: "var(--gm-border)" }}>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: "var(--gm-text)" }}>{p.id}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{p.date}</td>
                  <td className="px-4 py-3 text-sm font-bold" style={{ color: "var(--gm-green)" }}>₹{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {p.method === "UPI" ? <CreditCard size={13} className="text-blue-500" /> : <Wallet size={13} className="text-gray-500" />}
                      <span className="text-sm" style={{ color: "var(--gm-text)" }}>{p.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--gm-text-muted)" }}>{p.txnId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden divide-y" style={{ borderColor: "var(--gm-border)" }}>
          {mockPayouts.map((p) => (
            <div key={p.id} className="px-4 py-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{p.id}</div>
                  <div className="text-xs text-gray-400">{p.date} · {p.method}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">{p.txnId}</div>
                <div className="text-lg font-black" style={{ color: "var(--gm-green)" }}>₹{p.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout request sheet */}
      <BottomSheet isOpen={showRequest} onClose={() => setShowRequest(false)} title="Request Payout">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Check size={28} style={{ color: "var(--gm-green)" }} />
            </div>
            <div className="text-base font-bold mb-1" style={{ color: "var(--gm-text)" }}>Payout Request Submitted!</div>
            <div className="text-sm" style={{ color: "var(--gm-text-muted)" }}>Your payout will be processed within 24 hours.</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Available Balance</div>
              <div className="text-3xl font-black" style={{ color: "var(--gm-green)" }}>₹{available.toLocaleString()}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--gm-text)" }}>Payout Amount</label>
              <div className="flex items-center gap-2 p-3.5 rounded-xl border" style={{ borderColor: "var(--gm-border)" }}>
                <span className="text-base font-semibold" style={{ color: "var(--gm-text-muted)" }}>₹</span>
                <input
                  type="number"
                  className="flex-1 text-base font-bold outline-none"
                  style={{ color: "var(--gm-text)" }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={available}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--gm-text)" }}>Payout Method</label>
              <div className="grid grid-cols-2 gap-3">
                {(["upi", "bank"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${method === m ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                  >
                    <div className="font-semibold text-sm uppercase" style={method === m ? { color: "var(--gm-green)" } : { color: "var(--gm-text-muted)" }}>{m}</div>
                    <div className="text-xs text-gray-400">{m === "upi" ? "rajesh@upi" : "HDFC ****3456"}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2"
              style={{ background: "var(--gm-green)" }}
            >
              Confirm Payout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </BottomSheet>

      {/* Desktop modal version */}
    </div>
  );
}
