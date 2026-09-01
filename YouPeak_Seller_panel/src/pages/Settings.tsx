import { useState } from "react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { Input, Textarea, Select, Toggle, Button, Card, useToast } from "@/components/ui";

const sidebarSections = [
  {
    group: "STORE",
    items: ["Store Profile", "Store Logo", "Store Banner", "Business Information"],
  },
  {
    group: "ACCOUNT",
    items: ["Profile Information", "Change Password", "Two-Factor Authentication"],
  },
  {
    group: "BUSINESS",
    items: ["GST / Tax", "Business Documents"],
  },
  {
    group: "BANKING",
    items: ["Bank Account", "UPI Details", "Payout Information"],
  },
  {
    group: "SHIPPING",
    items: ["Shipping Preferences", "Delivery Zones", "Processing Time"],
  },
  {
    group: "SECURITY",
    items: ["Login Sessions", "Devices", "Activity Log"],
  },
  {
    group: "PREFERENCES",
    items: ["Language & Region", "Timezone", "Currency"],
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Store Profile");
  const [showPass, setShowPass] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const { show, ToastEl } = useToast();

  const renderSection = () => {
    switch (activeSection) {
      case "Store Profile":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#10252E]">Store Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Store Name" defaultValue="Tech World Store" />
              <Select label="Store Category" options={[{ label: "Electronics", value: "electronics" }, { label: "Fashion", value: "fashion" }]} />
              <Input label="Store Email" defaultValue="support@techworldstore.com" />
              <Input label="Store Phone" defaultValue="+91 98765 43210" />
              <Input label="Store Website" defaultValue="www.techworldstore.com" />
              <Select label="Business Type" options={[{ label: "Private Limited", value: "pvt" }, { label: "Individual", value: "individual" }]} />
              <Input label="GST Number" defaultValue="33ABCDE1234F1Z5" />
              <Input label="PAN Number" defaultValue="ABCDE1234F" />
              <Input label="Business Start Date" type="date" defaultValue="2021-01-15" />
              <Input label="Return Policy" defaultValue="7 days return policy" />
            </div>
            <Textarea label="Store Description" rows={3} defaultValue="We provide high quality electronics and accessories." />
            <Input label="Support Email" defaultValue="support@techworldstore.com" />
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("Store profile saved!", "success")}>Save Changes</Button>
            </div>
          </div>
        );

      case "Profile Information":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#10252E]">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" defaultValue="Rajesh" />
              <Input label="Last Name" defaultValue="Kumar" />
              <Input label="Email" defaultValue="rajesh@techworldstore.com" />
              <Input label="Phone" defaultValue="+91 98765 43210" />
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("Profile saved!", "success")}>Save Changes</Button>
            </div>
          </div>
        );

      case "Change Password":
        return (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-semibold text-[#10252E]">Change Password</h3>
            <div className="relative">
              <Input label="Current Password" type={showPass ? "text" : "password"} placeholder="Enter current password" />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-2 top-6 text-[#64748B]">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Input label="New Password" type="password" placeholder="Enter new password" />
            <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("Password updated!", "success")}>Update Password</Button>
            </div>
          </div>
        );

      case "Two-Factor Authentication":
        return (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-semibold text-[#10252E]">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between p-4 border border-[#E5E9E8] rounded-xl">
              <div>
                <p className="text-sm font-medium text-[#10252E]">Enable 2FA</p>
                <p className="text-xs text-[#64748B] mt-0.5">Secure your account with two-factor authentication</p>
              </div>
              <Toggle checked={twoFa} onChange={setTwoFa} />
            </div>
            {twoFa && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-xs font-medium text-green-800">2FA Enabled</p>
                <p className="text-xs text-green-700 mt-1">Your account is now protected with 2FA via SMS OTP.</p>
              </div>
            )}
          </div>
        );

      case "Bank Account":
        return (
          <div className="space-y-4 max-w-lg">
            <h3 className="text-sm font-semibold text-[#10252E]">Bank Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Account Holder Name" defaultValue="Rajesh Kumar" />
              <Input label="Account Number" defaultValue="****1234" />
              <Input label="IFSC Code" defaultValue="HDFC0001234" />
              <Input label="Bank Name" defaultValue="HDFC Bank" />
              <Input label="Branch" defaultValue="Chennai Main Branch" />
            </div>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("Bank details saved!", "success")}>Save Details</Button>
            </div>
          </div>
        );

      case "UPI Details":
        return (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-semibold text-[#10252E]">UPI Details</h3>
            <Input label="UPI ID" defaultValue="rajesh@hdfc" />
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("UPI details saved!", "success")}>Save UPI</Button>
            </div>
          </div>
        );

      case "Login Sessions":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[#10252E]">Active Login Sessions</h3>
            {[
              { device: "Chrome on Windows 11", location: "Chennai, Tamil Nadu", time: "Current Session", current: true },
              { device: "Safari on iPhone 15", location: "Chennai, Tamil Nadu", time: "2 hours ago", current: false },
              { device: "Firefox on MacBook", location: "Bangalore, Karnataka", time: "Yesterday", current: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-[#E5E9E8] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.current ? "bg-green-500" : "bg-gray-300"}`} />
                  <div>
                    <p className="text-xs font-medium text-[#10252E]">{s.device}</p>
                    <p className="text-[10px] text-[#64748B]">{s.location} · {s.time}</p>
                  </div>
                </div>
                {!s.current && (
                  <Button variant="danger" size="sm" onClick={() => show("Session terminated", "error")}>Revoke</Button>
                )}
                {s.current && <span className="text-[10px] text-green-600 font-medium">Current</span>}
              </div>
            ))}
          </div>
        );

      case "Language & Region":
        return (
          <div className="space-y-4 max-w-md">
            <h3 className="text-sm font-semibold text-[#10252E]">Language & Region Preferences</h3>
            <Select label="Language" options={[{ label: "English", value: "en" }, { label: "Hindi", value: "hi" }, { label: "Tamil", value: "ta" }]} />
            <Select label="Timezone" options={[{ label: "Asia/Kolkata (IST +5:30)", value: "ist" }, { label: "UTC", value: "utc" }]} />
            <Select label="Currency" options={[{ label: "₹ Indian Rupee (INR)", value: "inr" }, { label: "$ US Dollar (USD)", value: "usd" }]} />
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => show("Preferences saved!", "success")}>Save</Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F5F7F6] flex items-center justify-center mx-auto mb-3">
              <Shield size={24} className="text-[#64748B]" />
            </div>
            <p className="text-sm font-medium text-[#10252E]">{activeSection}</p>
            <p className="text-xs text-[#64748B] mt-1">Configure your {activeSection.toLowerCase()} settings here.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => show("Settings saved!", "success")}>Save Changes</Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {ToastEl}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#10252E]">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card padding={false}>
            {sidebarSections.map((section) => (
              <div key={section.group}>
                <p className="px-4 pt-4 pb-1 text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">{section.group}</p>
                {section.items.map((item) => (
                  <button key={item} onClick={() => setActiveSection(item)}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${activeSection === item ? "text-[#16A34A] bg-green-50 border-r-2 border-[#16A34A]" : "text-[#10252E] hover:bg-[#F5F7F6]"}`}>
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>{renderSection()}</Card>
        </div>
      </div>
    </div>
  );
}
