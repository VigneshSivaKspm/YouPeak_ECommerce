import MainLayout from "../../layouts/MainLayout";
import { MobilePageHeader } from "../../components/navigation/Header";
import { CopyIcon, ShareIcon } from "../../components/common/Icons";
import { useApp } from "../../context/AppContext";

export default function ReferralPage() {
  const { showToast } = useApp();
  const referralCode = "RAHUL500";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode).catch(() => {});
    showToast("Referral code copied!", "success");
  };

  const share = () => {
    showToast("Share feature coming soon!", "info");
  };

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="Refer & Earn" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4 space-y-5">
        {/* Hero */}
        <div className="bg-gradient-to-br from-green-deep to-green rounded-2xl p-6 text-white text-center">
          <span className="text-5xl mb-4 block">🎁</span>
          <h1 className="text-2xl font-bold mb-2">Refer & Earn ₹500</h1>
          <p className="text-sm opacity-80">
            Share your referral code with friends. When they make their first
            purchase, you both get ₹500 off!
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-5">
          <h2 className="text-sm font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <div className="space-y-3">
            {[
              {
                step: "1",
                label: "Share your referral code",
                desc: "Send the code to your friends",
              },
              {
                step: "2",
                label: "Friend signs up",
                desc: "They create a YouPeak account",
              },
              {
                step: "3",
                label: "Both earn rewards",
                desc: "Get ₹500 each on first purchase",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {s.label}
                  </p>
                  <p className="text-xs text-text-secondary">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral code */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] p-5">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Your Referral Code
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-green-soft border-2 border-dashed border-green rounded-xl px-4 py-3 text-center">
              <span className="text-xl font-bold text-green tracking-widest">
                {referralCode}
              </span>
            </div>
            <button
              onClick={copyCode}
              className="w-12 h-12 bg-green text-white rounded-xl flex items-center justify-center hover:bg-green-deep transition-colors"
            >
              <CopyIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={copyCode}
              className="flex-1 py-3 border-2 border-green text-green rounded-xl text-sm font-semibold hover:bg-green-soft transition-colors flex items-center justify-center gap-2"
            >
              <CopyIcon className="w-4 h-4" /> Copy Code
            </button>
            <button
              onClick={share}
              className="flex-1 py-3 bg-green text-white rounded-xl text-sm font-semibold hover:bg-green-deep transition-colors flex items-center justify-center gap-2"
            >
              <ShareIcon className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "3", label: "Friends Referred" },
            { value: "₹1,500", label: "Total Earned" },
            { value: "1", label: "Pending" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-[#E6EBE8] p-3 text-center"
            >
              <p className="text-lg font-bold text-green">{s.value}</p>
              <p className="text-xs text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
