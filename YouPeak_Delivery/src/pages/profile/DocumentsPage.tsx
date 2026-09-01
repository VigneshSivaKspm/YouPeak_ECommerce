import { FileText, CheckCircle2, Clock, AlertCircle, Upload, Eye } from "lucide-react";
import { mockDriver } from "@/data/mockData";
import StatusBadge from "@/components/common/StatusBadge";

export default function DocumentsPage() {
  const { documents } = mockDriver;

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-4">
      {/* Info banner */}
      <div className="p-4 rounded-2xl border" style={{ background: "var(--gm-green-light)", borderColor: "rgba(22,163,74,0.2)" }}>
        <div className="text-xs font-semibold mb-1" style={{ color: "var(--gm-green-deep)" }}>Keep Documents Updated</div>
        <div className="text-xs" style={{ color: "var(--gm-green-deep)", opacity: 0.8 }}>
          Expired documents may pause your delivery access. Keep all documents valid to avoid disruptions.
        </div>
      </div>

      {/* Document cards */}
      {documents.map((doc) => {
        const statusIcon = doc.status === "verified" ? (
          <CheckCircle2 size={18} style={{ color: "var(--gm-green)" }} />
        ) : doc.status === "expiring" ? (
          <AlertCircle size={18} className="text-amber-500" />
        ) : doc.status === "pending" ? (
          <Clock size={18} className="text-blue-500" />
        ) : (
          <AlertCircle size={18} className="text-red-500" />
        );

        return (
          <div key={doc.type} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
            <div className="flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <FileText size={22} style={{ color: "var(--gm-green)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{doc.type}</div>
                  {statusIcon}
                </div>
                <div className="text-xs text-gray-400">Expires: {doc.expiry}</div>
                {doc.status === "expiring" && (
                  <div className="text-xs font-medium text-amber-600 mt-0.5">Expiring soon — please renew</div>
                )}
              </div>
              <StatusBadge status={doc.status} />
            </div>

            <div className="px-5 pb-4 flex gap-2 border-t pt-3" style={{ borderColor: "var(--gm-border)" }}>
              <button className="flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}>
                <Eye size={13} /> Preview
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-semibold hover:opacity-90 transition-opacity text-white"
                style={{ background: doc.status === "expiring" ? "#F59E0B" : "var(--gm-green)", borderColor: "transparent" }}
              >
                <Upload size={13} /> {doc.status === "expiring" ? "Renew" : "Update"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
