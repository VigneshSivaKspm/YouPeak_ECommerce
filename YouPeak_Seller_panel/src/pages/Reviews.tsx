import { useState } from "react";
import { MessageSquare, Flag, Eye } from "lucide-react";
import { reviews } from "@/data/mockData";
import { PageHeader, SearchInput, Badge, Stars, Button, ActionMenu, Pagination, Card, Modal, Textarea, useToast } from "@/components/ui";

export default function Reviews() {
  const [search, setSearch] = useState("");
  const [replyTo, setReplyTo] = useState<typeof reviews[0] | null>(null);
  const [reply, setReply] = useState("");
  const [page, setPage] = useState(1);
  const { show, ToastEl } = useToast();

  const filtered = reviews.filter((r) =>
    !search || r.customer.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase())
  );

  const ratingDist = [
    { stars: 5, count: 1912, pct: 68 },
    { stars: 4, count: 562, pct: 20 },
    { stars: 3, count: 211, pct: 7 },
    { stars: 2, count: 85, pct: 3 },
    { stars: 1, count: 72, pct: 2 },
  ];

  return (
    <div className="space-y-4">
      {ToastEl}

      <Modal open={!!replyTo} onClose={() => setReplyTo(null)} title="Reply to Review" width="max-w-lg">
        {replyTo && (
          <div className="space-y-4">
            <div className="p-3 bg-[#F5F7F6] rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Stars rating={replyTo.rating} />
                <span className="text-xs font-medium text-[#10252E]">{replyTo.customer}</span>
              </div>
              <p className="text-xs text-[#64748B]">{replyTo.review}</p>
            </div>
            <Textarea label="Your Reply" value={reply} onChange={(e) => setReply(e.target.value)} rows={4} placeholder="Write your response to this review..." />
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" size="sm" onClick={() => setReplyTo(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => { show("Reply submitted!", "success"); setReplyTo(null); setReply(""); }}>Submit Reply</Button>
            </div>
          </div>
        )}
      </Modal>

      <PageHeader title="Reviews" subtitle="Manage customer reviews for your products" />

      {/* Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-[#64748B] font-medium">Overall Rating</p>
          <p className="text-5xl font-bold text-[#10252E]">4.7</p>
          <Stars rating={5} />
          <p className="text-xs text-[#64748B]">+112.6% vs last 30 days</p>
        </Card>
        <Card>
          <p className="text-xs text-[#64748B] font-medium mb-1">Total Reviews</p>
          <p className="text-4xl font-bold text-[#10252E]">2,842</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-[#10252E] mb-3">Rating Distribution</p>
          <div className="space-y-1.5">
            {ratingDist.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="text-xs text-[#64748B] w-3">{r.stars}</span>
                <div className="flex-1 h-1.5 bg-[#F5F7F6] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-[10px] text-[#64748B] w-10">{r.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <div className="px-4 py-3 flex flex-wrap items-center gap-2 border-b border-[#E5E9E8]">
          <SearchInput value={search} onChange={setSearch} placeholder="Search reviews..." />
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
            <option>Product: All Products</option>
          </select>
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
            <option>Rating: All</option><option>5 Stars</option><option>4 Stars</option><option>3 Stars</option>
          </select>
          <select className="h-8 px-2 text-xs border border-[#E5E9E8] rounded-md bg-white text-[#64748B] focus:outline-none">
            <option>All Status</option><option>Published</option><option>Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E5E9E8]">
              {["Customer", "Product", "Rating", "Review", "Date", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[#64748B] whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F5F7F6] transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-[#10252E] whitespace-nowrap">{r.customer}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B] max-w-[120px] truncate">{r.product}</td>
                  <td className="px-4 py-3"><Stars rating={r.rating} /></td>
                  <td className="px-4 py-3 text-xs text-[#64748B] max-w-[200px]">
                    <p className="truncate">{r.review}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3"><Badge label={r.status} /></td>
                  <td className="px-4 py-3">
                    <ActionMenu items={[
                      { label: "View", icon: <Eye size={13} />, onClick: () => {} },
                      { label: "Reply", icon: <MessageSquare size={13} />, onClick: () => setReplyTo(r) },
                      { label: "Report", icon: <Flag size={13} />, onClick: () => show("Review reported", "info") },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#E5E9E8]">
          <Pagination current={page} total={2842} perPage={10} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
