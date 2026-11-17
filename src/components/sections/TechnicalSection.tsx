import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { CheckboxGroup } from '../CheckboxGroup';
import { tieneOptions, extrasOptions } from '../../config/formOptions';

export function TechnicalSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>7 · Técnico y extras</h2>
      <CheckboxGroup
        groupLabel="¿Qué tenés ya?"
        name="tiene"
        register={register}
        errors={errors}
        options={tieneOptions}
      />
      <Input label="Dominio deseado (si no lo tenés)" name="dominio" register={register} errors={errors} placeholder="Ej: miproyecto.com" />
      <CheckboxGroup
        groupLabel="Servicios adicionales"
        name="extras"
        register={register}
        errors={errors}
        options={extrasOptions}
      />
    </section>
  );
}
