import { useState } from "react";
import { Package, DollarSign, Bell, Settings, Check, CheckCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

type Category = "all" | "delivery" | "earning" | "system" | "incentive";

const categoryIcons: Record<string, React.ReactNode> = {
  delivery: <Package size={16} style={{ color: "var(--gm-green)" }} />,
  earning: <DollarSign size={16} className="text-blue-500" />,
  system: <Settings size={16} className="text-gray-500" />,
  incentive: <Bell size={16} className="text-amber-500" />,
};

const categoryBg: Record<string, string> = {
  delivery: "var(--gm-green-light)",
  earning: "#EFF6FF",
  system: "#F8FAFA",
  incentive: "#FFFBEB",
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead } = useApp();
  const [category, setCategory] = useState<Category>("all");

  const filtered = notifications.filter((n) => category === "all" || n.type === category);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col h-full">
      {/* Tabs + action */}
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10" style={{ borderColor: "var(--gm-border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-medium" style={{ color: "var(--gm-text-muted)" }}>
              {unread > 0 ? `${unread} unread` : "All caught up!"}
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs font-medium hover:opacity-80"
                style={{ color: "var(--gm-green)" }}
              >
                <CheckCheck size={14} /> Mark All Read
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {(["all", "delivery", "earning", "incentive", "system"] as Category[]).map((c) => {
              const count = notifications.filter((n) => (c === "all" || n.type === c) && !n.read).length;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                    category === c ? "text-white border-green-500" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={category === c ? { background: "var(--gm-green)" } : {}}
                >
                  {c}
                  {count > 0 && (
                    <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${category === c ? "bg-white text-green-700" : "bg-red-500 text-white"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <Bell size={22} className="text-gray-300" />
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: "var(--gm-text)" }}>No Notifications</div>
              <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>You're all caught up!</div>
            </div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-sm ${!n.read ? "" : "opacity-70"}`}
                style={{
                  borderColor: n.read ? "var(--gm-border)" : "rgba(22,163,74,0.3)",
                  background: n.read ? "white" : "rgba(22,163,74,0.03)",
                }}
                onClick={() => markNotificationRead(n.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: categoryBg[n.type] }}>
                    {categoryIcons[n.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-semibold" style={{ color: "var(--gm-text)" }}>{n.title}</div>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--gm-green)" }} />
                      )}
                    </div>
                    <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--gm-text-muted)" }}>{n.message}</div>
                    <div className="text-[10px] mt-2 text-gray-400">{n.time}</div>
                  </div>
                </div>
                {!n.read && (
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-[10px] font-medium flex items-center gap-1"
                      style={{ color: "var(--gm-green)" }}
                      onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }}
                    >
                      <Check size={10} /> Mark read
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
