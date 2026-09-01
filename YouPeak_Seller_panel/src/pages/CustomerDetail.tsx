import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { customers, orders } from "@/data/mockData";
import { Card, Badge, Avatar, Button } from "@/components/ui";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === Number(id)) || customers[0];
  const customerOrders = orders.slice(0, 3);

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/customers")} className="p-1.5 rounded-lg text-[#64748B] hover:text-[#10252E] hover:bg-white border border-[#E5E9E8] transition-colors">
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-lg font-semibold text-[#10252E]">Customer Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile */}
        <Card className="flex flex-col items-center text-center gap-3">
          <Avatar name={customer.name} size="lg" />
          <div>
            <p className="text-base font-semibold text-[#10252E]">{customer.name}</p>
            <p className="text-xs text-[#64748B]">{customer.email}</p>
            <p className="text-xs text-[#64748B]">{customer.phone}</p>
          </div>
          <Badge label={customer.status} />
          <div className="w-full pt-3 border-t border-[#E5E9E8] grid grid-cols-2 gap-3 text-center">
            <div><p className="text-lg font-bold text-[#10252E]">{customer.orders}</p><p className="text-[10px] text-[#64748B]">Orders</p></div>
            <div><p className="text-lg font-bold text-[#10252E]">{customer.totalSpent}</p><p className="text-[10px] text-[#64748B]">Total Spent</p></div>
          </div>
        </Card>

        {/* Order History */}
        <div className="lg:col-span-2 space-y-4">
          <Card padding={false}>
            <div className="px-5 py-3.5 border-b border-[#E5E9E8]">
              <h3 className="text-sm font-semibold text-[#10252E]">Order History</h3>
            </div>
            <div className="divide-y divide-[#E5E9E8]">
              {customerOrders.map((o) => (
                <div key={o.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#F5F7F6] cursor-pointer"
                  onClick={() => navigate(`/orders/${o.id}`)}>
                  <div>
                    <p className="text-xs font-medium text-[#16A34A]">{o.id}</p>
                    <p className="text-[10px] text-[#64748B]">{o.date} · {o.items} item(s)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#10252E]">{o.amount}</span>
                    <Badge label={o.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-[#10252E] mb-3">Recent Returns</h3>
              <p className="text-xs text-[#64748B]">No returns from this customer.</p>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-[#10252E] mb-3">Support History</h3>
              <p className="text-xs text-[#64748B]">No support tickets from this customer.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
