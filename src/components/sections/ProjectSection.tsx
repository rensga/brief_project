import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { RadioGroup } from '../RadioGroup';
import { tipoSitioOptions } from '../../config/formOptions';

export function ProjectSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>2 · Sobre el proyecto</h2>
      <p className="hint">El "qué" y el "para qué".</p>
      <RadioGroup
        groupLabel="¿Qué tipo de sitio necesitás? *"
        name="tipo_sitio"
        register={register}
        errors={errors}
        options={tipoSitioOptions}
      />
      <TextArea label="¿Cuál es el objetivo principal del sitio? *" name="objetivo" register={register} errors={errors} placeholder="Ej: conseguir consultas por WhatsApp, vender online, mostrar el catálogo, dar turnos..." required />
      <TextArea label="¿Quién es tu público objetivo?" name="publico" register={register} errors={errors} placeholder="Edad, ubicación, intereses..." />
      <TextArea label="Sitios de referencia que te gusten (links)" name="referencias" register={register} errors={errors} placeholder="Pegá 2 o 3 links y qué te gusta de cada uno" />
      <div className="row">
        <Input label="Fecha ideal de entrega" name="fecha_entrega" register={register} errors={errors} type="date" />
        <Input label="Presupuesto aproximado" name="presupuesto" register={register} errors={errors} placeholder="Rango o monto estimado" />
      </div>
    </section>
  );
}
