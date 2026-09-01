export const seller = {
  name: "Rajesh Kumar",
  email: "rajesh@techworldstore.com",
  phone: "+91 98765 43210",
  avatar: "RK",
  store: "Tech World Store",
  status: "Online",
};

export const kpiData = {
  totalSales: { value: "₹1,24,580", change: "+18.6%", trend: "up", label: "vs last month" },
  orders: { value: "1,248", change: "+12.4%", trend: "up", label: "vs yesterday" },
  products: { value: "486", change: "", trend: "neutral", label: "Active Products" },
  customers: { value: "3,842", change: "+9.2%", trend: "up", label: "vs last month" },
  pendingOrders: { value: "42", change: "", trend: "warning", label: "Need Action" },
  availableBalance: { value: "₹82,450", change: "", trend: "neutral", label: "Available to Payout" },
};

export const salesChartData = [
  { date: "01 Aug", revenue: 40000, orders: 180 },
  { date: "07 Aug", revenue: 72000, orders: 320 },
  { date: "14 Aug", revenue: 58000, orders: 260 },
  { date: "21 Aug", revenue: 124580, orders: 448 },
  { date: "28 Aug", revenue: 89000, orders: 390 },
];

export const orderStatusData = [
  { name: "New", value: 56, color: "#3B82F6" },
  { name: "Processing", value: 142, color: "#F59E0B" },
  { name: "Packed", value: 208, color: "#8B5CF6" },
  { name: "Shipped", value: 420, color: "#06B6D4" },
  { name: "Delivered", value: 368, color: "#16A34A" },
  { name: "Cancelled", value: 42, color: "#EF4444" },
  { name: "Returned", value: 12, color: "#F97316" },
];

export const topProducts = [
  { id: 1, name: "Men's Denim Jacket", sku: "FM-DJ-101", unitsSold: 268, revenue: "₹68,240", stock: "In Stock", rating: 4.5 },
  { id: 2, name: "Women's Floral Dress", sku: "FM-WD-205", unitsSold: 184, revenue: "₹56,780", stock: "Low Stock", rating: 4.5 },
  { id: 3, name: "Casual Sneakers", sku: "SH-SN-2210", unitsSold: 156, revenue: "₹42,560", stock: "In Stock", rating: 4.7 },
  { id: 4, name: "Leather Wallet", sku: "AC-LW-221", unitsSold: 132, revenue: "₹18,900", stock: "In Stock", rating: 4.4 },
];

export const recentOrders = [
  { id: "ORD-102938", customer: "Ramesh Kumar", items: 2, amount: "₹3,450", status: "Processing", date: "28 Aug 2026" },
  { id: "ORD-102937", customer: "Priya Sharma", items: 1, amount: "₹2,999", status: "Packed", date: "28 Aug 2026" },
  { id: "ORD-102936", customer: "Karthik R", items: 3, amount: "₹1,799", status: "Shipped", date: "27 Aug 2026" },
  { id: "ORD-102935", customer: "Anitha V", items: 4, amount: "₹5,600", status: "Delivered", date: "27 Aug 2026" },
];

export const orders = [
  { id: "ORD-102938", customer: "Ramesh Kumar", customerEmail: "ramesh@gmail.com", items: 2, date: "28 Aug 2026", amount: "₹3,450", payment: "Paid", status: "Processing", delivery: "Standard" },
  { id: "ORD-102937", customer: "Priya Sharma", customerEmail: "priya@gmail.com", items: 1, date: "28 Aug 2026", amount: "₹2,999", payment: "Paid", status: "Packed", delivery: "Express" },
  { id: "ORD-102936", customer: "Karthik R", customerEmail: "karthik@gmail.com", items: 3, date: "27 Aug 2026", amount: "₹1,799", payment: "COD", status: "Shipped", delivery: "Standard" },
  { id: "ORD-102935", customer: "Anitha V", customerEmail: "anitha@gmail.com", items: 4, date: "27 Aug 2026", amount: "₹5,600", payment: "Paid", status: "Delivered", delivery: "Express" },
  { id: "ORD-102934", customer: "Manoj S", customerEmail: "manoj@gmail.com", items: 1, date: "26 Aug 2026", amount: "₹1,250", payment: "Paid", status: "Ready for Pickup", delivery: "Pickup" },
  { id: "ORD-102933", customer: "Deepika Reddy", customerEmail: "deepika@gmail.com", items: 2, date: "26 Aug 2026", amount: "₹4,200", payment: "Paid", status: "Cancelled", delivery: "Standard" },
  { id: "ORD-102932", customer: "Naveen K", customerEmail: "naveen@gmail.com", items: 1, date: "25 Aug 2026", amount: "₹899", payment: "COD", status: "Returned", delivery: "Standard" },
];

export const products = [
  { id: 1, name: "Men's Cotton T-Shirt", sku: "FM-TS-100", category: "Men's Fashion", price: "₹599", stock: 120, sales: 312, rating: 4.6, status: "Active", image: "👕" },
  { id: 2, name: "Women's Kurti", sku: "FM-WK-205", category: "Women's Fashion", price: "₹1,199", stock: 68, sales: 180, rating: 4.5, status: "Active", image: "👗" },
  { id: 3, name: "Wireless Earbuds", sku: "EL-WE-330", category: "Electronics", price: "₹1,599", stock: 12, sales: 96, rating: 4.4, status: "Low Stock", image: "🎧" },
  { id: 4, name: "Leather Wallet", sku: "AC-LW-221", category: "Accessories", price: "₹799", stock: 55, sales: 132, rating: 4.6, status: "Active", image: "👛" },
  { id: 5, name: "Running Shoes", sku: "SH-RS-322", category: "Footwear", price: "₹2,299", stock: 0, sales: 88, rating: 4.3, status: "Out of Stock", image: "👟" },
  { id: 6, name: "Backpack Premium", sku: "BG-BP-101", category: "Bags", price: "₹1,999", stock: 22, sales: 44, rating: 4.2, status: "Active", image: "🎒" },
];

export const inventoryItems = [
  { id: 1, name: "Men's Cotton T-Shirt", sku: "FM-TS-100", available: 120, reserved: 12, total: 132, lowStockLimit: 20, status: "In Stock" },
  { id: 2, name: "Women's Kurti", sku: "FM-WK-205", available: 68, reserved: 4, total: 72, lowStockLimit: 15, status: "In Stock" },
  { id: 3, name: "Wireless Earbuds", sku: "EL-WE-330", available: 12, reserved: 8, total: 20, lowStockLimit: 15, status: "Low Stock" },
  { id: 4, name: "Leather Wallet", sku: "AC-LW-221", available: 55, reserved: 5, total: 60, lowStockLimit: 10, status: "In Stock" },
  { id: 5, name: "Running Shoes", sku: "SH-RS-322", available: 0, reserved: 0, total: 0, lowStockLimit: 10, status: "Out of Stock" },
  { id: 6, name: "Gaming Mouse", sku: "GM-8001", available: 15, reserved: 0, total: 15, lowStockLimit: 5, status: "In Stock" },
];

export const customers = [
  { id: 1, name: "Ramesh Kumar", email: "ramesh@gmail.com", phone: "+91 98765 43210", orders: 8, totalSpent: "₹24,560", lastOrder: "28 Aug 2026", status: "Active" },
  { id: 2, name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 87654 32109", orders: 5, totalSpent: "₹12,999", lastOrder: "28 Aug 2026", status: "Active" },
  { id: 3, name: "Karthik R", email: "karthik@gmail.com", phone: "+91 76543 21098", orders: 3, totalSpent: "₹8,450", lastOrder: "27 Aug 2026", status: "Active" },
  { id: 4, name: "Anitha V", email: "anitha@gmail.com", phone: "+91 65432 10987", orders: 12, totalSpent: "₹45,200", lastOrder: "27 Aug 2026", status: "Active" },
  { id: 5, name: "Manoj S", email: "manoj@gmail.com", phone: "+91 54321 09876", orders: 2, totalSpent: "₹3,450", lastOrder: "26 Aug 2026", status: "Inactive" },
];

export const coupons = [
  { id: 1, code: "SAVE20", discount: "20% OFF", minOrder: "₹1,000", usage: "120/500", expiry: "10 Sep 2026", status: "Active" },
  { id: 2, code: "FLAT100", discount: "₹100 OFF", minOrder: "₹699", usage: "180/300", expiry: "05 Sep 2026", status: "Active" },
  { id: 3, code: "FREESHIP", discount: "Free Shipping", minOrder: "₹999", usage: "58/200", expiry: "10 Jun 2026", status: "Active" },
  { id: 4, code: "NEWUSER15", discount: "15% OFF", minOrder: "₹250", usage: "76/250", expiry: "25 Jun 2026", status: "Expired" },
];

export const reviews = [
  { id: 1, customer: "Arun Kumar", product: "Wireless Headphones", rating: 5, review: "Excellent sound quality and very comfortable. Battery life is amazing!", date: "27 Aug 2026", status: "Published" },
  { id: 2, customer: "Priya Sharma", product: "Smart Watch Series 8", rating: 4, review: "Very good product. Battery could be better but overall great value.", date: "26 Aug 2026", status: "Published" },
  { id: 3, customer: "Rahul Verma", product: "Bluetooth Speaker", rating: 4, review: "Loud and clear sound. Value for money product.", date: "25 Aug 2026", status: "Published" },
  { id: 4, customer: "Sneha Iyer", product: "Running Shoes", rating: 3, review: "Comfortable and perfect fit. But sizing is a bit off, order one size up.", date: "24 Aug 2026", status: "Pending" },
  { id: 5, customer: "Vikram Singh", product: "Backpack Premium", rating: 5, review: "Excellent quality bag. Spacious and durable. Highly recommend!", date: "24 Aug 2026", status: "Published" },
];

export const returns = [
  { id: "RET-10001", orderId: "ORD-102915", customer: "Arun Kumar", product: "Wireless Headphones", reason: "Product not working", amount: "₹1,499", date: "27 Aug 2026", status: "Requested" },
  { id: "RET-10002", orderId: "ORD-102912", customer: "Priya Sharma", product: "Smart Watch Series 8", reason: "Received wrong item", amount: "₹2,499", date: "26 Aug 2026", status: "Approved" },
  { id: "RET-10003", orderId: "ORD-102900", customer: "Sonu Rai", product: "Running Shoes", reason: "Size issue", amount: "₹1,999", date: "25 Aug 2026", status: "Pickup" },
  { id: "RET-10004", orderId: "ORD-102895", customer: "Deepak Yadav", product: "Bluetooth Speaker", reason: "Material quality", amount: "₹799", date: "24 Aug 2026", status: "Received" },
  { id: "RET-10005", orderId: "ORD-102890", customer: "Pooja Gupta", product: "Backpack Premium", reason: "Changed mind", amount: "₹1,199", date: "23 Aug 2026", status: "Refunded" },
];

export const earningsData = [
  { month: "Apr", revenue: 68000, commission: 6800, net: 61200 },
  { month: "May", revenue: 82000, commission: 8200, net: 73800 },
  { month: "Jun", revenue: 74000, commission: 7400, net: 66600 },
  { month: "Jul", revenue: 95000, commission: 9500, net: 85500 },
  { month: "Aug", revenue: 124580, commission: 12458, net: 112122 },
];

export const payouts = [
  { id: "PAY-10012", date: "20 Aug 2026", amount: "₹78,450", method: "Bank Transfer", status: "Paid", txnId: "TXN1234567890" },
  { id: "PAY-10011", date: "10 Aug 2026", amount: "₹48,300", method: "UPI", status: "Paid", txnId: "TXN1234567889" },
  { id: "PAY-10010", date: "31 Jul 2026", amount: "₹58,900", method: "Bank Transfer", status: "Paid", txnId: "TXN1234567888" },
  { id: "PAY-10009", date: "15 Jul 2026", amount: "₹32,400", method: "Bank Transfer", status: "Paid", txnId: "TXN1234567887" },
  { id: "PAY-10008", date: "22 Jun 2026", amount: "₹51,200", method: "Bank Transfer", status: "Paid", txnId: "TXN1234567886" },
];

export const analyticsData = [
  { date: "1 Aug", revenue: 18000, orders: 82 },
  { date: "8 Aug", revenue: 32000, orders: 148 },
  { date: "15 Aug", revenue: 28000, orders: 122 },
  { date: "22 Aug", revenue: 41000, orders: 188 },
  { date: "29 Aug", revenue: 38000, orders: 164 },
];

export const salesByCategory = [
  { name: "Electronics", value: 38, color: "#16A34A" },
  { name: "Fashion", value: 28, color: "#3B82F6" },
  { name: "Home & Kitchen", value: 18, color: "#F59E0B" },
  { name: "Beauty", value: 10, color: "#8B5CF6" },
  { name: "Sports", value: 4, color: "#06B6D4" },
  { name: "Others", value: 2, color: "#E5E9E8" },
];

export const tickets = [
  { id: "TKT-10298", subject: "Order not picked up", priority: "High", orderId: "ORD-102938", status: "Open", updated: "27 Aug 2026" },
  { id: "TKT-10245", subject: "Payment not received", priority: "High", orderId: "ORD-102170", status: "In Progress", updated: "25 Aug 2026" },
  { id: "TKT-10210", subject: "Product approval delay", priority: "Medium", orderId: "", status: "Resolved", updated: "24 Aug 2026" },
  { id: "TKT-10208", subject: "Payout status query", priority: "Medium", orderId: "", status: "Closed", updated: "23 Aug 2026" },
];

export const reports = [
  { id: 1, name: "Sales Report", description: "Detailed sales and revenue report", icon: "TrendingUp" },
  { id: 2, name: "Order Report", description: "Order status and fulfilment summary", icon: "ShoppingCart" },
  { id: 3, name: "Product Report", description: "Product performance report and activity", icon: "Package" },
  { id: 4, name: "Inventory Report", description: "Inventory levels and summary report", icon: "Warehouse" },
  { id: 5, name: "Customer Report", description: "Customer insights and activity summary", icon: "Users" },
  { id: 6, name: "Commission Report", description: "Platform commission breakdown", icon: "Percent" },
  { id: 7, name: "Payout Report", description: "Payout history and transaction report", icon: "Wallet" },
  { id: 8, name: "Return Report", description: "Returns and refund report summary", icon: "RotateCcw" },
  { id: 9, name: "Tax Report", description: "Tax collected and summary report", icon: "FileText" },
];

export const recentExports = [
  { name: "Sales Report", dateRange: "01 Aug - 27 Aug 2026", format: "Excel", generatedDate: "27 Aug 2026, 10:46 AM", generatedBy: "Rajesh Kumar" },
  { name: "Order Report", dateRange: "09 Aug - 27 Aug 2026", format: "PDF", generatedDate: "27 Aug 2026, 10:45 AM", generatedBy: "Rajesh Kumar" },
  { name: "Product Report", dateRange: "09 Aug - 27 Aug 2026", format: "CSV", generatedDate: "27 Aug 2026, 10:36 AM", generatedBy: "Rajesh Kumar" },
];
