import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: string;
  change?: string;
  changeDir?: "up" | "down";
  sub?: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export default function KpiCard({ title, value, change, changeDir = "up", sub, icon: Icon, iconBg = "bg-green-50", iconColor = "text-green-600" }: Props) {
  return (
    <div className="bg-white rounded-lg border border-[#E5E9E8] p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#64748B] font-medium">{title}</p>
          <p className="text-xl font-700 text-[#10252E] mt-1 font-bold">{value}</p>
        </div>
        {Icon && (
          <span className={`${iconBg} ${iconColor} p-2 rounded-lg`}>
            <Icon size={18} />
          </span>
        )}
      </div>
      {(change || sub) && (
        <div className="flex items-center gap-2">
          {change && (
            <span className={`flex items-center gap-0.5 text-xs font-semibold ${changeDir === "up" ? "text-green-600" : "text-red-500"}`}>
              {changeDir === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change}
            </span>
          )}
          {sub && <span className="text-xs text-[#64748B]">{sub}</span>}
        </div>
      )}
    </div>
  );
}
