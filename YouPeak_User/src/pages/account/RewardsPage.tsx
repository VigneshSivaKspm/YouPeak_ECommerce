import MainLayout from "../../layouts/MainLayout";
import { MobilePageHeader } from "../../components/navigation/Header";
import { GiftIcon } from "../../components/common/Icons";

const rewards = [
  { points: 100, label: "₹50 Cashback", eligible: true },
  { points: 250, label: "₹150 Discount Coupon", eligible: true },
  { points: 500, label: "₹350 Gift Voucher", eligible: false },
  { points: 1000, label: "₹750 Premium Voucher", eligible: false },
];

const history = [
  { label: "Purchase reward", points: "+50", date: "24 May", type: "credit" },
  { label: "Login bonus", points: "+10", date: "23 May", type: "credit" },
  {
    label: "Redeemed for coupon",
    points: "-100",
    date: "20 May",
    type: "debit",
  },
  { label: "Referral bonus", points: "+200", date: "18 May", type: "credit" },
];

export default function RewardsPage() {
  const points = 320;

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Rewards" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4 space-y-4">
        {/* Points card */}
        <div className="bg-gradient-to-br from-amber to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3 opacity-80">
            <GiftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">YouPeak Rewards</span>
          </div>
          <p className="text-4xl font-bold mb-1">{points}</p>
          <p className="text-sm opacity-70">Reward Points</p>
          {/* Progress to next tier */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 opacity-80">
              <span>Progress to Gold</span>
              <span>{points}/500 pts</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(points / 500) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Redeem section */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-sm font-semibold text-text-primary">
              Redeem Points
            </p>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {rewards.map((r) => (
              <div
                key={r.label}
                className={`rounded-xl border-2 p-3 ${r.eligible ? "border-green bg-green-soft" : "border-[#E6EBE8] opacity-60"}`}
              >
                <p className="text-sm font-bold text-text-primary mb-0.5">
                  {r.label}
                </p>
                <p className="text-xs text-text-secondary mb-2">
                  {r.points} points
                </p>
                <button
                  disabled={!r.eligible}
                  className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    r.eligible
                      ? "bg-green text-white hover:bg-green-deep"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {r.eligible ? "Redeem" : `Need ${r.points - points} more`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Points history */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-sm font-semibold text-text-primary">
              Points History
            </p>
          </div>
          {history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3.5 border-b border-[#E6EBE8] last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {h.label}
                </p>
                <p className="text-xs text-text-secondary">{h.date}</p>
              </div>
              <span
                className={`text-sm font-bold ${h.type === "credit" ? "text-green" : "text-red"}`}
              >
                {h.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
