import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Eye, Send } from 'lucide-react';
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
  sending,
  progress,
  hasErrors,
}: StepperProps) {
  const [showConfirm, setShowConfirm] = useState(false);

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

        {/* Progress bar */}
        <div className="stepper-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="stepper-progress-track">
            <div className="stepper-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="stepper-progress-text">
            {progress}% completado · Paso {currentStep + 1} de {totalSteps}
          </span>
        </div>

        {/* Navigation buttons */}
        <div className="stepper-actions">
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
              icon={<Eye size={16} />}
            >
              {sending ? 'Enviando...' : 'Enviar brief'}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              className={hasErrors ? 'has-errors' : ''}
              icon={<ChevronRight size={16} />}
            >
              {isLastFormStep ? 'Ver vista previa' : 'Siguiente'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
