import type { ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({ isOpen, onClose, title, children, className = "" }: Props) {
  if (!isOpen) return null;

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className={`bottom-sheet-content ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--gm-border)" }}>
            <h3 className="text-base font-semibold" style={{ color: "var(--gm-text)" }}>{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
