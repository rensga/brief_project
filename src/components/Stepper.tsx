import { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Send, Lock, Download, Printer, Trash2, MoreVertical } from 'lucide-react';
import { Button } from './Button';
import { ModalOverlay } from './ModalOverlay';

export type StepId =
  | 'cliente'
  | 'proyecto'
  | 'diseno'
  | 'contenido'
  | 'funcionalidad'
  | 'basededatos'
  | 'tecnico'
  | 'observaciones';

export interface StepDefinition {
  id: StepId;
  title: string;
  icon: string;
}

export const STEPS: StepDefinition[] = [
  { id: 'cliente', title: 'Datos del cliente', icon: '' },
  { id: 'proyecto', title: 'Sobre el proyecto', icon: '' },
  { id: 'diseno', title: 'Diseño visual', icon: '' },
  { id: 'contenido', title: 'Contenido', icon: '' },
  { id: 'funcionalidad', title: 'Funcionalidad', icon: '' },
  { id: 'basededatos', title: 'Base de datos', icon: '' },
  { id: 'tecnico', title: 'Técnico y extras', icon: '' },
  { id: 'observaciones', title: 'Observaciones', icon: '' },
];

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToPreview: () => void;
  onSend: () => void;
  onClear: () => void;
  onExport: () => void;
  onPrint: () => void;
  sending: boolean;
  progress: number;
  hasErrors?: boolean;
}

export function Stepper({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onGoToPreview,
  onSend,
  onClear,
  onExport,
  onPrint,
  sending,
  progress,
  hasErrors,
}: StepperProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLastFormStep = currentStep === totalSteps - 1;

  const handleNext = useCallback(() => {
    if (isLastFormStep) {
      onGoToPreview();
    } else {
      onNext();
    }
  }, [isLastFormStep, onNext, onGoToPreview]);

  const handleSend = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const handleConfirmSend = useCallback(() => {
    setShowConfirm(false);
    onSend();
  }, [onSend]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <>
      <ModalOverlay open={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="confirm-content">
          <h3 className="confirm-title">Enviar brief</h3>
          <p className="confirm-message">
            ¿Confirmás que querés enviar el brief? Revisá que toda la información sea correcta antes de continuar.
          </p>
          <div className="confirm-actions">
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Revisar de nuevo
            </Button>
            <Button variant="primary" onClick={handleConfirmSend} loading={sending} icon={<Send size={16} />}>
              {sending ? 'Enviando...' : 'Enviar ahora'}
            </Button>
          </div>
        </div>
      </ModalOverlay>

      {/* Progress bar — visible on mobile at the top */}
      <div className="stepper-progress-mobile">
        <div className="stepper-progress-track">
          <div className="stepper-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="stepper-progress-text">
          {progress}% completado · Paso {currentStep + 1} de {totalSteps}
        </span>
      </div>

      <div className="stepper">
        {/* Step indicators */}
        <div className="step-indicators" role="tablist" aria-label="Pasos del formulario">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            return (
              <div
                key={step.id}
                className={`step-indicator ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Paso ${index + 1}: ${step.title}`}
              >
                <div className="step-circle">
                  {isCompleted ? (
                    <Check size={14} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="step-label">{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar — visible on desktop */}
        <div className="stepper-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="stepper-progress-track">
            <div className="stepper-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="stepper-progress-text">
            {progress}% completado · Paso {currentStep + 1} de {totalSteps}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="stepper-nav">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={currentStep === 0}
            icon={<ChevronLeft size={16} />}
          >
            Anterior
          </Button>

          {isLastFormStep ? (
            <Button
              variant="primary"
              onClick={handleSend}
              loading={sending}
              disabled={progress < 100}
              icon={progress < 100 ? <Lock size={16} /> : <Send size={16} />}
            >
              {sending ? 'Enviando...' : progress < 100 ? `Enviar brief (${progress}%)` : 'Enviar brief'}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              className={hasErrors ? 'has-errors' : ''}
              icon={<ChevronRight size={16} />}
            >
              Siguiente
            </Button>
          )}
        </div>

        {/* Action buttons — desktop only */}
        <div className="stepper-actions">
          <Button
            variant="ghost"
            onClick={onPrint}
            disabled={progress < 100}
            icon={progress < 100 ? <Lock size={14} /> : <Printer size={14} />}
          >
            Imprimir
          </Button>
          <Button
            variant="ghost"
            onClick={onExport}
            disabled={progress < 100}
            icon={progress < 100 ? <Lock size={14} /> : <Download size={14} />}
          >
            Exportar
          </Button>
          <Button
            variant="ghost"
            onClick={onClear}
            icon={<Trash2 size={14} />}
          >
            Limpiar
          </Button>
        </div>

      </div>

      {/* Mobile menu button — fixed bottom left */}
      <div className="stepper-mobile-menu" ref={menuRef}>
        <button
          className="btn btn-ghost mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Opciones"
          aria-expanded={menuOpen}
        >
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <div className="mobile-menu-dropdown">
            <button
              className={`mobile-menu-item ${progress < 100 ? 'disabled' : ''}`}
              onClick={() => { setMenuOpen(false); handleSend(); }}
              disabled={progress < 100}
            >
              <Send size={16} />
              {progress < 100 ? `Enviar (${progress}%)` : 'Enviar brief'}
            </button>
            <button
              className={`mobile-menu-item ${progress < 100 ? 'disabled' : ''}`}
              onClick={() => { setMenuOpen(false); onExport(); }}
              disabled={progress < 100}
            >
              <Download size={16} />
              Descargar JSON
            </button>
            <button
              className={`mobile-menu-item ${progress < 100 ? 'disabled' : ''}`}
              onClick={() => { setMenuOpen(false); onPrint(); }}
              disabled={progress < 100}
            >
              <Printer size={16} />
              Imprimir
            </button>
            <button className="mobile-menu-item danger" onClick={() => { setMenuOpen(false); onClear(); }}>
              <Trash2 size={16} />
              Borrar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
