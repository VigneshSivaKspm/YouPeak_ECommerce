import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import AppLayout from "@/layouts/AppLayout";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ApprovalStatusPage from "@/pages/auth/ApprovalStatusPage";

// Main pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import DeliveriesPage from "@/pages/deliveries/DeliveriesPage";
import DeliveryDetailPage from "@/pages/deliveries/DeliveryDetailPage";
import PickupNavigationPage from "@/pages/deliveries/PickupNavigationPage";
import PickupVerifyPage from "@/pages/deliveries/PickupVerifyPage";
import PackageCheckPage from "@/pages/deliveries/PackageCheckPage";
import OutForDeliveryPage from "@/pages/deliveries/OutForDeliveryPage";
import VerifyDeliveryPage from "@/pages/deliveries/VerifyDeliveryPage";
import ProofOfDeliveryPage from "@/pages/deliveries/ProofOfDeliveryPage";
import DeliverySuccessPage from "@/pages/deliveries/DeliverySuccessPage";
import HistoryPage from "@/pages/history/HistoryPage";
import EarningsPage from "@/pages/earnings/EarningsPage";
import PayoutsPage from "@/pages/earnings/PayoutsPage";
import IncentivesPage from "@/pages/incentives/IncentivesPage";
import PerformancePage from "@/pages/performance/PerformancePage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import DocumentsPage from "@/pages/profile/DocumentsPage";
import VehiclePage from "@/pages/profile/VehiclePage";
import BankPage from "@/pages/profile/BankPage";
import SupportPage from "@/pages/support/SupportPage";
import SupportChatPage from "@/pages/support/SupportChatPage";
import SettingsPage from "@/pages/settings/SettingsPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/approval-status" element={<ApprovalStatusPage />} />

          {/* App routes (with layout) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/deliveries" element={<DeliveriesPage />} />
            <Route path="/deliveries/:id" element={<DeliveryDetailPage />} />
            <Route path="/deliveries/:id/navigation" element={<PickupNavigationPage />} />
            <Route path="/deliveries/:id/pickup" element={<PickupNavigationPage />} />
            <Route path="/deliveries/:id/verify-pickup" element={<PickupVerifyPage />} />
            <Route path="/deliveries/:id/package-check" element={<PackageCheckPage />} />
            <Route path="/deliveries/:id/delivery" element={<OutForDeliveryPage />} />
            <Route path="/deliveries/:id/verify-delivery" element={<VerifyDeliveryPage />} />
            <Route path="/deliveries/:id/proof" element={<ProofOfDeliveryPage />} />
            <Route path="/deliveries/:id/success" element={<DeliverySuccessPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
            <Route path="/payouts" element={<PayoutsPage />} />
            <Route path="/incentives" element={<IncentivesPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/documents" element={<DocumentsPage />} />
            <Route path="/profile/vehicle" element={<VehiclePage />} />
            <Route path="/profile/bank" element={<BankPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/:id" element={<SupportChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
