import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { type BriefData } from '../lib/validation';
import { briefSchema } from '../lib/validation';
import { sendToTelegram, generateMarkdownPrompt } from '../lib/telegram';
import { downloadFile, textFieldsForProgress, arrayFieldsForProgress } from '../lib/utils';
import { type ToastType } from '../components/Toast';

const STORAGE_KEY = 'brief-web-v1';

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

  const { watch, setValue, reset, getValues } = form;
  const watched = watch();

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

  // Guardar en localStorage al cambiar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
    } catch (err) {
      if (import.meta.env.DEV) console.error('Error al guardar brief en localStorage:', err);
    }
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

  const onSend = async () => {
    const data = getValues();
    const result = await briefSchema.safeParseAsync(data);
    if (!result.success) {
      addToast('Completa los campos obligatorios antes de enviar.', 'error');
      return;
    }

    setSending(true);
    try {
      const ok = await sendToTelegram(result.data);
      if (!ok) {
        addToast('Error al enviar. Intenta de nuevo.', 'error');
        setSending(false);
        return;
      }

      const mdContent = generateMarkdownPrompt(result.data);
      const negocio = (result.data.empresa || result.data.nombre || 'brief').toString().toLowerCase().replace(/\s+/g, '-');
      downloadFile(mdContent, `prompt-${negocio}.md`, 'text/markdown;charset=utf-8');

      addToast('Brief enviado correctamente. Archivo .md descargado.', 'success');
    } catch {
      addToast('Error al enviar. Intenta de nuevo.', 'error');
    } finally {
      setSending(false);
    }
  };

  return { sending, progress, onClear, onExport, onPrint, onSend };
}
