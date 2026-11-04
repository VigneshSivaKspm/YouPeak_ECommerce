import MainLayout from "../../layouts/MainLayout";
import { MobilePageHeader } from "../../components/navigation/Header";
import { mockWalletTransactions } from "../../data/mockData";
import { WalletIcon } from "../../components/common/Icons";

export default function WalletPage() {
  const balance = mockWalletTransactions.reduce(
    (sum, t) => (t.type === "credit" ? sum + t.amount : sum - t.amount),
    0,
  );

  return (
    <MainLayout hideMobileHeader>
      <MobilePageHeader title="My Wallet" />
      <div className="max-w-xl mx-auto px-3 md:px-6 py-4">
        <div className="hidden md:block mb-5">
          <h1 className="text-2xl font-bold text-text-primary">My Wallet</h1>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-green-deep to-green rounded-2xl p-6 text-white mb-4">
          <div className="flex items-center gap-2 mb-3 opacity-80">
            <WalletIcon className="w-5 h-5" />
            <span className="text-sm font-medium">YouPeak Wallet</span>
          </div>
          <p className="text-4xl font-bold mb-1">₹{balance.toLocaleString()}</p>
          <p className="text-sm opacity-70">Available Balance</p>
          <button className="mt-4 bg-white text-green px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
            + Add Money
          </button>
        </div>

        {/* Promotional credits */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-[#E6EBE8] p-4 text-center">
            <p className="text-2xl font-bold text-green mb-0.5">₹150</p>
            <p className="text-xs text-text-secondary">Promo Credits</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E6EBE8] p-4 text-center">
            <p className="text-2xl font-bold text-blue mb-0.5">₹50</p>
            <p className="text-xs text-text-secondary">Cashback Credits</p>
          </div>
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-2xl border border-[#E6EBE8] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E6EBE8] bg-gray-50">
            <p className="text-sm font-semibold text-text-primary">
              Transaction History
            </p>
          </div>
          {mockWalletTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E6EBE8] last:border-0"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  t.type === "credit" ? "bg-green-light" : "bg-red/10"
                }`}
              >
                <span
                  className={`text-sm font-bold ${t.type === "credit" ? "text-green" : "text-red"}`}
                >
                  {t.type === "credit" ? "↑" : "↓"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {t.description}
                </p>
                <p className="text-xs text-text-secondary">{t.date}</p>
              </div>
              <span
                className={`text-sm font-bold ${t.type === "credit" ? "text-green" : "text-red"}`}
              >
                {t.type === "credit" ? "+" : "-"}₹{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
