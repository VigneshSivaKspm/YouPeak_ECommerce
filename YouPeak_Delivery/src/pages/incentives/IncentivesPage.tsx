import { mockIncentives } from "@/data/mockData";
import { Gift, Clock, Star, Zap, Target } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  daily: <Target size={18} className="text-blue-500" />,
  special: <Gift size={18} className="text-purple-500" />,
  peak: <Zap size={18} className="text-amber-500" />,
  distance: <Star size={18} style={{ color: "var(--gm-green)" }} />,
};

const typeBg: Record<string, string> = {
  daily: "#EFF6FF",
  special: "#F5F3FF",
  peak: "#FFFBEB",
  distance: "var(--gm-green-light)",
};

export default function IncentivesPage() {
  const activeCount = mockIncentives.filter((i) => i.status === "active").length;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5">
      {/* Summary */}
      <div className="rounded-2xl p-5 text-white" style={{ background: "var(--gm-sidebar)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-medium text-white/70 mb-1">Active Incentives</div>
            <div className="text-4xl font-black">{activeCount}</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
            <Gift size={28} className="text-white" />
          </div>
        </div>
        <p className="text-white/60 text-xs">Complete incentives to earn bonus rewards on top of your delivery earnings.</p>
      </div>

      {/* Incentive cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockIncentives.map((inc) => {
          const pct = Math.round((inc.progress / inc.target) * 100);
          return (
            <div key={inc.id} className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all" style={{ borderColor: "var(--gm-border)" }}>
              {/* Card header */}
              <div className="px-5 py-4" style={{ background: typeBg[inc.type] }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {typeIcons[inc.type]}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70 text-gray-600">{inc.status}</span>
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{inc.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{inc.description}</div>
              </div>

              {/* Progress */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>Progress</span>
                  <span className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>{inc.progress}/{inc.target}</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: pct >= 80 ? "var(--gm-green)" : pct >= 50 ? "#F59E0B" : "#94A3B8" }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Reward</div>
                    <div className="text-base font-black" style={{ color: "var(--gm-green)" }}>{inc.reward}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} /> {inc.expiry}
                    </div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: pct >= 80 ? "var(--gm-green)" : "var(--gm-text-muted)" }}>
                      {inc.target - inc.progress} more to go
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
