import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="confirm-dialog">
        <button className="confirm-dialog-close" onClick={onCancel} aria-label="Cerrar">
          <X size={16} />
        </button>
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={variant} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
