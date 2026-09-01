import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Package, Clock, Phone, Navigation, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import StatusBadge from "@/components/common/StatusBadge";
import type { Delivery, DeliveryStatus } from "@/data/mockData";

type Tab = "active" | "upcoming" | "completed" | "cancelled";

const statusGroups: Record<Tab, DeliveryStatus[]> = {
  active: ["accepted", "navigating_pickup", "arrived_pickup", "pickup_verified", "picked_up", "out_for_delivery", "arrived_customer", "otp_verified", "proof_submitted"],
  upcoming: ["assigned"],
  completed: ["delivered"],
  cancelled: ["cancelled", "failed"],
};

const statusActions: Record<DeliveryStatus, string> = {
  assigned: "Start Pickup",
  accepted: "Navigate to Pickup",
  navigating_pickup: "Navigate to Pickup",
  arrived_pickup: "Verify Pickup",
  pickup_verified: "Confirm Pickup",
  picked_up: "Start Delivery",
  out_for_delivery: "Navigate",
  arrived_customer: "Verify Delivery",
  otp_verified: "Complete Delivery",
  proof_submitted: "Complete Delivery",
  delivered: "View Details",
  failed: "View Details",
  cancelled: "View Details",
};

export default function DeliveriesPage() {
  const { deliveries } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("active");
  const [search, setSearch] = useState("");

  const filtered = deliveries.filter((d) => {
    const inTab = statusGroups[tab].includes(d.status);
    const inSearch = !search || d.orderId.toLowerCase().includes(search.toLowerCase()) || d.customer.name.toLowerCase().includes(search.toLowerCase());
    return inTab && inSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search + filter bar */}
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex gap-2 max-w-7xl mx-auto">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border bg-gray-50" style={{ borderColor: "var(--gm-border)" }}>
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: "var(--gm-text)" }}
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="px-3 py-2 rounded-xl border flex items-center gap-1.5 text-sm hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}>
            <Filter size={15} /> <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-4 sticky top-[57px] z-10" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex gap-0 max-w-7xl mx-auto overflow-x-auto">
          {(["active", "upcoming", "completed", "cancelled"] as Tab[]).map((t) => {
            const count = deliveries.filter((d) => statusGroups[t].includes(d.status)).length;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors capitalize whitespace-nowrap flex items-center gap-1.5 ${
                  tab === t ? "border-green-500 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t}
                {count > 0 && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${tab === t ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop table */}
          <div className="hidden lg:block bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
            {filtered.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}>
                    {["Order ID", "Pickup", "Customer", "Destination", "Distance", "Payment", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gm-text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--gm-border)" }}>
                  {filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>#{d.orderId}</div>
                        <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{d.packages} items</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium truncate max-w-[140px]" style={{ color: "var(--gm-text)" }}>{d.vendor.name}</div>
                        <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{d.vendor.distance}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium" style={{ color: "var(--gm-text)" }}>{d.customer.name}</div>
                        <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{d.customer.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm truncate max-w-[120px]" style={{ color: "var(--gm-text-muted)" }}>{d.area}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium" style={{ color: "var(--gm-text)" }}>{d.customer.distance}</div>
                        <div className="text-xs text-gray-400">{d.customer.eta}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${d.paymentMethod === "COD" ? "text-amber-600" : "text-green-600"}`}>
                          {d.paymentMethod}
                        </span>
                        <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>₹{d.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={d.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => navigate(`/deliveries/${d.id}`)} className="px-2.5 py-1.5 rounded-lg text-xs font-medium border hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}>View</button>
                          {d.status !== "delivered" && d.status !== "cancelled" && d.status !== "failed" && (
                            <button className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "var(--gm-green)" }}>
                              <Navigation size={12} />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)" }}>
                            <Phone size={13} className="text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-3">
            {filtered.length === 0 ? (
              <EmptyState tab={tab} />
            ) : (
              filtered.map((d) => <DeliveryCard key={d.id} delivery={d} onView={() => navigate(`/deliveries/${d.id}`)} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryCard({ delivery: d, onView }: { delivery: Delivery; onView: () => void }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--gm-border)", background: "#FAFAFA" }}>
        <div>
          <div className="text-sm font-bold" style={{ color: "var(--gm-text)" }}>#{d.orderId}</div>
          <div className="text-xs text-gray-400">{d.packages} items · {d.scheduledTime}</div>
        </div>
        <StatusBadge status={d.status} />
      </div>

      <div className="px-4 py-3 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500">Pickup</div>
            <div className="text-sm font-semibold truncate" style={{ color: "var(--gm-text)" }}>{d.vendor.name}</div>
            <div className="text-xs text-gray-400">{d.vendor.distance} · {d.vendor.eta}</div>
          </div>
        </div>

        <div className="ml-2.5 w-px h-3 bg-gray-200" />

        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin size={10} className="text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500">Deliver to</div>
            <div className="text-sm font-semibold truncate" style={{ color: "var(--gm-text)" }}>{d.customer.name}</div>
            <div className="text-xs text-gray-400">{d.area} · {d.customer.distance} · {d.customer.eta}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-xs font-semibold ${d.paymentMethod === "COD" ? "text-amber-600" : "text-green-600"}`}>{d.paymentMethod}</div>
            <div className="text-xs text-gray-400">₹{d.amount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={onView}
          className="flex-[2] py-3 rounded-xl text-white font-semibold text-sm text-center transition-opacity hover:opacity-90"
          style={{ background: "var(--gm-green)" }}
        >
          {statusActions[d.status] || "View"}
        </button>
        <button className="flex-1 py-3 rounded-xl border flex items-center justify-center gap-1.5 text-sm font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--gm-border)", color: "var(--gm-text-muted)" }}>
          <Phone size={14} /> Call
        </button>
      </div>
    </div>
  );
}

function EmptyState({ tab }: { tab: Tab }) {
  const messages: Record<Tab, { title: string; desc: string }> = {
    active: { title: "No Active Deliveries", desc: "Go online to receive delivery requests." },
    upcoming: { title: "No Upcoming Deliveries", desc: "New assignments will appear here." },
    completed: { title: "No Completed Deliveries", desc: "Completed deliveries will appear here." },
    cancelled: { title: "No Cancelled Deliveries", desc: "Cancelled or failed deliveries will appear here." },
  };
  const { title, desc } = messages[tab];
  return (
    <div className="py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
        <Package size={22} className="text-gray-300" />
      </div>
      <div className="text-sm font-semibold mb-1" style={{ color: "var(--gm-text)" }}>{title}</div>
      <div className="text-xs" style={{ color: "var(--gm-text-muted)" }}>{desc}</div>
    </div>
  );
}
