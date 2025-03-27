
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface SimpleToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const SimpleToast = ({ message, type, onClose }: SimpleToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-lg animate-slideIn ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-white/20" aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
};

export const useSimpleToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};
