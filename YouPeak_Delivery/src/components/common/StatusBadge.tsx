type StatusType = string;

const statusMap: Record<string, { label: string; cls: string }> = {
  assigned: { label: "Assigned", cls: "badge-pending" },
  accepted: { label: "Accepted", cls: "badge-active" },
  navigating_pickup: { label: "To Pickup", cls: "badge-active" },
  arrived_pickup: { label: "At Pickup", cls: "badge-active" },
  pickup_verified: { label: "Verified", cls: "badge-active" },
  picked_up: { label: "Picked Up", cls: "badge-active" },
  out_for_delivery: { label: "Out for Delivery", cls: "badge-active" },
  arrived_customer: { label: "Arrived", cls: "badge-active" },
  otp_verified: { label: "OTP Verified", cls: "badge-active" },
  proof_submitted: { label: "Proof Submitted", cls: "badge-active" },
  delivered: { label: "Delivered", cls: "badge-completed" },
  failed: { label: "Failed", cls: "badge-failed" },
  cancelled: { label: "Cancelled", cls: "badge-cancelled" },
  verified: { label: "Verified", cls: "badge-verified" },
  pending: { label: "Pending", cls: "badge-pending" },
  rejected: { label: "Rejected", cls: "badge-cancelled" },
  expiring: { label: "Expiring Soon", cls: "badge-expiring" },
  online: { label: "Online", cls: "badge-online" },
  offline: { label: "Offline", cls: "badge-offline" },
  Open: { label: "Open", cls: "badge-active" },
  Resolved: { label: "Resolved", cls: "badge-completed" },
  Pending: { label: "Pending", cls: "badge-pending" },
  Paid: { label: "Paid", cls: "badge-verified" },
  Processing: { label: "Processing", cls: "badge-pending" },
  Failed: { label: "Failed", cls: "badge-failed" },
  active: { label: "Active", cls: "badge-active" },
  completed: { label: "Completed", cls: "badge-completed" },
};

interface Props { status: StatusType; className?: string }

export default function StatusBadge({ status, className = "" }: Props) {
  const info = statusMap[status] ?? { label: status, cls: "badge-pending" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${info.cls} ${className}`}>
      {info.label}
    </span>
  );
}
