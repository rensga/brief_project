import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalOverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalOverlay({ open, onClose, children }: ModalOverlayProps) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-backdrop" />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
