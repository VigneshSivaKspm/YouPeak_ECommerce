import { useState } from "react";
import { Shield, Monitor, Smartphone, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const tabs = ["Security Overview", "Active Sessions", "Login Security", "2FA Settings", "API Activity"];

const sessions = [
  { device: "Chrome on Windows", ip: "103.21.45.47", location: "Bangalore, India", time: "27 Aug 2026, 10:45 AM", status: "Active" },
  { device: "Safari on MacOS", ip: "103.21.45.48", location: "Mumbai, India", time: "27 Aug 2026, 09:30 AM", status: "Active" },
  { device: "Firefox on Windows", ip: "103.21.45.50", location: "Delhi, India", time: "27 Aug 2026, 08:15 AM", status: "Active" },
  { device: "Chrome on Windows", ip: "103.21.40.71", location: "Chennai, India", time: "27 Aug 2026, 07:45 AM", status: "Active" },
  { device: "Chrome on Windows", ip: "103.21.45.11", location: "Hyderabad, India", time: "26 Aug 2026, 11:30 PM", status: "Failed" },
];

const systemHealth = [
  ["API Service", "Operational"],
  ["Database", "Operational"],
  ["Payment Gateway", "Operational"],
  ["Notification Service", "Operational"],
  ["Storage", "Operational"],
  ["Search Service", "Operational"],
  ["Maps Service", "Operational"],
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-[#10252E]">Settings & Security</h1>

      <div className="bg-white rounded-lg border border-[#E5E9E8]">
        <div className="flex overflow-x-auto border-b border-[#E5E9E8]">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 2FA Status */}
                <div className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-4">
                  <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><Shield size={13} className="text-[#16A34A]" />2FA Status</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">Status</span>
                    <span className="text-xs font-semibold text-green-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[#64748B]">All Admins</span>
                    <button onClick={() => setTwoFA(!twoFA)}
                      className={`w-10 h-5 rounded-full transition-colors ${twoFA ? "bg-[#16A34A]" : "bg-[#E5E9E8]"} relative`}>
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${twoFA ? "left-5.5" : "left-0.5"}`} style={{ left: twoFA ? "22px" : "2px" }} />
                    </button>
                  </div>
                </div>

                {/* Active sessions */}
                <div className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-4">
                  <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><Monitor size={13} className="text-[#16A34A]" />Active Sessions</h3>
                  <p className="text-3xl font-bold text-[#10252E]">12</p>
                  <p className="text-xs text-[#64748B] mt-1">Across 6 devices</p>
                  <button className="mt-3 px-3 py-1.5 text-[10px] border border-red-200 text-red-600 rounded-md hover:bg-red-50 font-medium">Revoke All Sessions</button>
                </div>

                {/* Security score */}
                <div className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-4">
                  <h3 className="text-xs font-semibold text-[#10252E] mb-3 flex items-center gap-1.5"><AlertTriangle size={13} className="text-yellow-500" />Failed Logins (24h)</h3>
                  <p className="text-3xl font-bold text-red-500">18</p>
                  <p className="text-xs text-[#64748B] mt-1">3 suspicious IPs blocked</p>
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-[#64748B]">Security Score</span>
                      <span className="text-xs font-bold text-green-600">92/100 Excellent</span>
                    </div>
                    <div className="h-2 bg-[#E5E9E8] rounded-full">
                      <div className="h-full bg-[#16A34A] rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Activity */}
              <div>
                <h3 className="text-sm font-semibold text-[#10252E] mb-2">Recent Login Activity</h3>
                <div className="border border-[#E5E9E8] rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFB] border-b border-[#E5E9E8]">
                        {["Admin", "Device / Browser", "IP Address", "Location", "Time", "Status"].map(h => (
                          <th key={h} className="text-left px-3 py-2.5 text-[#64748B] font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                      {sessions.map((s, i) => (
                        <tr key={i} className="hover:bg-[#F8FAFB]">
                          <td className="px-3 py-2.5 font-medium text-[#10252E]">Admin {i + 1}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{s.device}</td>
                          <td className="px-3 py-2.5 font-mono text-[#64748B]">{s.ip}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{s.location}</td>
                          <td className="px-3 py-2.5 text-[#64748B]">{s.time}</td>
                          <td className="px-3 py-2.5">
                            {s.status === "Active" ? (
                              <span className="flex items-center gap-1 text-green-600"><CheckCircle size={11} />Active</span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-500"><XCircle size={11} />Failed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Health */}
              <div>
                <h3 className="text-sm font-semibold text-[#10252E] mb-2">System Health</h3>
                <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
                  {systemHealth.map(([service, status]) => (
                    <div key={service} className="bg-[#F8FAFB] rounded-lg border border-[#E5E9E8] p-3 text-center">
                      <CheckCircle size={16} className="text-green-500 mx-auto mb-1" />
                      <p className="text-[10px] font-semibold text-[#10252E]">{service}</p>
                      <p className="text-[9px] text-green-600">{status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 0 && (
            <div className="flex items-center justify-center h-48 text-[#64748B] text-sm">
              {tabs[activeTab]} settings — coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
