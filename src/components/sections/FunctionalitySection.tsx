import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { TextArea } from '../TextArea';
import { CheckboxGroup } from '../CheckboxGroup';
import { SelectField } from '../Select';
import { funcionesOptions, adminOptions } from '../../config/formOptions';

export function FunctionalitySection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>Funcionalidad y sistemas</h2>
      <p className="hint">Las "cosas que hacen cosas". Marcá lo que necesites.</p>
      <CheckboxGroup
        groupLabel="Funciones que necesitás"
        name="funciones"
        register={register}
        errors={errors}
        options={funcionesOptions}
      />
      <TextArea label="¿Necesitás algún sistema en particular? (describí el flujo)" name="sistema" register={register} errors={errors} placeholder="Ej: que el cliente pueda reservar un turno, elegir día y horario, y recibir un email de confirmación..." />
      <SelectField
        label="¿Quién va a administrar el sitio después de la entrega?"
        name="admin"
        register={register}
        errors={errors}
        options={adminOptions}
      />
    </section>
  );
}
