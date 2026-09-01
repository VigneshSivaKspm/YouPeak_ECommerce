import { MapPin, Truck, Clock, CheckCircle, AlertCircle, Navigation, Plus } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

const deliveries = [
  { id: "ORD-102938", partner: "Ramesh K", distance: "2.4km", eta: "10 min", status: "On the Way" },
  { id: "ORD-102937", partner: "Suresh B", distance: "3.4km", eta: "20 min", status: "On the Way" },
  { id: "ORD-102936", partner: "Arun P", distance: "5.1km", eta: "30 min", status: "Picked Up" },
  { id: "ORD-102935", partner: "Vijay Tr", distance: "4.1km", eta: "16 min", status: "Delayed" },
  { id: "ORD-102934", partner: "Karthik S", distance: "5.6km", eta: "35 min", status: "Delivered" },
];

const partners = [
  { name: "Ramesh Kumar", vehicle: "Scooter", orders: 5, rating: 4.8, earnings: "₹1,150", status: "Active", lastActive: "2 min ago" },
  { name: "Suresh Babu", vehicle: "Bicycle", orders: 4, rating: 4.7, earnings: "₹980", status: "Active", lastActive: "5 min ago" },
  { name: "Arun Prasad", vehicle: "Scooter", orders: 3, rating: 4.6, earnings: "₹740", status: "Active", lastActive: "3 min ago" },
  { name: "Vijay Tr", vehicle: "Scooter", orders: 1, rating: 4.4, earnings: "₹320", status: "Busy", lastActive: "1 min ago" },
  { name: "Karthik S", vehicle: "Bike", orders: 6, rating: 4.9, earnings: "₹1,480", status: "Active", lastActive: "just now" },
];

export default function Delivery() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#10252E]">Delivery Operations</h1>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs bg-[#16A34A] text-white rounded-md font-medium hover:bg-[#0B6B35] flex items-center gap-1.5">
            <Navigation size={12} /> Auto Assign
          </button>
          <button className="px-3 py-1.5 text-xs border border-[#E5E9E8] bg-white rounded-md text-[#64748B] font-medium flex items-center gap-1.5">
            <Plus size={12} /> Manual Assign
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ["Online Partners", "568", Truck, "bg-green-50", "text-green-600"],
          ["Active Deliveries", "2,145", Navigation, "bg-blue-50", "text-blue-600"],
          ["Pending Assignments", "245", Clock, "bg-yellow-50", "text-yellow-600"],
          ["Completed Today", "1,842", CheckCircle, "bg-green-50", "text-green-600"],
          ["Delayed Deliveries", "72", AlertCircle, "bg-red-50", "text-red-600"],
        ].map(([title, val, Icon, bg, col]) => (
          <div key={title as string} className="bg-white rounded-lg border border-[#E5E9E8] p-4 flex items-center gap-3">
            <span className={`${bg} ${col} p-2 rounded-lg`}><Icon size={16} /></span>
            <div>
              <p className="text-xs text-[#64748B]">{title as string}</p>
              <p className="text-lg font-bold text-[#10252E]">{val as string}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#E5E9E8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E5E9E8] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#10252E]">Live Delivery Map</h3>
            <span className="flex items-center gap-1.5 text-xs text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />Live</span>
          </div>
          <div className="h-64 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] flex items-center justify-center relative overflow-hidden">
            {/* Fake map grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#16A34A" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="300" stroke="#16A34A" strokeWidth="0.5" />
              ))}
            </svg>
            {/* Delivery pins */}
            {[{ x: "30%", y: "40%", c: "bg-green-500" }, { x: "55%", y: "35%", c: "bg-blue-500" }, { x: "70%", y: "60%", c: "bg-orange-500" }, { x: "45%", y: "65%", c: "bg-green-500" }].map((p, i) => (
              <div key={i} className={`absolute w-5 h-5 ${p.c} rounded-full border-2 border-white shadow-md flex items-center justify-center`} style={{ left: p.x, top: p.y }}>
                <MapPin size={10} className="text-white" />
              </div>
            ))}
            <div className="text-[#064E3B] text-sm font-medium opacity-50">Live Map View</div>
          </div>

          {/* Live deliveries list */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FAFB] border-y border-[#E5E9E8]">
                  {["Order", "Partner", "Distance", "ETA", "Status"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {deliveries.map(d => (
                  <tr key={d.id} className="hover:bg-[#F8FAFB]">
                    <td className="px-3 py-2 font-semibold text-[#16A34A]">{d.id}</td>
                    <td className="px-3 py-2 text-[#10252E]">{d.partner}</td>
                    <td className="px-3 py-2 text-[#64748B]">{d.distance}</td>
                    <td className="px-3 py-2 text-[#64748B]">{d.eta}</td>
                    <td className="px-3 py-2"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery partners */}
        <div className="bg-white rounded-lg border border-[#E5E9E8]">
          <div className="px-4 py-3 border-b border-[#E5E9E8]">
            <h3 className="text-sm font-semibold text-[#10252E]">Delivery Partners</h3>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {partners.map(p => (
              <div key={p.name} className="p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{p.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#10252E] truncate">{p.name}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-[10px] text-[#64748B]">{p.vehicle}</span>
                    <span className="text-[10px] text-[#64748B]">{p.orders} active</span>
                    <span className="text-[10px] text-[#64748B]">{p.earnings}</span>
                  </div>
                </div>
                <button className="px-2 py-1 text-[10px] bg-[#16A34A] text-white rounded font-medium hover:bg-[#0B6B35]">Assign</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
