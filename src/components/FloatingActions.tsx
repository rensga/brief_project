import { useState } from 'react';
import { Download, Printer, Trash2, Menu, X, Send } from 'lucide-react';

export function FloatingActions({ onPrint, onExport, onClear, onSend, sending }: {
  onPrint: () => void;
  onExport: () => void;
  onClear: () => void;
  onSend: () => void;
  sending: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fab-container ${open ? 'open' : ''}`}>
      {open && <div className="fab-overlay" onClick={() => setOpen(false)} />}
      <div className="fab-menu">
        <button className="fab-item fab-item-success" onClick={() => { onSend(); setOpen(false); }} title="Enviar brief" disabled={sending}>
          <Send size={18} />
          <span>{sending ? 'Enviando...' : 'Enviar'}</span>
        </button>
        <button className="fab-item" onClick={() => { onPrint(); setOpen(false); }} title="Imprimir / Guardar PDF">
          <Printer size={18} />
          <span>Imprimir</span>
        </button>
        <button className="fab-item" onClick={() => { onExport(); setOpen(false); }} title="Exportar respuestas">
          <Download size={18} />
          <span>Exportar</span>
        </button>
        <button className="fab-item fab-item-danger" onClick={() => { onClear(); setOpen(false); }} title="Limpiar">
          <Trash2 size={18} />
          <span>Limpiar</span>
        </button>
      </div>
      <button className="fab-main" onClick={() => setOpen(!open)} aria-label="Acciones">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  );
}
