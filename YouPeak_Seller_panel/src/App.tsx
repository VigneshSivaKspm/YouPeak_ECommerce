import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SellerLayout from "@/layouts/SellerLayout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Products from "@/pages/Products";
import AddEditProduct from "@/pages/AddEditProduct";
import Inventory from "@/pages/Inventory";
import Customers from "@/pages/Customers";
import CustomerDetail from "@/pages/CustomerDetail";
import Store from "@/pages/Store";
import Marketing from "@/pages/Marketing";
import Reviews from "@/pages/Reviews";
import Returns from "@/pages/Returns";
import Earnings from "@/pages/Earnings";
import Payouts from "@/pages/Payouts";
import Analytics from "@/pages/Analytics";
import Reports from "@/pages/Reports";
import Support from "@/pages/Support";
import Settings from "@/pages/Settings";

function Layout({ children }: { children: React.ReactNode }) {
  return <SellerLayout>{children}</SellerLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/orders/:id" element={<Layout><OrderDetail /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/products/add" element={<Layout><AddEditProduct /></Layout>} />
        <Route path="/products/:id/edit" element={<Layout><AddEditProduct /></Layout>} />
        <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/customers" element={<Layout><Customers /></Layout>} />
        <Route path="/customers/:id" element={<Layout><CustomerDetail /></Layout>} />
        <Route path="/store" element={<Layout><Store /></Layout>} />
        <Route path="/marketing" element={<Layout><Marketing /></Layout>} />
        <Route path="/coupons" element={<Navigate to="/marketing" replace />} />
        <Route path="/offers" element={<Navigate to="/marketing" replace />} />
        <Route path="/flash-sales" element={<Navigate to="/marketing" replace />} />
        <Route path="/promotions" element={<Navigate to="/marketing" replace />} />
        <Route path="/campaigns" element={<Navigate to="/marketing" replace />} />
        <Route path="/referral" element={<Navigate to="/marketing" replace />} />
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        <Route path="/returns" element={<Layout><Returns /></Layout>} />
        <Route path="/returns/:id" element={<Layout><Returns /></Layout>} />
        <Route path="/earnings" element={<Layout><Earnings /></Layout>} />
        <Route path="/payouts" element={<Layout><Payouts /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/support" element={<Layout><Support /></Layout>} />
        <Route path="/support/:id" element={<Layout><Support /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
