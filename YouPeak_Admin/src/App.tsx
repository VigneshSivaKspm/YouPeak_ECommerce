import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import Products from "@/pages/Products";
import ProductApproval from "@/pages/ProductApproval";
import ProductEditor from "@/pages/ProductEditor";
import Vendors from "@/pages/Vendors";
import VendorDetails from "@/pages/VendorDetails";
import Customers from "@/pages/Customers";
import Delivery from "@/pages/Delivery";
import Finance from "@/pages/Finance";
import Payouts from "@/pages/Payouts";
import Returns from "@/pages/Returns";
import Reviews from "@/pages/Reviews";
import Marketing from "@/pages/Marketing";
import Analytics from "@/pages/Analytics";
import Reports from "@/pages/Reports";
import Support from "@/pages/Support";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import SimplePage from "@/pages/SimplePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />

          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductEditor />} />
          <Route path="product-approval" element={<ProductApproval />} />

          <Route path="categories" element={<SimplePage title="Categories" desc="Manage product categories and hierarchy." />} />
          <Route path="brands" element={<SimplePage title="Brands" desc="Manage brand registrations and profiles." />} />

          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/:id" element={<VendorDetails />} />

          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<SimplePage title="Customer Details" desc="Detailed customer profile and order history." />} />

          <Route path="delivery" element={<Delivery />} />
          <Route path="returns" element={<Returns />} />
          <Route path="reviews" element={<Reviews />} />

          <Route path="finance" element={<Finance />} />
          <Route path="payouts" element={<Payouts />} />

          <Route path="marketing" element={<Marketing />} />
          <Route path="coupons" element={<Marketing />} />
          <Route path="banners" element={<SimplePage title="Banners" desc="Manage promotional banners and placements." />} />

          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />

          <Route path="support" element={<Support />} />
          <Route path="notifications" element={<Notifications />} />

          <Route path="cms" element={<SimplePage title="CMS" desc="Manage website content, pages and blog posts." />} />
          <Route path="administration" element={<SimplePage title="Administration" desc="Manage admin users, roles and permissions." />} />
          <Route path="audit-logs" element={<SimplePage title="Audit Logs" desc="View all admin activity and system events." />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
