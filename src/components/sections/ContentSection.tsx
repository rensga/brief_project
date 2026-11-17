import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { CheckboxGroup } from '../CheckboxGroup';
import { SelectField } from '../Select';
import { seccionesOptions, contenidoProveedorOptions } from '../../config/formOptions';

export function ContentSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>Contenido</h2>
      <p className="hint">Qué se muestra y quién lo prepara.</p>
      <CheckboxGroup
        groupLabel="Secciones que necesitás"
        name="secciones"
        register={register}
        errors={errors}
        options={seccionesOptions}
      />
      <SelectField
        label="¿Quién provee los textos e imágenes?"
        name="contenido_proveedor"
        register={register}
        errors={errors}
        options={contenidoProveedorOptions}
      />
      <Input label="¿En qué idiomas debe estar el sitio?" name="idiomas" register={register} errors={errors} placeholder="Ej: solo español; español + inglés..." />
    </section>
  );
}
