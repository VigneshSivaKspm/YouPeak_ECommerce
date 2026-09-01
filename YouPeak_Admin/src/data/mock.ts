export const revenueData = [
  { name: "1 Aug", revenue: 18000, orders: 120, commission: 1800, earnings: 16200 },
  { name: "8 Aug", revenue: 22000, orders: 145, commission: 2200, earnings: 19800 },
  { name: "15 Aug", revenue: 19500, orders: 130, commission: 1950, earnings: 17550 },
  { name: "22 Aug", revenue: 28000, orders: 185, commission: 2800, earnings: 25200 },
  { name: "29 Aug", revenue: 24820, orders: 162, commission: 2482, earnings: 22338 },
  { name: "31 Aug", revenue: 26000, orders: 172, commission: 2600, earnings: 23400 },
];

export const orderStatusData = [
  { name: "New", value: 842, color: "#3B82F6" },
  { name: "Confirmed", value: 1264, color: "#8B5CF6" },
  { name: "Processing", value: 1384, color: "#F59E0B" },
  { name: "Packed", value: 2840, color: "#06B6D4" },
  { name: "Out for Delivery", value: 1154, color: "#10B981" },
  { name: "Delivered", value: 4215, color: "#16A34A" },
  { name: "Cancelled", value: 879, color: "#EF4444" },
  { name: "Returned", value: 281, color: "#F97316" },
];

export const orders = [
  { id: "ORD-102938", customer: "Arun Kumar", vendor: "Tech Store", items: 3, date: "27 Aug 2026", amount: "₹4,299", payment: "Paid", status: "Processing", delivery: "Assigned" },
  { id: "ORD-102937", customer: "Priya Sharma", vendor: "Fashion Hub", items: 3, date: "27 Aug 2026", amount: "₹1,799", payment: "Paid", status: "Packed", delivery: "Pending" },
  { id: "ORD-102936", customer: "Suresh R", vendor: "Home Needs", items: 8, date: "27 Aug 2026", amount: "₹5,799", payment: "Paid", status: "Confirmed", delivery: "Pending" },
  { id: "ORD-102935", customer: "Ravi Teja", vendor: "Sports Hub", items: 2, date: "27 Aug 2026", amount: "₹2,419", payment: "Paid", status: "Dropped", delivery: "Picked Up" },
  { id: "ORD-102934", customer: "Arun Kumar", vendor: "Sports Hub", items: 1, date: "26 Aug 2026", amount: "₹3,699", payment: "Paid", status: "Delivered", delivery: "Delivered" },
  { id: "ORD-102933", customer: "Anjali Verma", vendor: "Sports Hub", items: 4, date: "26 Aug 2026", amount: "₹6,299", payment: "Paid", status: "Delivered", delivery: "Delivered" },
  { id: "ORD-102932", customer: "Neha Iyer", vendor: "Book Store", items: 1, date: "26 Aug 2026", amount: "₹1,299", payment: "Paid", status: "Cancelled", delivery: "" },
  { id: "ORD-102931", customer: "Vikram S", vendor: "Electro Mart", items: 2, date: "25 Aug 2026", amount: "₹7,499", payment: "Paid", status: "Processing", delivery: "Assigned" },
  { id: "ORD-102930", customer: "Deepak N", vendor: "Home Needs", items: 5, date: "25 Aug 2026", amount: "₹2,199", payment: "Paid", status: "Confirmed", delivery: "Pending" },
];

export const products = [
  { id: "PRD-001", name: "Running Shoes Pro X", vendor: "Sports Hub", category: "Footwear", price: "₹2,199", stock: 248, status: "Active", sku: "SH-RX-001", rating: 4.5 },
  { id: "PRD-002", name: "Smartphone Case Ultra", vendor: "Tech Store", category: "Electronics", price: "₹499", stock: 892, status: "Active", sku: "TS-SC-002", rating: 4.2 },
  { id: "PRD-003", name: "Designer Handbag", vendor: "Fashion Hub", category: "Fashion", price: "₹1,799", stock: 124, status: "Active", sku: "FH-DH-003", rating: 4.7 },
  { id: "PRD-004", name: "ULD Desk Lamp", vendor: "Home Needs", category: "Home & Kitchen", price: "₹899", stock: 0, status: "Out of Stock", sku: "HN-DL-004", rating: 4.1 },
  { id: "PRD-005", name: "Wireless Headphones", vendor: "Tech Store", category: "Electronics", price: "₹1,299", stock: 56, status: "Active", sku: "TS-WH-005", rating: 4.8 },
  { id: "PRD-006", name: "Yoga Mat Premium", vendor: "Sports Hub", category: "Sports", price: "₹699", stock: 312, status: "Active", sku: "SH-YM-006", rating: 4.3 },
];

export const vendors = [
  { id: "V-001", name: "Tech Store", store: "TechStore.com", products: 1245, orders: 4892, revenue: "₹24,85,430", rating: 4.5, commission: 12, status: "Active", joined: "17 Jan 2026" },
  { id: "V-002", name: "Fashion Hub", store: "FashionHub", products: 642, orders: 3264, revenue: "₹18,42,430", rating: 4.3, commission: 13, status: "Active", joined: "19 Jan 2026" },
  { id: "V-003", name: "Home Needs", store: "HomeNeeds", products: 1325, orders: 2985, revenue: "₹9,45,230", rating: 4.2, commission: 11, status: "Active", joined: "21 Jan 2026" },
  { id: "V-004", name: "Sports Hub", store: "SportsHub", products: 924, orders: 1854, revenue: "₹14,63,230", rating: 4.4, commission: 10, status: "Active", joined: "25 Jan 2026" },
  { id: "V-005", name: "Beauty Care", store: "BeautyCare", products: 756, orders: 1352, revenue: "₹9,45,230", rating: 4.3, commission: 11, status: "Under Review", joined: "28 Jan 2026" },
  { id: "V-006", name: "Spart High", store: "SpartHigh", products: 524, orders: 1054, revenue: "₹14,63,230", rating: 4.4, commission: 13, status: "Active", joined: "25 Jun 2026" },
];

export const customers = [
  { id: "C-001", name: "Arun Kumar", email: "arun.kumar@gmail.com", phone: "+91 98765-43210", orders: 18, spent: "₹24,680", lastOrder: "27 Aug 2026", status: "Active", wallet: "₹1,240" },
  { id: "C-002", name: "Priya Sharma", email: "priya.sharma@gmail.com", phone: "+91 98234-56789", orders: 12, spent: "₹13,240", lastOrder: "27 Aug 2026", status: "Active", wallet: "₹720" },
  { id: "C-003", name: "Meera Iyer", email: "meera.iyer@gmail.com", phone: "+91 99112-34567", orders: 9, spent: "₹9,490", lastOrder: "26 Aug 2026", status: "Active", wallet: "₹320" },
  { id: "C-004", name: "Vikram Singh", email: "vikram.singh@gmail.com", phone: "+91 95678-12345", orders: 7, spent: "₹6,350", lastOrder: "25 Aug 2026", status: "Active", wallet: "₹0" },
  { id: "C-005", name: "Nisha Verma", email: "nisha.verma@gmail.com", phone: "+91 91234-56789", orders: 3, spent: "₹3,450", lastOrder: "25 Aug 2026", status: "Blocked", wallet: "₹150" },
];

export const topCategories = [
  { name: "Electronics", revenue: "₹9,45,230", pct: 85 },
  { name: "Fashion", revenue: "₹6,24,780", pct: 68 },
  { name: "Home & Kitchen", revenue: "₹5,31,640", pct: 56 },
  { name: "Beauty & Health", revenue: "₹4,12,640", pct: 42 },
  { name: "Sports & Outdoors", revenue: "₹3,98,210", pct: 37 },
];

export const financialData = [
  { name: "Jan", gross: 18000, net: 15000 },
  { name: "Feb", gross: 22000, net: 18000 },
  { name: "Mar", gross: 20000, net: 16500 },
  { name: "Apr", gross: 25000, net: 21000 },
  { name: "May", gross: 23000, net: 19200 },
  { name: "Jun", gross: 27000, net: 22500 },
  { name: "Jul", gross: 24000, net: 20000 },
  { name: "Aug", gross: 28750, net: 24820 },
];

export const revenueBreakdown = [
  { name: "Partner Payments", value: 18640, color: "#16A34A" },
  { name: "Platform Commission", value: 3843, color: "#3B82F6" },
  { name: "Partner Saving Fees", value: 1250, color: "#8B5CF6" },
  { name: "Delivery Fee", value: 890, color: "#F59E0B" },
  { name: "Adjustments", value: 197, color: "#64748B" },
];

export const payouts = [
  { vendor: "Tech Store", payoutId: "#PAY-10293", amount: "₹45,780", method: "Bank Transfer", date: "27 Aug 2026", status: "Pending" },
  { vendor: "Fashion Hub", payoutId: "#PAY-10292", amount: "₹38,240", method: "UPI", date: "27 Aug 2026", status: "Pending" },
  { vendor: "Home Needs", payoutId: "#PAY-10291", amount: "₹24,760", method: "UPI", date: "26 Aug 2026", status: "Processing" },
  { vendor: "Sports Hub", payoutId: "#PAY-10290", amount: "₹18,320", method: "Bank Transfer", date: "26 Aug 2026", status: "Processing" },
  { vendor: "Beauty Care", payoutId: "#PAY-10289", amount: "₹58,500", method: "Bank Transfer", date: "25 Aug 2026", status: "Completed" },
  { vendor: "Book Store", payoutId: "#PAY-10287", amount: "₹22,890", method: "UPI", date: "24 Aug 2026", status: "Completed" },
];

export const returns = [
  { id: "RET-10293", orderId: "ORD-102938", customer: "Arun Kumar", vendor: "Tech Store", product: "Wireless Headphones", amount: "₹1,299", status: "Requested", date: "27 Aug 2026" },
  { id: "RET-10292", orderId: "ORD-102937", customer: "Priya Sharma", vendor: "Home Needs", product: "Storage Box", amount: "₹899", status: "Pickup", date: "26 Aug 2026" },
  { id: "RET-10291", orderId: "ORD-102936", customer: "Ramesh Iyer", vendor: "Beauty Care", product: "Face Wash", amount: "₹299", status: "Renewed", date: "26 Aug 2026" },
  { id: "RET-10290", orderId: "ORD-102935", customer: "Neha Verma", vendor: "Gadget World", product: "Smart Watch", amount: "₹2,499", status: "Refunded", date: "25 Aug 2026" },
  { id: "RET-10289", orderId: "ORD-102934", customer: "Darvahing", vendor: "Sports Hub", product: "Running Shoes", amount: "₹2,199", status: "Refunded", date: "25 Aug 2026" },
  { id: "RET-10288", orderId: "ORD-102933", customer: "Anjali Hema", vendor: "Book Store", product: "Story Book Set", amount: "₹450", status: "Rejected", date: "21 Aug 2026" },
];

export const reviews = [
  { id: "REV-001", product: "Wireless Earbuds", customer: "Arun Kumar", vendor: "Tech Store", rating: 5, review: "Excellent sound quality!", images: 2, date: "27 Aug 2026", status: "Approved" },
  { id: "REV-002", product: "Face Scrub", customer: "Priya Sharma", vendor: "Beauty Care", rating: 4, review: "Good product, fast delivery", images: 0, date: "27 Aug 2026", status: "Pending" },
  { id: "REV-003", product: "Gaming Mouse", customer: "Ramesh Iyer", vendor: "Gadget World", rating: 3, review: "Not working properly", images: 3, date: "27 Aug 2026", status: "Flagged" },
  { id: "REV-004", product: "Running Shoes", customer: "Neha Singh", vendor: "Sports Hub", rating: 4, review: "Very comfortable", images: 1, date: "26 Aug 2026", status: "Approved" },
  { id: "REV-005", product: "Storage Box", customer: "Sanjay Rao", vendor: "Home Needs", rating: 2, review: "Size is small", images: 0, date: "26 Aug 2026", status: "Pending" },
];

export const campaigns = [
  { name: "WELCOME30", type: "Percentage", discount: "30%", usage: 1341, limit: 5000, expiry: "30 Sep 2026", status: "Active" },
  { name: "FESTIVE10", type: "Percentage", discount: "10%", usage: 3402, limit: 10000, expiry: "30 Sep 2026", status: "Active" },
  { name: "FLAT200", type: "Flat", discount: "₹200", usage: 892, limit: 1000, expiry: "15 Sep 2026", status: "Active" },
  { name: "FREESHIP", type: "Shipping", discount: "Free", usage: 4210, limit: "Unlimited", expiry: "30 Sep 2026", status: "Active" },
  { name: "NEWUSER5", type: "Percentage", discount: "5%", usage: 2102, limit: "Unlimited", expiry: "09 Sep 2026", status: "Active" },
];

export const salesFunnelData = [
  { name: "Visitors", value: 1245680, pct: 100 },
  { name: "Product Views", value: 423560, pct: 34 },
  { name: "Add to Cart", value: 164343, pct: 13.4 },
  { name: "Checkout", value: 82450, pct: 6.6 },
  { name: "Payment", value: 54270, pct: 4.4 },
  { name: "Completed Order", value: 48330, pct: 3.9 },
];

export const topVendors = [
  { name: "Tech Store", orders: 4892, revenue: "₹8,43,450", commission: "₹1,26,368", rating: 4.8 },
  { name: "Fashion Hub", orders: 3245, revenue: "₹6,13,300", commission: "₹91,845", rating: 4.6 },
  { name: "Home Needs", orders: 2985, revenue: "₹4,28,850", commission: "₹64,275", rating: 4.5 },
  { name: "Beauty Care", orders: 2145, revenue: "₹2,89,650", commission: "₹43,448", rating: 4.7 },
  { name: "Sports Hub", orders: 1609, revenue: "₹2,12,430", commission: "₹31,860", rating: 4.4 },
];

export const tickets = [
  { id: "TKT-50298", customer: "Arun Kumar", subject: "Payment not received", status: "Open", priority: "High", date: "27 Aug 2026, 10:42 AM" },
  { id: "TKT-50297", customer: "Priya Sharma", subject: "Order not delivered", status: "Pending", priority: "Medium", date: "27 Aug 2026, 09:15 AM" },
  { id: "TKT-50296", customer: "Meera Iyer", subject: "Wrong product received", status: "Open", priority: "High", date: "26 Aug 2026, 05:30 PM" },
  { id: "TKT-50295", customer: "Arun Kumar", subject: "Refund status inquiry", status: "Resolved", priority: "Low", date: "26 Aug 2026, 02:10 PM" },
  { id: "TKT-50294", customer: "Vikram Singh", subject: "App login issue", status: "Open", priority: "Medium", date: "25 Aug 2026, 11:00 AM" },
];

export const approvalProducts = [
  { id: "PA-001", name: "Running Shoes", vendor: "Sports Hub", category: "Footwear", price: "₹2,199", submitted: "26 Aug 2026", status: "Pending" },
  { id: "PA-002", name: "Smartphone Case", vendor: "Gadget World", category: "Electronics", price: "₹499", submitted: "26 Aug 2026", status: "Pending" },
  { id: "PA-003", name: "Designer Handbag", vendor: "Fashion Hub", category: "Fashion", price: "₹1,799", submitted: "26 Aug 2026", status: "Pending" },
  { id: "PA-004", name: "ULD Desk Lamp", vendor: "Home Needs", category: "Home", price: "₹899", submitted: "26 Aug 2026", status: "Approved" },
  { id: "PA-005", name: "LED Desk Lamp", vendor: "Home Needs", category: "Home", price: "₹899", submitted: "26 Aug 2026", status: "Rejected" },
];
