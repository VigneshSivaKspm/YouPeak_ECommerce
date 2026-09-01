import { Navigation, MapPin } from "lucide-react";

interface Props {
  showRoute?: boolean;
  className?: string;
  pickupLabel?: string;
  deliveryLabel?: string;
  mode?: "pickup" | "delivery" | "overview";
}

export default function MapView({ showRoute = true, className = "", pickupLabel = "Pickup", deliveryLabel = "Delivery", mode = "overview" }: Props) {
  return (
    <div className={`map-placeholder relative ${className}`}>
      {/* Grid overlay */}
      <div className="absolute inset-0" />

      {/* Road lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal roads */}
        <line x1="0" y1="35%" x2="100%" y2="35%" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
        <line x1="0" y1="65%" x2="100%" y2="65%" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        {/* Vertical roads */}
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

        {/* Route line */}
        {showRoute && (
          <polyline
            points={mode === "pickup" ? "30%,85% 28%,65% 45%,65% 45%,35% 62%,35% 62%,20%" : "25%,75% 35%,65% 60%,65% 60%,35% 72%,35% 72%,18%"}
            fill="none"
            stroke="#16A34A"
            strokeWidth="4"
            strokeDasharray="8,4"
            className="route-line"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Driver dot */}
        <circle cx={mode === "pickup" ? "30%" : "25%"} cy={mode === "pickup" ? "85%" : "75%"} r="8" fill="#1D4ED8" stroke="white" strokeWidth="2" />
        <circle cx={mode === "pickup" ? "30%" : "25%"} cy={mode === "pickup" ? "85%" : "75%"} r="16" fill="rgba(29,78,216,0.2)" />

        {/* Pickup marker */}
        {(mode === "pickup" || mode === "overview") && (
          <>
            <circle cx="62%" cy="20%" r="10" fill="#F59E0B" stroke="white" strokeWidth="2" />
            <text x="62%" y="20%" textAnchor="middle" dy="4" fill="white" fontSize="10" fontWeight="bold">P</text>
          </>
        )}

        {/* Delivery marker */}
        {(mode === "delivery" || mode === "overview") && (
          <>
            <circle cx="72%" cy="18%" r="10" fill="#EF4444" stroke="white" strokeWidth="2" />
            <text x="72%" y="18%" textAnchor="middle" dy="4" fill="white" fontSize="10" fontWeight="bold">D</text>
          </>
        )}
      </svg>

      {/* Area labels */}
      <div className="absolute top-3 left-3 text-xs font-bold text-gray-600 opacity-60">ANNA NAGAR</div>
      <div className="absolute bottom-12 left-10 text-xs font-bold text-gray-600 opacity-60">T. NAGAR</div>
      <div className="absolute top-1/3 right-8 text-xs font-bold text-gray-600 opacity-60">NATESAN PARK</div>

      {/* Recenter button */}
      <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Navigation size={16} style={{ color: "var(--gm-green)" }} />
      </button>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1.5">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span className="text-[10px] font-medium text-gray-600">You</span>
        </div>
        {(mode === "pickup" || mode === "overview") && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[10px] font-medium text-gray-600">{pickupLabel}</span>
          </div>
        )}
        {(mode === "delivery" || mode === "overview") && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[10px] font-medium text-gray-600">{deliveryLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
