import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sun, Moon } from 'lucide-react';

import { useThemeStore } from './stores/themeStore';
import { ThemeProvider } from './components/ThemeProvider';
import { Button } from './components/Button';
import { ToastContainer, useToast } from './components/Toast';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Prices } from './components/Prices';
import { Stepper, STEPS } from './components/Stepper';
import { BriefPreview } from './components/BriefPreview';
import { ModalOverlay } from './components/ModalOverlay';
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

const FORM_STEP_COUNT = STEPS.length;

function BriefForm({ onNavigateToPrices }: { onNavigateToPrices: () => void }) {
  const { theme, toggleTheme } = useThemeStore();
  const { toasts, addToast, removeToast } = useToast();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<BriefData>({
    resolver: zodResolver(briefSchema),
    shouldUnregister: false,
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

  const { register, formState: { errors }, getValues } = form;
  const { sending, progress, onClear, onExport, onPrint, onSend } = useBriefActions(form, addToast);

  const handleClear = () => {
    setShowClearDialog(false);
    onClear(() => {});
  };

  const handleNext = () => {
    if (currentStep < FORM_STEP_COUNT) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToPreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleEditStep = (stepIndex: number) => {
    setShowPreview(false);
    setTimeout(() => {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  const sectionMap = useMemo(() => {
    return (
      sectionIndex: number,
      register: any,
      errors: any
    ) => {
      switch (sectionIndex) {
        case 0:
          return <ClientSection register={register} errors={errors} />;
        case 1:
          return <ProjectSection register={register} errors={errors} />;
        case 2:
          return <DesignSection register={register} errors={errors} />;
        case 3:
          return <ContentSection register={register} errors={errors} />;
        case 4:
          return <FunctionalitySection register={register} errors={errors} />;
        case 5:
          return <DatabaseSection register={register} errors={errors} />;
        case 6:
          return <TechnicalSection register={register} errors={errors} />;
        case 7:
          return <ObservationsSection register={register} errors={errors} />;
        default:
          return null;
      }
    };
  }, []);

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

        {/* Stepper navigation */}
        <Stepper
          currentStep={currentStep}
          totalSteps={FORM_STEP_COUNT}
          onPrev={handlePrev}
          onNext={handleNext}
          onGoToPreview={handleGoToPreview}
          onSend={onSend}
          onClear={() => setShowClearDialog(true)}
          onExport={onExport}
          onPrint={onPrint}
          sending={sending}
          progress={progress}
        />

        <form id="brief" noValidate className="brief-form">
          {sectionMap(currentStep, register, errors)}
        </form>

        {/* Preview modal */}
        <ModalOverlay open={showPreview} onClose={handleClosePreview}>
          <BriefPreview data={getValues()} onEditStep={handleEditStep} />
        </ModalOverlay>
      </div>

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
