import { type BriefData } from '../lib/validation';
import { Edit3, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface BriefPreviewProps {
  data: BriefData;
  onEditStep: (stepIndex: number) => void;
}

interface PreviewSection {
  title: string;
  stepIndex: number;
  fields: { label: string; value: string | string[]; required?: boolean }[];
}

function formatValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  return value;
}

function isFieldEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !value || value.trim() === '';
}

export function BriefPreview({ data, onEditStep }: BriefPreviewProps) {
  const sections: PreviewSection[] = [
    {
      title: 'Datos del cliente',
      stepIndex: 0,
      fields: [
        { label: 'Nombre', value: data.nombre || '', required: true },
        { label: 'Empresa', value: data.empresa || '' },
        { label: 'Email', value: data.email || '', required: true },
        { label: 'Teléfono', value: data.telefono || '' },
        { label: 'Rubro', value: data.rubro || '' },
      ],
    },
    {
      title: 'Sobre el proyecto',
      stepIndex: 1,
      fields: [
        { label: 'Tipo de sitio', value: data.tipo_sitio || '', required: true },
        { label: 'Objetivo', value: data.objetivo || '', required: true },
        { label: 'Público objetivo', value: data.publico || '' },
        { label: 'Referencias', value: data.referencias || '' },
        { label: 'Fecha de entrega', value: data.fecha_entrega || '' },
        { label: 'Presupuesto', value: data.presupuesto || '' },
      ],
    },
    {
      title: 'Diseño e identidad visual',
      stepIndex: 2,
      fields: [
        { label: 'Identidad de marca', value: data.marca || [] },
        { label: 'Color principal', value: data.color_principal || '' },
        { label: 'Color secundario', value: data.color_secundario || '' },
        { label: 'Color de acento', value: data.color_acento || '' },
        { label: 'Colores a evitar', value: data.colores_no || '' },
        { label: 'Estilo visual', value: data.estilo || [] },
        { label: 'Modo', value: data.modo || '' },
      ],
    },
    {
      title: 'Contenido',
      stepIndex: 3,
      fields: [
        { label: 'Secciones', value: data.secciones || [] },
        { label: 'Proveedor de contenido', value: data.contenido_proveedor || '' },
        { label: 'Idiomas', value: data.idiomas || '' },
      ],
    },
    {
      title: 'Funcionalidad y sistemas',
      stepIndex: 4,
      fields: [
        { label: 'Funciones', value: data.funciones || [] },
        { label: 'Sistema especial', value: data.sistema || '' },
        { label: 'Administración', value: data.admin || '' },
      ],
    },
    {
      title: 'Base de datos',
      stepIndex: 5,
      fields: [
        { label: 'Necesidad de BD', value: data.db_necesita || '' },
        { label: 'Datos a almacenar', value: data.db_que || '' },
        { label: 'Quién gestiona', value: data.db_quien || '' },
        { label: 'Volumen estimado', value: data.db_volumen || '' },
        { label: 'Datos sensibles', value: data.db_sensible || '' },
      ],
    },
    {
      title: 'Técnico y extras',
      stepIndex: 6,
      fields: [
        { label: 'Recursos disponibles', value: data.tiene || [] },
        { label: 'Dominio', value: data.dominio || '' },
        { label: 'Servicios adicionales', value: data.extras || [] },
      ],
    },
    {
      title: 'Observaciones y aprobación',
      stepIndex: 7,
      fields: [
        { label: 'Observaciones', value: data.observaciones || '' },
        { label: 'Fecha', value: data.fecha_firma || '' },
        { label: 'Firma', value: data.firma || '' },
      ],
    },
  ];

  // Count incomplete required fields
  let incompleteFields = 0;
  sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.required && isFieldEmpty(field.value)) {
        incompleteFields++;
      }
    });
  });

  return (
    <div className="brief-preview">
      <h2>Vista previa del brief</h2>
      <p className="hint">
        Revisá toda la información antes de enviar. Podés editar cada sección haciendo clic en el botón de editar.
      </p>

      {incompleteFields > 0 && (
        <div className="preview-warning">
          <AlertCircle size={16} />
          <span>Tenés {incompleteFields} campo(s) obligatorio(s) sin completar. Completalos antes de enviar.</span>
        </div>
      )}

      {sections.map((section) => {
        const hasContent = section.fields.some((f) => !isFieldEmpty(f.value));
        const hasIncomplete = section.fields.some((f) => f.required && isFieldEmpty(f.value));

        return (
          <div key={section.title} className={`preview-section ${hasIncomplete ? 'incomplete' : ''}`}>
            <div className="preview-section-header">
              <h3>
                {hasIncomplete && <span className="required" aria-hidden="true">*</span>}
                {section.title}
              </h3>
              <Button
                variant="ghost"
                onClick={() => onEditStep(section.stepIndex)}
                icon={<Edit3 size={14} />}
                title={`Editar ${section.title}`}
              >
                Editar
              </Button>
            </div>

            {hasContent ? (
              <div className="preview-fields">
                {section.fields.map((field) => {
                  if (isFieldEmpty(field.value)) return null;
                  const isEmptyOptional = !field.required && isFieldEmpty(field.value);
                  if (isEmptyOptional) return null;

                  return (
                    <div key={field.label} className="preview-field">
                      <dt>{field.label}</dt>
                      <dd>
                        {field.label.startsWith('Color') && field.value.startsWith('#') ? (
                          <span className="color-swatch" style={{ backgroundColor: field.value as string }}>
                            {field.value}
                          </span>
                        ) : (
                          formatValue(field.value)
                        )}
                      </dd>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="preview-empty">Sin información</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
