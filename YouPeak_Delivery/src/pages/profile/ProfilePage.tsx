import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, FileText, Truck, CreditCard, History, Wallet, BarChart2, Bell, Globe, HeadphonesIcon, Settings, LogOut, Edit3 } from "lucide-react";
import { useApp } from "@/context/AppContext";

const sections = [
  {
    title: "PERSONAL",
    items: [
      { icon: <Edit3 size={17} />, label: "Personal Information", path: "/profile" },
      { icon: <FileText size={17} />, label: "Documents", path: "/profile/documents" },
      { icon: <Truck size={17} />, label: "Vehicle Details", path: "/profile/vehicle" },
    ],
  },
  {
    title: "BANKING",
    items: [
      { icon: <CreditCard size={17} />, label: "Bank Account", path: "/profile/bank" },
      { icon: <Wallet size={17} />, label: "UPI Details", path: "/profile/bank" },
    ],
  },
  {
    title: "WORK",
    items: [
      { icon: <History size={17} />, label: "Delivery History", path: "/history" },
      { icon: <Wallet size={17} />, label: "Earnings", path: "/earnings" },
      { icon: <BarChart2 size={17} />, label: "Performance", path: "/performance" },
    ],
  },
  {
    title: "APP",
    items: [
      { icon: <Bell size={17} />, label: "Notifications", path: "/notifications" },
      { icon: <Globe size={17} />, label: "Language", path: "/settings" },
      { icon: <HeadphonesIcon size={17} />, label: "Support", path: "/support" },
      { icon: <Settings size={17} />, label: "Settings", path: "/settings" },
    ],
  },
];

export default function ProfilePage() {
  const { driver, isOnline } = useApp();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-6 max-w-2xl mx-auto space-y-5">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border p-5" style={{ borderColor: "var(--gm-border)" }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{ background: "var(--gm-green)" }}>
              {driver.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
          </div>
          <div className="flex-1">
            <div className="text-base font-bold" style={{ color: "var(--gm-text)" }}>{driver.name}</div>
            <div className="text-xs text-gray-400">Delivery Partner · {driver.id}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={12} className={s <= Math.floor(driver.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: "var(--gm-text)" }}>{driver.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black" style={{ color: "var(--gm-text)" }}>{driver.totalDeliveries.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Deliveries</div>
          </div>
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-2 py-2.5 px-3 rounded-xl" style={{ background: "var(--gm-green-light)" }}>
          <Star size={14} style={{ color: "var(--gm-green)" }} className="fill-green-500" />
          <span className="text-xs font-semibold" style={{ color: "var(--gm-green-deep)" }}>Verified Delivery Partner</span>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "var(--gm-border)" }}>
          <div className="px-4 py-2.5 border-b" style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest">{section.title}</span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--gm-border)" }}>
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--gm-green-light)", color: "var(--gm-green)" }}>
                  {item.icon}
                </div>
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--gm-text)" }}>{item.label}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={() => navigate("/login")}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
