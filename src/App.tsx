import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sun, Moon } from 'lucide-react';

import { useThemeStore } from './stores/themeStore';
import { ThemeProvider } from './components/ThemeProvider';
import { Button } from './components/Button';
import { ProgressBar } from './components/ProgressBar';
import { ToastContainer, useToast } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';
import { FloatingActions } from './components/FloatingActions';
import { Prices } from './components/Prices';
import { briefSchema, type BriefData } from './lib/validation';
import { useBriefActions } from './hooks/useBriefActions';

import { ClientSection } from './components/sections/ClientSection';
import { ProjectSection } from './components/sections/ProjectSection';
import { DesignSection } from './components/sections/DesignSection';
import { ContentSection } from './components/sections/ContentSection';
import { FunctionalitySection } from './components/sections/FunctionalitySection';
import { DatabaseSection } from './components/sections/DatabaseSection';
import { TechnicalSection } from './components/sections/TechnicalSection';
import { ObservationsSection } from './components/sections/ObservationsSection';

function BriefForm({ onNavigateToPrices }: { onNavigateToPrices: () => void }) {
  const { theme, toggleTheme } = useThemeStore();
  const { toasts, addToast, removeToast } = useToast();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const form = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      marca: [],
      estilo: [],
      secciones: [],
      funciones: [],
      tiene: [],
      extras: [],
      color_principal: '#2563eb',
      color_secundario: '#7c3aed',
      color_acento: '#f59e0b',
    },
  });

  const { register, formState: { errors } } = form;
  const { sending, progress, onClear, onExport, onPrint, onSend } = useBriefActions(form, addToast);

  const handleClear = () => {
    setShowClearDialog(false);
    onClear(() => {});
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <ConfirmDialog
        open={showClearDialog}
        title="Limpiar formulario"
        message="¿Estás seguro de que querés limpiar todos los datos? Esta acción no se puede deshacer."
        confirmLabel="Limpiar todo"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={handleClear}
        onCancel={() => setShowClearDialog(false)}
      />

      <div className="app">
        <header className="top">
          <div className="header-inner">
            <div>
              <h1>Brief de Proyecto Web</h1>
              <p>Contame qué necesitás y así te preparo una propuesta a medida. Los campos marcados con * son obligatorios.</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-ghost nav-link" onClick={onNavigateToPrices} title="Ver precios">
                Precios
              </button>
              <Button variant="ghost" onClick={toggleTheme} aria-label="Cambiar tema" title="Cambiar tema">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </header>

        <form id="brief" noValidate>
          <ClientSection register={register} errors={errors} />
          <ProjectSection register={register} errors={errors} />
          <DesignSection register={register} errors={errors} />
          <ContentSection register={register} errors={errors} />
          <FunctionalitySection register={register} errors={errors} />
          <DatabaseSection register={register} errors={errors} />
          <TechnicalSection register={register} errors={errors} />
          <ObservationsSection register={register} errors={errors} />
          <ProgressBar percent={progress} />
        </form>
      </div>

      <FloatingActions
        onPrint={onPrint}
        onExport={onExport}
        onClear={() => setShowClearDialog(true)}
        onSend={onSend}
        sending={sending}
      />
    </>
  );
}

type Page = 'form' | 'prices';

export default function App() {
  const [page, setPage] = useState<Page>('form');

  return (
    <ThemeProvider>
      {page === 'prices' ? (
        <Prices />
      ) : (
        <BriefForm onNavigateToPrices={() => setPage('prices')} />
      )}
    </ThemeProvider>
  );
}
