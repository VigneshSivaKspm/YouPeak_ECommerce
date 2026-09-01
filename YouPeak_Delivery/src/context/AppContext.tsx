import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mockDriver, mockDeliveries, mockNotifications, type DeliveryStatus, type Delivery } from "@/data/mockData";

interface AppContextType {
  driver: typeof mockDriver;
  isOnline: boolean;
  toggleOnline: () => void;
  deliveries: typeof mockDeliveries;
  currentDelivery: Delivery | null;
  updateDeliveryStatus: (id: string, status: DeliveryStatus) => void;
  notifications: typeof mockNotifications;
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  showNewRequest: boolean;
  setShowNewRequest: (v: boolean) => void;
  acceptRequest: () => void;
  declineRequest: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNewRequest, setShowNewRequest] = useState(false);

  const driver = mockDriver;

  const toggleOnline = useCallback(() => setIsOnline((v) => !v), []);

  const currentDelivery = deliveries.find(
    (d) => !["delivered", "failed", "cancelled"].includes(d.status)
  ) ?? null;

  const updateDeliveryStatus = useCallback((id: string, status: DeliveryStatus) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const acceptRequest = useCallback(() => {
    setShowNewRequest(false);
  }, []);

  const declineRequest = useCallback(() => {
    setShowNewRequest(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        driver,
        isOnline,
        toggleOnline,
        deliveries,
        currentDelivery,
        updateDeliveryStatus,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllRead,
        showNewRequest,
        setShowNewRequest,
        acceptRequest,
        declineRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
