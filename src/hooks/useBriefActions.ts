import { useEffect, useState, useRef, useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { type BriefData } from '../lib/validation';
import { briefSchema } from '../lib/validation';
import { sendToTelegram } from '../lib/telegram';
import { downloadFile, textFieldsForProgress, arrayFieldsForProgress } from '../lib/utils';
import { type ToastType } from '../components/Toast';
import { useAdminStore } from '../stores/adminStore';

const STORAGE_KEY = 'brief-web-v1';
const SAVE_DEBOUNCE_MS = 800;
const SAVED_DISPLAY_MS = 2000;

type SaveState = 'idle' | 'saving' | 'saved';

const defaultArrayValues = {
  marca: [] as string[],
  estilo: [] as string[],
  secciones: [] as string[],
  funciones: [] as string[],
  tiene: [] as string[],
  extras: [] as string[],
};

const defaultColorValues = {
  color_principal: '#2563eb',
  color_secundario: '#7c3aed',
  color_acento: '#f59e0b',
};

export function useBriefActions(form: UseFormReturn<BriefData>, addToast: (msg: string, type: ToastType) => void) {
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { watch, setValue, reset, getValues } = form;
  const watched = watch();
  const addBrief = useAdminStore((s) => s.addBrief);

  // Restaurar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof BriefData, value as any);
        });
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al restaurar brief desde localStorage:', err);
    }
  }, [setValue]);

  // Guardar en localStorage al cambiar (con debounce y estado visual)
  useEffect(() => {
    // Limpiar timers anteriores
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);

    // Mostrar "Guardando..."
    setSaveState('saving');

    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
        // Mostrar "Guardado" después de guardar
        setSaveState('saved');
        savedTimerRef.current = setTimeout(() => {
          setSaveState('idle');
        }, SAVED_DISPLAY_MS);
      } catch (err) {
        if (import.meta.env.DEV) console.error('Error al guardar brief en localStorage:', err);
        setSaveState('idle');
      }
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, [watched]);

  // Calcular progreso
  useEffect(() => {
    let filled = 0;
    const currentValues = getValues();
    textFieldsForProgress.forEach((field) => {
      if (currentValues[field as keyof BriefData]?.toString().trim()) filled++;
    });
    arrayFieldsForProgress.forEach((field) => {
      if (currentValues[field as keyof BriefData]?.length) filled++;
    });
    const total = textFieldsForProgress.length + arrayFieldsForProgress.length;
    setProgress(Math.round((filled / total) * 100));
  }, [watched, getValues]);

  const onClear = (onConfirm: () => void) => {
    onConfirm();
    localStorage.removeItem(STORAGE_KEY);
    reset({
      ...defaultArrayValues,
      ...defaultColorValues,
    });
    addToast('Formulario limpiado.', 'info');
  };

  const onExport = () => {
    const data = getValues();
    const nombre = (data.nombre || 'cliente').toString().toLowerCase().replace(/\s+/g, '-');
    downloadFile(JSON.stringify(data, null, 2), `brief-${nombre}.json`, 'application/json');
    addToast('Respuestas exportadas correctamente.', 'success');
  };

  const onPrint = () => window.print();

  // Scroll al primer campo con error
  const scrollToFirstError = useCallback(() => {
    const firstErrorEl = document.querySelector('.field .invalid');
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus en el input
      const input = firstErrorEl.querySelector('input, textarea, select');
      if (input) {
        (input as HTMLInputElement).focus();
      }
    }
  }, []);

  const onSend = async () => {
    const data = getValues();
    const result = await briefSchema.safeParseAsync(data);
    if (!result.success) {
      addToast('Completa los campos obligatorios antes de enviar.', 'error');
      // Scroll al primer campo con error
      setTimeout(() => scrollToFirstError(), 100);
      return;
    }

    setSending(true);
    try {
      // Guardar en el admin store para que el panel pueda verlo
      addBrief(result.data);

      const ok = await sendToTelegram(result.data);

      if (ok) {
        addToast('Brief enviado correctamente a Telegram.', 'success');
      } else {
        addToast('Error al enviar el brief. Intenta de nuevo.', 'error');
      }
    } catch {
      addToast('Error al enviar el brief. Intenta de nuevo.', 'error');
    } finally {
      setSending(false);
    }
  };

  return { sending, progress, saveState, onClear, onExport, onPrint, onSend, scrollToFirstError };
}
