import { useState } from "react";
import { Truck, Edit3, Save, X } from "lucide-react";
import { mockDriver } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

export default function VehiclePage() {
  const { vehicle } = mockDriver;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ type: vehicle.type, number: vehicle.number, model: vehicle.model });

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-4">
      {/* Vehicle card */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--gm-green-light)" }}>
            <Truck size={28} style={{ color: "var(--gm-green)" }} />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>{form.model}</div>
            <div className="text-xs text-gray-400 mt-0.5">{form.type}</div>
            <StatusBadge status="verified" className="mt-1.5" />
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {editing ? <X size={18} className="text-red-500" /> : <Edit3 size={18} style={{ color: "var(--gm-green)" }} />}
          </button>
        </div>

        <div className="space-y-3">
          {editing ? (
            <>
              <Field label="Vehicle Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
              <Field label="Vehicle Number" value={form.number} onChange={(v) => setForm({ ...form, number: v })} />
              <Field label="Vehicle Model" value={form.model} onChange={(v) => setForm({ ...form, model: v })} />
              <button
                onClick={() => setEditing(false)}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: "var(--gm-green)" }}
              >
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <>
              <InfoRow label="Vehicle Type" value={form.type} />
              <InfoRow label="Vehicle Number" value={form.number} />
              <InfoRow label="Vehicle Model" value={form.model} />
            </>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="text-sm font-bold mb-4" style={{ color: "var(--gm-text)" }}>Vehicle Documents</div>
        {["RC Book", "Insurance Certificate", "PUC Certificate"].map((doc) => (
          <div key={doc} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "var(--gm-border)" }}>
            <div className="text-sm" style={{ color: "var(--gm-text)" }}>{doc}</div>
            <div className="flex items-center gap-2">
              <StatusBadge status={doc === "Insurance Certificate" ? "expiring" : "verified"} />
              <button className="text-xs font-medium px-2.5 py-1 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-green)" }}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "var(--gm-border)" }}>
      <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{value}</span>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: "var(--gm-text)" }}>{label}</label>
      <input
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none"
        style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
