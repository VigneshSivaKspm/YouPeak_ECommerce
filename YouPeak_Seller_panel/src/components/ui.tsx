import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check, Star, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";

// Button
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}
export function Button({ variant = "primary", size = "md", loading, icon, children, className = "", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[#16A34A] text-white hover:bg-[#08783D] active:bg-[#0B6835]",
    secondary: "bg-white text-[#10252E] border border-[#E5E9E8] hover:bg-[#F5F7F6]",
    ghost: "text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F6]",
    danger: "bg-[#EF4444] text-white hover:bg-red-600",
    outline: "border border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "text-xs px-2.5 py-1.5 h-7",
    md: "text-sm px-3.5 py-2 h-8",
    lg: "text-sm px-5 py-2.5 h-10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

// Badge / Status Badge
const badgeMap: Record<string, string> = {
  Active: "bg-green-50 text-green-700 border border-green-200",
  active: "bg-green-50 text-green-700 border border-green-200",
  Published: "bg-green-50 text-green-700 border border-green-200",
  Paid: "bg-green-50 text-green-700 border border-green-200",
  Delivered: "bg-green-50 text-green-700 border border-green-200",
  Refunded: "bg-green-50 text-green-700 border border-green-200",
  "In Stock": "bg-green-50 text-green-700 border border-green-200",
  Resolved: "bg-green-50 text-green-700 border border-green-200",
  New: "bg-blue-50 text-blue-700 border border-blue-200",
  Info: "bg-blue-50 text-blue-700 border border-blue-200",
  Open: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped: "bg-blue-50 text-blue-700 border border-blue-200",
  Requested: "bg-blue-50 text-blue-700 border border-blue-200",
  Processing: "bg-amber-50 text-amber-700 border border-amber-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  "Low Stock": "bg-amber-50 text-amber-700 border border-amber-200",
  "Ready for Pickup": "bg-amber-50 text-amber-700 border border-amber-200",
  "In Progress": "bg-amber-50 text-amber-700 border border-amber-200",
  Pickup: "bg-amber-50 text-amber-700 border border-amber-200",
  Approved: "bg-purple-50 text-purple-700 border border-purple-200",
  Packed: "bg-purple-50 text-purple-700 border border-purple-200",
  Received: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  Cancelled: "bg-red-50 text-red-700 border border-red-200",
  Rejected: "bg-red-50 text-red-700 border border-red-200",
  "Out of Stock": "bg-red-50 text-red-700 border border-red-200",
  Inactive: "bg-slate-100 text-slate-600 border border-slate-200",
  Draft: "bg-slate-100 text-slate-600 border border-slate-200",
  Expired: "bg-slate-100 text-slate-600 border border-slate-200",
  Closed: "bg-slate-100 text-slate-600 border border-slate-200",
  COD: "bg-slate-100 text-slate-600 border border-slate-200",
  High: "bg-red-50 text-red-700 border border-red-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Low: "bg-green-50 text-green-700 border border-green-200",
};
export function Badge({ label, className = "" }: { label: string; className?: string }) {
  const styles = badgeMap[label] || "bg-gray-100 text-gray-600 border border-gray-200";
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles} ${className}`}>{label}</span>;
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
}
export function Input({ label, error, startIcon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#10252E]">{label}</label>}
      <div className="relative">
        {startIcon && <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]">{startIcon}</span>}
        <input
          className={`w-full h-8 text-sm border border-[#E5E9E8] rounded-md bg-white text-[#10252E] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-colors ${startIcon ? "pl-8 pr-3" : "px-3"} ${error ? "border-red-400" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#10252E]">{label}</label>}
      <textarea
        className={`w-full text-sm border border-[#E5E9E8] rounded-md bg-white text-[#10252E] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-colors px-3 py-2 resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}
export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-[#10252E]">{label}</label>}
      <select
        className={`w-full h-8 text-sm border border-[#E5E9E8] rounded-md bg-white text-[#10252E] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-colors px-3 ${className}`}
        {...props}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// Toggle
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span
        onClick={() => onChange(!checked)}
        className={`relative inline-block w-9 h-5 rounded-full transition-colors ${checked ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      {label && <span className="text-sm text-[#10252E]">{label}</span>}
    </label>
  );
}

// Checkbox
export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span
        onClick={() => onChange(!checked)}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? "bg-[#16A34A] border-[#16A34A]" : "border-[#E5E9E8] bg-white"}`}
      >
        {checked && <Check size={10} className="text-white stroke-[3]" />}
      </span>
      {label && <span className="text-sm text-[#10252E]">{label}</span>}
    </label>
  );
}

// Stars
export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

// Modal
interface ModalProps { open: boolean; onClose: () => void; title?: string; children: React.ReactNode; width?: string; }
export function Modal({ open, onClose, title, children, width = "max-w-lg" }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E9E8]">
            <h3 className="text-base font-semibold text-[#10252E]">{title}</h3>
            <button onClick={onClose} className="text-[#64748B] hover:text-[#10252E] transition-colors"><X size={18} /></button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// Confirmation Modal
export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", danger = false }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirmLabel?: string; danger?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} width="max-w-md">
      <p className="text-sm text-[#64748B] mb-5">{message}</p>
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant={danger ? "danger" : "primary"} size="sm" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}

// Toast
interface ToastProps { message: string; type?: "success" | "error" | "info"; onClose: () => void; }
export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: "bg-green-50 border-green-200 text-green-800", error: "bg-red-50 border-red-200 text-red-800", info: "bg-blue-50 border-blue-200 text-blue-800" };
  const icons = { success: <CheckCircle size={16} />, error: <XCircle size={16} />, info: <AlertCircle size={16} /> };
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm font-medium shadow-lg ${colors[type]} animate-slide-up`}>
      {icons[type]}{message}
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

// Dropdown Menu
export function ActionMenu({ items, children }: { items: { label: string; icon?: React.ReactNode; onClick: () => void; danger?: boolean }[]; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded text-[#64748B] hover:text-[#10252E] hover:bg-[#F5F7F6] transition-colors">
        {children || <span className="text-lg leading-none">⋯</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E9E8] rounded-lg shadow-lg z-20 min-w-[160px] py-1">
          {items.map((item, i) => (
            <button key={i} onClick={() => { item.onClick(); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2 text-sm flex items-center gap-2.5 hover:bg-[#F5F7F6] transition-colors ${item.danger ? "text-red-600" : "text-[#10252E]"}`}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Pagination
export function Pagination({ current, total, perPage, onPageChange, onPerPageChange }: {
  current: number; total: number; perPage: number; onPageChange: (p: number) => void; onPerPageChange?: (n: number) => void;
}) {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between text-xs text-[#64748B]">
      <span>Showing 1 to {Math.min(perPage, total)} of {total}</span>
      <div className="flex items-center gap-2">
        {onPerPageChange && (
          <select value={perPage} onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="h-7 px-2 border border-[#E5E9E8] rounded text-xs bg-white focus:outline-none">
            {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
          </select>
        )}
        <button onClick={() => onPageChange(Math.max(1, current - 1))} disabled={current === 1}
          className="px-2 py-1 border border-[#E5E9E8] rounded hover:bg-[#F5F7F6] disabled:opacity-40 disabled:cursor-not-allowed">←</button>
        {pages.map((p) => (
          <button key={p} onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded text-xs ${current === p ? "bg-[#16A34A] text-white" : "border border-[#E5E9E8] hover:bg-[#F5F7F6]"}`}>{p}</button>
        ))}
        {totalPages > 5 && <span>…</span>}
        <button onClick={() => onPageChange(Math.min(totalPages, current + 1))} disabled={current === totalPages}
          className="px-2 py-1 border border-[#E5E9E8] rounded hover:bg-[#F5F7F6] disabled:opacity-40 disabled:cursor-not-allowed">→</button>
      </div>
    </div>
  );
}

// Page Header
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-lg font-semibold text-[#10252E]">{title}</h1>
        {subtitle && <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Card
export function Card({ children, className = "", padding = true }: { children: React.ReactNode; className?: string; padding?: boolean }) {
  return (
    <div className={`bg-white border border-[#E5E9E8] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${padding ? "p-5" : ""} ${className}`}>
      {children}
    </div>
  );
}

// KPI Card
export function KPICard({ title, value, change, trend, label, icon, iconBg }: {
  title: string; value: string; change?: string; trend?: "up" | "down" | "neutral" | "warning"; label?: string; icon: React.ReactNode; iconBg: string;
}) {
  return (
    <Card className="flex items-start gap-3.5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-[#64748B] font-medium">{title}</p>
        <p className="text-xl font-bold text-[#10252E] mt-0.5">{value}</p>
        {(change || label) && (
          <p className="text-xs mt-0.5 flex items-center gap-1">
            {change && <span className={trend === "up" ? "text-green-600 font-medium" : trend === "down" ? "text-red-500 font-medium" : trend === "warning" ? "text-amber-600 font-medium" : "text-[#64748B]"}>{change}</span>}
            {label && <span className="text-[#64748B]">{label}</span>}
          </p>
        )}
      </div>
    </Card>
  );
}

// Table
export function Table({ columns, children, className = "" }: { columns: string[]; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E9E8]">
            {columns.map((col) => (
              <th key={col} className="px-3 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E9E8]">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) {
  return <td className={`px-3 py-2.5 text-[#10252E] whitespace-nowrap ${className}`} onClick={onClick}>{children}</td>;
}

// Tabs
export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex border-b border-[#E5E9E8] gap-0">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px ${active === tab ? "border-[#16A34A] text-[#16A34A]" : "border-transparent text-[#64748B] hover:text-[#10252E]"}`}>
          {tab}
        </button>
      ))}
    </div>
  );
}

// Search Input
export function SearchInput({ value, onChange, placeholder = "Search..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="h-8 pl-8 pr-3 text-sm border border-[#E5E9E8] rounded-md bg-white text-[#10252E] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] transition-colors w-56" />
    </div>
  );
}

// Stepper
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors
              ${i < current ? "bg-[#16A34A] border-[#16A34A] text-white" : i === current ? "border-[#16A34A] text-[#16A34A] bg-white" : "border-[#E5E9E8] text-[#64748B] bg-white"}`}>
              {i < current ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-medium whitespace-nowrap ${i === current ? "text-[#16A34A]" : i < current ? "text-[#10252E]" : "text-[#64748B]"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-px flex-1 mx-2 mb-4 ${i < current ? "bg-[#16A34A]" : "bg-[#E5E9E8]"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// Empty State
export function EmptyState({ title, message, action }: { title: string; message?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-[#F5F7F6] flex items-center justify-center mb-3">
        <AlertCircle size={24} className="text-[#64748B]" />
      </div>
      <p className="text-sm font-medium text-[#10252E]">{title}</p>
      {message && <p className="text-xs text-[#64748B] mt-1">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// Toast container hook
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const show = (message: string, type: "success" | "error" | "info" = "success") => setToast({ message, type });
  const ToastEl = toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null;
  return { show, ToastEl };
}

// Avatar
export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const sizes = { sm: "w-6 h-6 text-xs", md: "w-8 h-8 text-sm", lg: "w-10 h-10 text-base" };
  return (
    <div className={`${sizes[size]} rounded-full bg-[#16A34A] text-white flex items-center justify-center font-semibold shrink-0`}>{initials}</div>
  );
}
