import { useEffect, useState } from "react";
import { X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastState extends ToastProps {
  id: number;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: ToastType = "info", action?: { label: string; onClick: () => void }) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, action }]);
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toast: toasts[0], showToast, hideToast };
};

const CustomToast = ({ message, type = "info", duration = 5000, action, onClose }: ToastProps & { onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div
      className={`fixed right-4 top-4 z-50 flex min-w-[300px] items-center justify-between rounded-lg p-4 shadow-lg ${getToastStyles(
        type
      )}`}
    >
      <div className="mr-4 flex-grow">{message}</div>
      {action && (
        <button
          onClick={action.onClick}
          className="mr-2 rounded-md bg-white bg-opacity-20 px-3 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onClose}
        className="rounded-full p-1 hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export { CustomToast, useToast };
