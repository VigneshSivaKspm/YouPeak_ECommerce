import { useState } from "react";
import {
  Bell,
  Globe,
  Eye,
  Navigation,
  MapPin,
  Camera,
  Lock,
  Shield,
  Smartphone,
  FileText,
  Info,
  ChevronRight,
} from "lucide-react";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "" : "bg-gray-200"}`}
      style={checked ? { background: "var(--gm-green)" } : {}}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5.5" : "translate-x-0.5"}`}
        style={{ left: checked ? "calc(100% - 22px)" : "2px" }}
      />
    </button>
  );
}

const sections = [
  {
    title: "Notification Preferences",
    icon: Bell,
    items: [
      {
        label: "New Delivery Request",
        sub: "Get notified for new assignments",
      },
      { label: "Earnings Updates", sub: "Payment and payout alerts" },
      { label: "Incentive Alerts", sub: "Bonus and incentive notifications" },
      { label: "System Announcements", sub: "App updates and maintenance" },
    ],
  },
  {
    title: "App Preferences",
    icon: Eye,
    items: [
      { label: "Navigation App", sub: "Google Maps / Apple Maps" },
      { label: "Language", sub: "English" },
      { label: "Dark Mode", sub: "Light / Dark / System" },
    ],
  },
  {
    title: "Permissions",
    icon: MapPin,
    items: [
      { label: "Location Access", sub: "Required for deliveries — Always On" },
      { label: "Camera Access", sub: "For QR scan and proof of delivery" },
      { label: "Notifications", sub: "For new requests and alerts" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Change Password", sub: "Update your login password" },
      {
        label: "Two-Factor Authentication",
        sub: "Extra security for your account",
      },
      { label: "Active Sessions", sub: "Manage logged-in devices" },
    ],
  },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "New Delivery Request": true,
    "Earnings Updates": true,
    "Incentive Alerts": true,
    "System Announcements": false,
    "Location Access": true,
    "Camera Access": true,
    Notifications: true,
    "Two-Factor Authentication": false,
    "Dark Mode": false,
  });

  const toggle = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="p-4 lg:p-6 max-w-2xl mx-auto space-y-5 pb-8">
      {sections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <div
            key={section.title}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor: "var(--gm-border)" }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-2"
              style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}
            >
              <SectionIcon size={15} style={{ color: "var(--gm-green)" }} />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {section.title}
              </span>
            </div>
            <div
              className="divide-y"
              style={{ borderColor: "var(--gm-border)" }}
            >
              {section.items.map((item) => {
                const hasToggle = item.label in toggles;
                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <div
                        className="text-sm font-medium"
                        style={{ color: "var(--gm-text)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--gm-text-muted)" }}
                      >
                        {item.sub}
                      </div>
                    </div>
                    {hasToggle ? (
                      <Toggle
                        checked={toggles[item.label]}
                        onChange={() => toggle(item.label)}
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-gray-300 flex-shrink-0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legal */}
      <div
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--gm-border)" }}
      >
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{ borderColor: "var(--gm-border)", background: "#F8FAFA" }}
        >
          <FileText size={15} style={{ color: "var(--gm-green)" }} />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Legal & About
          </span>
        </div>
        {["Terms of Service", "Privacy Policy", "Open Source Licenses"].map(
          (item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between px-5 py-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "var(--gm-border)" }}
            >
              <span className="text-sm" style={{ color: "var(--gm-text)" }}>
                {item}
              </span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ),
        )}
        <div className="px-5 py-4 flex items-center gap-2">
          <Info size={14} className="text-gray-400" />
          <span className="text-xs text-gray-400">
            YouPeak Driver v2.4.1 · Build 2026.08.27
          </span>
        </div>
      </div>
    </div>
  );
}
