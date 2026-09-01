interface Props { status: string; size?: "sm" | "md" }

const statusMap: Record<string, string> = {
  Active: "bg-green-50 text-green-700 border-green-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Approved: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Resolved: "bg-green-50 text-green-700 border-green-200",
  Refunded: "bg-green-50 text-green-700 border-green-200",
  Renewed: "bg-green-50 text-green-700 border-green-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  "On the Way": "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Requested: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Pickup: "bg-yellow-50 text-yellow-700 border-yellow-200",
  New: "bg-purple-50 text-purple-700 border-purple-200",
  Confirmed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Packed: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Assigned: "bg-cyan-50 text-cyan-700 border-cyan-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Blocked: "bg-red-50 text-red-700 border-red-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
  Suspended: "bg-red-50 text-red-700 border-red-200",
  Dropped: "bg-orange-50 text-orange-700 border-orange-200",
  Flagged: "bg-orange-50 text-orange-700 border-orange-200",
  Returned: "bg-orange-50 text-orange-700 border-orange-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
  "Out for Delivery": "bg-teal-50 text-teal-700 border-teal-200",
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Low: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function StatusBadge({ status, size = "sm" }: Props) {
  const cls = statusMap[status] ?? "bg-gray-50 text-gray-600 border-gray-200";
  return (
    <span className={`inline-flex items-center border rounded-full font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"} ${cls}`}>
      {status}
    </span>
  );
}
