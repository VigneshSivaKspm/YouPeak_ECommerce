import { useState } from "react";
import { CreditCard, Smartphone, CheckCircle2, Edit3, Save, X } from "lucide-react";
import { mockDriver } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

export default function BankPage() {
  const { bank } = mockDriver;
  const [editingBank, setEditingBank] = useState(false);
  const [editingUpi, setEditingUpi] = useState(false);
  const [upi, setUpi] = useState(bank.upi);

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-4">
      {/* Info */}
      <div className="p-4 rounded-2xl border" style={{ background: "#EFF6FF", borderColor: "#BFDBFE" }}>
        <div className="text-xs font-semibold text-blue-800 mb-1">Secure Banking</div>
        <div className="text-xs text-blue-700">Your bank details are encrypted and used only for processing payouts.</div>
      </div>

      {/* Bank account */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>Bank Account</div>
              <div className="text-xs text-gray-400">{bank.bank}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="verified" />
            <button onClick={() => setEditingBank(!editingBank)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              {editingBank ? <X size={16} className="text-red-500" /> : <Edit3 size={16} style={{ color: "var(--gm-green)" }} />}
            </button>
          </div>
        </div>

        {editingBank ? (
          <div className="space-y-3">
            <Field label="Account Holder" value={bank.holder} readOnly />
            <Field label="Bank Name" value={bank.bank} />
            <Field label="Account Number" value={bank.accountNumber} />
            <Field label="IFSC Code" value={bank.ifsc} />
            <button onClick={() => setEditingBank(false)} className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "var(--gm-green)" }}>
              <Save size={16} /> Save Bank Details
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <InfoRow label="Account Holder" value={bank.holder} />
            <InfoRow label="Account Number" value={bank.accountNumber} />
            <InfoRow label="Bank Name" value={bank.bank} />
            <InfoRow label="IFSC Code" value={bank.ifsc} />
          </div>
        )}
      </div>

      {/* UPI */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gm-green-light)" }}>
              <Smartphone size={20} style={{ color: "var(--gm-green)" }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>UPI ID</div>
              <div className="text-xs text-gray-400">Instant payouts</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} style={{ color: "var(--gm-green)" }} />
            <button onClick={() => setEditingUpi(!editingUpi)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              {editingUpi ? <X size={16} className="text-red-500" /> : <Edit3 size={16} style={{ color: "var(--gm-green)" }} />}
            </button>
          </div>
        </div>

        {editingUpi ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--gm-text)" }}>UPI ID</label>
              <input
                className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />
            </div>
            <button onClick={() => setEditingUpi(false)} className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "var(--gm-green)" }}>
              <Save size={16} /> Verify & Save UPI
            </button>
          </div>
        ) : (
          <InfoRow label="UPI ID" value={upi} />
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--gm-border)" }}>
      <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{value}</span>
    </div>
  );
}

function Field({ label, value, readOnly }: { label: string; value: string; readOnly?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--gm-text)" }}>{label}</label>
      <input
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
        style={{ borderColor: "var(--gm-border)", color: readOnly ? "var(--gm-text-muted)" : "var(--gm-text)", background: readOnly ? "#F8FAFA" : "white" }}
        defaultValue={value}
        readOnly={readOnly}
      />
    </div>
  );
}
