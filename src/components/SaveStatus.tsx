import { Check, Loader2 } from 'lucide-react';

type SaveState = 'idle' | 'saving' | 'saved';

interface SaveStatusProps {
  state: SaveState;
}

export function SaveStatus({ state }: SaveStatusProps) {
  if (state === 'idle') return null;

  return (
    <div className={`save-status ${state}`}>
      {state === 'saving' ? (
        <>
          <Loader2 size={14} className="spin" />
          <span>Guardando...</span>
        </>
      ) : (
        <>
          <Check size={14} />
          <span>Cambios guardados</span>
        </>
      )}
    </div>
  );
}
