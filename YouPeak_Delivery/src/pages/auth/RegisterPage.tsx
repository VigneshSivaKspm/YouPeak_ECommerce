import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Shield,
  Truck,
  CreditCard,
  Eye,
} from "lucide-react";

const steps = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Identity", icon: Shield },
  { id: 3, label: "Vehicle", icon: Truck },
  { id: 4, label: "Bank", icon: CreditCard },
  { id: 5, label: "Review", icon: Eye },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "Rajesh Kumar",
    phone: "98765 43210",
    email: "rajesh.kumar@email.com",
    dob: "1990-05-15",
    city: "Chennai",
    idType: "Aadhaar",
    idNumber: "XXXX XXXX 1234",
    licence: "TN0120200012345",
    licenceExpiry: "2028-03-15",
    vehicleType: "Motorcycle",
    vehicleNumber: "TN 01 AB 1234",
    vehicleModel: "Honda Activa 6G",
    bankName: "HDFC Bank",
    accountNumber: "XXXXXXXXXXX3456",
    ifsc: "HDFC0001234",
    upi: "rajesh@upi",
  });

  const canProceed = step < 5;
  const isLast = step === 5;

  const handleSubmit = () => {
    setTimeout(() => navigate("/approval-status"), 500);
  };

  return (
    <div
      className="min-h-full flex flex-col items-center justify-start py-8 px-4"
      style={{ background: "var(--gm-bg)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 w-full max-w-lg">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate("/login"))}
          className="p-1.5 rounded-lg hover:bg-white transition-colors"
        >
          <ChevronLeft size={20} style={{ color: "var(--gm-text)" }} />
        </button>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gm-green)" }}
          >
            <Package size={14} className="text-white" />
          </div>
          <span
            className="font-bold text-sm"
            style={{ color: "var(--gm-text)" }}
          >
            Driver Registration
          </span>
        </div>
        <span
          className="ml-auto text-xs"
          style={{ color: "var(--gm-text-muted)" }}
        >
          Step {step} of 5
        </span>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between w-full max-w-lg mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = step > s.id;
          const active = step === s.id;
          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                    done
                      ? "bg-green-500 border-green-500 text-white"
                      : active
                        ? "border-green-500 bg-white"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {done ? (
                    <Check size={16} />
                  ) : (
                    <Icon
                      size={15}
                      style={active ? { color: "var(--gm-green)" } : {}}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${active ? "" : done ? "text-green-600" : "text-gray-400"}`}
                  style={active ? { color: "var(--gm-green)" } : {}}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-12 mb-4 mx-1 transition-colors ${step > s.id ? "bg-green-400" : "bg-gray-200"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form card */}
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-sm border p-6"
        style={{ borderColor: "var(--gm-border)" }}
      >
        {step === 1 && (
          <div>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--gm-text)" }}
            >
              Personal Details
            </h2>
            <div className="space-y-4">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Mobile Number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                prefix="+91"
              />
              <Field
                label="Email Address"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="Date of Birth"
                value={form.dob}
                onChange={(v) => setForm({ ...form, dob: v })}
                type="date"
              />
              <Field
                label="City"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />
              {/* Profile photo placeholder */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--gm-text)" }}
                >
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: "var(--gm-green)" }}
                  >
                    RK
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-50 transition-colors"
                    style={{
                      borderColor: "var(--gm-border)",
                      color: "var(--gm-text)",
                    }}
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--gm-text)" }}
            >
              Identity Verification
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--gm-text)" }}
                >
                  ID Type
                </label>
                <select
                  className="w-full p-3.5 rounded-xl border bg-white text-sm outline-none"
                  style={{
                    borderColor: "var(--gm-border)",
                    color: "var(--gm-text)",
                  }}
                >
                  <option>Aadhaar Card</option>
                  <option>PAN Card</option>
                  <option>Voter ID</option>
                </select>
              </div>
              <Field
                label="ID Number"
                value={form.idNumber}
                onChange={(v) => setForm({ ...form, idNumber: v })}
              />
              <Field
                label="Driving Licence Number"
                value={form.licence}
                onChange={(v) => setForm({ ...form, licence: v })}
              />
              <Field
                label="Licence Expiry Date"
                value={form.licenceExpiry}
                onChange={(v) => setForm({ ...form, licenceExpiry: v })}
                type="date"
              />
              <div className="grid grid-cols-2 gap-3">
                {["Government ID", "Driving Licence"].map((doc) => (
                  <div
                    key={doc}
                    className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-green-400 transition-colors"
                    style={{ borderColor: "var(--gm-border)" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                      <Shield size={16} className="text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                      Upload {doc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--gm-text)" }}
            >
              Vehicle Details
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--gm-text)" }}
                >
                  Vehicle Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Bicycle", "Motorcycle", "Car"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setForm({ ...form, vehicleType: type })}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all ${form.vehicleType === type ? "border-green-500 text-green-700 bg-green-50" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <Field
                label="Vehicle Number"
                value={form.vehicleNumber}
                onChange={(v) => setForm({ ...form, vehicleNumber: v })}
              />
              <Field
                label="Vehicle Model"
                value={form.vehicleModel}
                onChange={(v) => setForm({ ...form, vehicleModel: v })}
              />
              <div
                className="p-4 rounded-xl border-2 border-dashed cursor-pointer hover:border-green-400 transition-colors"
                style={{ borderColor: "var(--gm-border)" }}
              >
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      Upload RC Document
                    </div>
                    <div className="text-xs text-gray-400">
                      JPG, PNG or PDF • Max 5MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--gm-text)" }}
            >
              Bank & UPI Details
            </h2>
            <div className="space-y-4">
              <Field
                label="Bank Name"
                value={form.bankName}
                onChange={(v) => setForm({ ...form, bankName: v })}
              />
              <Field
                label="Account Number"
                value={form.accountNumber}
                onChange={(v) => setForm({ ...form, accountNumber: v })}
              />
              <Field
                label="IFSC Code"
                value={form.ifsc}
                onChange={(v) => setForm({ ...form, ifsc: v })}
              />
              <div
                className="h-px"
                style={{ background: "var(--gm-border)" }}
              />
              <Field
                label="UPI ID (Optional)"
                value={form.upi}
                onChange={(v) => setForm({ ...form, upi: v })}
                placeholder="yourname@upi"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--gm-text)" }}
            >
              Review & Submit
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Personal Details",
                  items: [
                    `Name: ${form.name}`,
                    `Phone: +91 ${form.phone}`,
                    `Email: ${form.email}`,
                  ],
                },
                {
                  label: "Identity",
                  items: [
                    `Driving Licence: ${form.licence}`,
                    `Expiry: ${form.licenceExpiry}`,
                  ],
                },
                {
                  label: "Vehicle",
                  items: [
                    `${form.vehicleType}: ${form.vehicleNumber}`,
                    form.vehicleModel,
                  ],
                },
                {
                  label: "Bank",
                  items: [
                    `${form.bankName} · ${form.accountNumber}`,
                    `IFSC: ${form.ifsc}`,
                    `UPI: ${form.upi}`,
                  ],
                },
              ].map((section) => (
                <div
                  key={section.label}
                  className="p-4 rounded-xl bg-gray-50 border"
                  style={{ borderColor: "var(--gm-border)" }}
                >
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {section.label}
                  </div>
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="text-sm"
                      style={{ color: "var(--gm-text)" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
              <div
                className="flex items-start gap-2.5 p-4 rounded-xl"
                style={{ background: "var(--gm-green-light)" }}
              >
                <input
                  type="checkbox"
                  id="agree"
                  className="mt-0.5 accent-green-600"
                  defaultChecked
                />
                <label
                  htmlFor="agree"
                  className="text-xs"
                  style={{ color: "var(--gm-text)" }}
                >
                  I confirm all information is accurate and agree to YouPeak's{" "}
                  <span
                    className="underline"
                    style={{ color: "var(--gm-green)" }}
                  >
                    Terms & Conditions
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="w-full max-w-lg flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3.5 rounded-xl border font-semibold text-sm transition-colors hover:bg-white"
            style={{
              borderColor: "var(--gm-border)",
              color: "var(--gm-text-muted)",
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={isLast ? handleSubmit : () => setStep(step + 1)}
          className="flex-[2] py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: "var(--gm-green)" }}
        >
          {isLast ? (
            "Submit Application"
          ) : (
            <>
              Continue <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  prefix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  prefix?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "var(--gm-text)" }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 px-3.5 py-3 rounded-xl border bg-white"
        style={{ borderColor: "var(--gm-border)" }}
      >
        {prefix && (
          <span
            className="text-sm font-medium pr-2 border-r"
            style={{ borderColor: "var(--gm-border)", color: "var(--gm-text)" }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          className="flex-1 text-sm outline-none bg-transparent"
          style={{ color: "var(--gm-text)" }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
