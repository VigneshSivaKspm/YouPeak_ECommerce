import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DesktopHeader, MobileHeader } from "../components/navigation/Header";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import Toast from "../components/common/Toast";

interface MainLayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
  hideMobileHeader?: boolean;
  hideDesktopHeader?: boolean;
}

function Footer() {
  return (
    <footer className="hidden md:block bg-[#10252E] text-white mt-12">
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Y</span>
              </div>
              <span className="font-bold text-lg">YouPeak</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Better Choices. Brighter Tomorrow. Your trusted multi-vendor
              marketplace.
            </p>
          </div>
          {[
            {
              title: "Customer Service",
              links: [
                "Help Center",
                "Track Order",
                "Returns",
                "Refunds",
                "Contact Us",
              ],
            },
            {
              title: "Policies",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Seller Policy",
              ],
            },
            {
              title: "Sell on YouPeak",
              links: [
                "Become a Seller",
                "Seller Dashboard",
                "Seller Support",
                "Seller Policies",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press", "Blog", "Sustainability"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-3 text-gray-200">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 YouPeak. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Payment Methods:</span>
            {["UPI", "Visa", "Mastercard", "PayTM", "COD"].map((p) => (
              <span
                key={p}
                className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function MainLayout({
  children,
  hideBottomNav = false,
  hideMobileHeader = false,
  hideDesktopHeader = false,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg">
      {!hideDesktopHeader && <DesktopHeader />}
      {!hideMobileHeader && <MobileHeader />}
      <main className={`flex-1 ${!hideBottomNav ? "pb-20 md:pb-0" : ""}`}>
        {children}
      </main>
      <Footer />
      {!hideBottomNav && <MobileBottomNav />}
      <Toast />
    </div>
  );
}
