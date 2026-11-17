import { useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <Icon size={16} />
            <span>{toast.message}</span>
            <button className="toast-close" onClick={() => onRemove(toast.id)}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
