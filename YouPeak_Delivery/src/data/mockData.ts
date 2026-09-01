export type DeliveryStatus =
  | "assigned"
  | "accepted"
  | "navigating_pickup"
  | "arrived_pickup"
  | "pickup_verified"
  | "picked_up"
  | "out_for_delivery"
  | "arrived_customer"
  | "otp_verified"
  | "proof_submitted"
  | "delivered"
  | "failed"
  | "cancelled";

export interface Delivery {
  id: string;
  orderId: string;
  status: DeliveryStatus;
  vendor: {
    name: string;
    address: string;
    phone: string;
    distance: string;
    eta: string;
  };
  customer: {
    name: string;
    address: string;
    phone: string;
    instructions: string;
    distance: string;
    eta: string;
  };
  packages: number;
  amount: number;
  paymentMethod: "Online" | "COD";
  paymentStatus: "Paid" | "Pending";
  scheduledTime: string;
  earning: number;
  area: string;
}

export interface Transaction {
  id: string;
  type: "delivery" | "incentive" | "bonus" | "tip" | "adjustment";
  orderId: string;
  date: string;
  amount: number;
  status: "credited" | "pending" | "debited";
}

export interface Payout {
  id: string;
  date: string;
  amount: number;
  method: "Bank" | "UPI";
  status: "Paid" | "Processing" | "Failed";
  txnId: string;
}

export interface Notification {
  id: string;
  type: "delivery" | "earning" | "system" | "incentive";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface SupportTicket {
  id: string;
  category: string;
  subject: string;
  status: "Open" | "Resolved" | "Pending";
  priority: "High" | "Medium" | "Low";
  createdAt: string;
  messages: { sender: "driver" | "support"; text: string; time: string }[];
}

export const mockDriver = {
  id: "DRV-4892",
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  email: "rajesh.kumar@email.com",
  rating: 4.8,
  totalDeliveries: 1248,
  joinDate: "Jan 2024",
  isOnline: true,
  avatar: null,
  vehicle: {
    type: "Motorcycle",
    number: "TN 01 AB 1234",
    model: "Honda Activa 6G",
  },
  bank: {
    accountNumber: "****3456",
    holder: "Rajesh Kumar",
    bank: "HDFC Bank",
    ifsc: "HDFC0001234",
    upi: "rajesh@upi",
  },
  documents: [
    { type: "Government ID", status: "verified", expiry: "Dec 2028" },
    { type: "Driving Licence", status: "verified", expiry: "Mar 2026" },
    { type: "Vehicle RC", status: "verified", expiry: "Nov 2027" },
    { type: "Insurance", status: "expiring", expiry: "Sep 2026" },
  ],
};

export const mockDeliveries: Delivery[] = [
  {
    id: "DEL-001",
    orderId: "ORD-102938",
    status: "out_for_delivery",
    vendor: {
      name: "YouPeak Store",
      address: "12, Market Street, Anna Nagar, Chennai - 600017",
      phone: "+91 98765 00001",
      distance: "1.2 km",
      eta: "5 min",
    },
    customer: {
      name: "Arun Kumar",
      address: "21, Park Road, T. Nagar, Chennai - 600017",
      phone: "+91 98765 11111",
      instructions: "Call before arrival. Ring bell twice.",
      distance: "2.4 km",
      eta: "12 min",
    },
    packages: 2,
    amount: 2499,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    scheduledTime: "Now",
    earning: 85,
    area: "T. Nagar",
  },
  {
    id: "DEL-002",
    orderId: "ORD-102937",
    status: "assigned",
    vendor: {
      name: "FreshBasket",
      address: "8, Gandhi Road, Adyar, Chennai - 600020",
      phone: "+91 98765 00002",
      distance: "0.8 km",
      eta: "3 min",
    },
    customer: {
      name: "Priya Sharma",
      address: "44, Beach Road, Adyar, Chennai - 600020",
      phone: "+91 98765 22222",
      instructions: "Leave at door if not home.",
      distance: "3.1 km",
      eta: "18 min",
    },
    packages: 1,
    amount: 850,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    scheduledTime: "2:30 PM",
    earning: 70,
    area: "Adyar",
  },
  {
    id: "DEL-003",
    orderId: "ORD-102936",
    status: "delivered",
    vendor: {
      name: "QuickMart",
      address: "5, Mount Road, Guindy, Chennai - 600032",
      phone: "+91 98765 00003",
      distance: "2.1 km",
      eta: "8 min",
    },
    customer: {
      name: "Vikram Reddy",
      address: "90, 1st Cross, Guindy, Chennai - 600032",
      phone: "+91 98765 33333",
      instructions: "",
      distance: "2.7 km",
      eta: "15 min",
    },
    packages: 3,
    amount: 1240,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    scheduledTime: "12:00 PM",
    earning: 65,
    area: "Guindy",
  },
  {
    id: "DEL-004",
    orderId: "ORD-102935",
    status: "delivered",
    vendor: {
      name: "YouPeak Store",
      address: "12, Market Street, Anna Nagar, Chennai - 600017",
      phone: "+91 98765 00001",
      distance: "1.0 km",
      eta: "4 min",
    },
    customer: {
      name: "Sneha Nair",
      address: "15, Lake View, Velachery, Chennai - 600042",
      phone: "+91 98765 44444",
      instructions: "Fragile items.",
      distance: "3.6 km",
      eta: "20 min",
    },
    packages: 2,
    amount: 3200,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    scheduledTime: "10:30 AM",
    earning: 75,
    area: "Velachery",
  },
  {
    id: "DEL-005",
    orderId: "ORD-102934",
    status: "failed",
    vendor: {
      name: "FreshBasket",
      address: "8, Gandhi Road, Adyar, Chennai - 600020",
      phone: "+91 98765 00002",
      distance: "0.8 km",
      eta: "3 min",
    },
    customer: {
      name: "Ravi Menon",
      address: "32, Lotus Street, Mylapore, Chennai - 600004",
      phone: "+91 98765 55555",
      instructions: "",
      distance: "4.2 km",
      eta: "22 min",
    },
    packages: 1,
    amount: 560,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    scheduledTime: "9:00 AM",
    earning: 0,
    area: "Mylapore",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    type: "delivery",
    orderId: "ORD-102938",
    date: "27 Aug 2026, 8:42 PM",
    amount: 85,
    status: "credited",
  },
  {
    id: "TXN-002",
    type: "delivery",
    orderId: "ORD-102937",
    date: "27 Aug 2026, 7:15 PM",
    amount: 70,
    status: "credited",
  },
  {
    id: "TXN-003",
    type: "incentive",
    orderId: "-",
    date: "27 Aug 2026, 6:00 PM",
    amount: 200,
    status: "credited",
  },
  {
    id: "TXN-004",
    type: "delivery",
    orderId: "ORD-102936",
    date: "27 Aug 2026, 5:25 PM",
    amount: 65,
    status: "credited",
  },
  {
    id: "TXN-005",
    type: "bonus",
    orderId: "-",
    date: "26 Aug 2026, 10:00 PM",
    amount: 500,
    status: "credited",
  },
  {
    id: "TXN-006",
    type: "delivery",
    orderId: "ORD-102935",
    date: "26 Aug 2026, 8:10 PM",
    amount: 75,
    status: "credited",
  },
  {
    id: "TXN-007",
    type: "adjustment",
    orderId: "-",
    date: "25 Aug 2026, 9:00 AM",
    amount: -50,
    status: "debited",
  },
];

export const mockPayouts: Payout[] = [
  {
    id: "PAY-001",
    date: "20 Aug 2026",
    amount: 6240,
    method: "UPI",
    status: "Paid",
    txnId: "PAYOUT-10023",
  },
  {
    id: "PAY-002",
    date: "13 Aug 2026",
    amount: 5800,
    method: "Bank",
    status: "Paid",
    txnId: "PAYOUT-10018",
  },
  {
    id: "PAY-003",
    date: "06 Aug 2026",
    amount: 7120,
    method: "UPI",
    status: "Paid",
    txnId: "PAYOUT-10012",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "N001",
    type: "delivery",
    title: "New Delivery Assigned",
    message:
      "Order #ORD-102939 has been assigned to you. Pickup from YouPeak Store.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "N002",
    type: "incentive",
    title: "Incentive Achieved!",
    message:
      "You've completed 10 deliveries today. Peak hour bonus of ₹150 credited!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "N003",
    type: "earning",
    title: "Payout Processed",
    message:
      "₹6,240 has been transferred to your UPI. Expected by 30 Aug 2026.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "N004",
    type: "system",
    title: "Document Expiring Soon",
    message:
      "Your Insurance document expires on 30 Sep 2026. Please update it.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "N005",
    type: "delivery",
    title: "Delivery Updated",
    message: "Order #ORD-102935 status updated by admin.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "N006",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on 28 Aug 2026 from 2 AM to 4 AM.",
    time: "2 days ago",
    read: true,
  },
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "TKT-0091",
    category: "Payment Issue",
    subject: "Payout not received",
    status: "Open",
    priority: "High",
    createdAt: "27 Aug 2026",
    messages: [
      {
        sender: "driver",
        text: "My payout for last week hasn't been credited yet. It's been 3 days.",
        time: "27 Aug, 2:30 PM",
      },
      {
        sender: "support",
        text: "Hello Rajesh! We've raised this with our payments team. Please allow 24-48 hours.",
        time: "27 Aug, 3:00 PM",
      },
    ],
  },
  {
    id: "TKT-0088",
    category: "Customer Issue",
    subject: "Customer not answering",
    status: "Resolved",
    priority: "Medium",
    createdAt: "25 Aug 2026",
    messages: [
      {
        sender: "driver",
        text: "Customer not picking up calls for order #ORD-102920.",
        time: "25 Aug, 4:15 PM",
      },
      {
        sender: "support",
        text: "We've notified the customer. If no response in 10 min, you can mark as failed delivery.",
        time: "25 Aug, 4:20 PM",
      },
      {
        sender: "driver",
        text: "Customer called back and I delivered successfully.",
        time: "25 Aug, 4:45 PM",
      },
    ],
  },
];

export const mockEarningsChart = [
  { day: "Mon", amount: 820 },
  { day: "Tue", amount: 1240 },
  { day: "Wed", amount: 950 },
  { day: "Thu", amount: 1800 },
  { day: "Fri", amount: 2100 },
  { day: "Sat", amount: 2800 },
  { day: "Sun", amount: 1240 },
];

export const mockIncentives = [
  {
    id: "INC-001",
    title: "Daily Delivery Target",
    description: "Complete 15 deliveries today",
    progress: 12,
    target: 15,
    reward: "₹300",
    expiry: "Today 11:59 PM",
    status: "active",
    type: "daily",
  },
  {
    id: "INC-002",
    title: "Weekend Bonus",
    description: "Complete 20 deliveries this weekend",
    progress: 12,
    target: 20,
    reward: "₹500",
    expiry: "29 Aug 2026",
    status: "active",
    type: "special",
  },
  {
    id: "INC-003",
    title: "Peak Hour Bonus",
    description: "Extra earnings during peak hours (12-2 PM, 7-9 PM)",
    progress: 4,
    target: 6,
    reward: "₹20 per delivery",
    expiry: "Today",
    status: "active",
    type: "peak",
  },
  {
    id: "INC-004",
    title: "Distance Bonus",
    description: "Earn more on deliveries over 5 km",
    progress: 3,
    target: 5,
    reward: "₹50 per delivery",
    expiry: "31 Aug 2026",
    status: "active",
    type: "distance",
  },
  {
    id: "INC-005",
    title: "Festival Bonus",
    description: "Special festival delivery bonus",
    progress: 8,
    target: 10,
    reward: "₹400",
    expiry: "01 Sep 2026",
    status: "active",
    type: "special",
  },
];

export const newDeliveryRequest = {
  orderId: "ORD-102939",
  vendor: "YouPeak Store",
  customer: "Customer Location",
  pickupDistance: "1.4 km",
  deliveryDistance: "4.2 km",
  totalDistance: "5.6 km",
  packages: 3,
  amount: 1850,
  paymentMethod: "Online" as const,
  estimatedEarning: 85,
  eta: "18 min",
  timeoutSeconds: 20,
};
