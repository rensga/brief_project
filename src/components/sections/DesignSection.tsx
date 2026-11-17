import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { CheckboxGroup } from '../CheckboxGroup';
import { SelectField } from '../Select';
import { marcaOptions, estiloOptions, modoOptions } from '../../config/formOptions';

export function DesignSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>3 · Diseño e identidad visual</h2>
      <p className="hint">Colores, estilo y marca.</p>
      <CheckboxGroup
        groupLabel="¿Ya tenés identidad de marca?"
        name="marca"
        register={register}
        errors={errors}
        options={marcaOptions}
      />
      <div className="field">
        <label>Colores preferidos (elegí hasta 3)</label>
        <div className="colors">
          <div>
            <label>Principal</label>
            <input type="color" defaultValue="#2563eb" {...register('color_principal')} />
          </div>
          <div>
            <label>Secundario</label>
            <input type="color" defaultValue="#7c3aed" {...register('color_secundario')} />
          </div>
          <div>
            <label>Acento</label>
            <input type="color" defaultValue="#f59e0b" {...register('color_acento')} />
          </div>
        </div>
        <p className="note">Si tenés códigos exactos (HEX) o referencia a una marca, escribilos abajo.</p>
      </div>
      <Input label="Colores o estilos que NO querés" name="colores_no" register={register} errors={errors} placeholder="Ej: nada de rosa, evitar el estilo recargado..." />
      <CheckboxGroup
        groupLabel="Estilo visual que te representa"
        name="estilo"
        register={register}
        errors={errors}
        options={estiloOptions}
      />
      <SelectField
        label="¿Modo claro, oscuro o ambos?"
        name="modo"
        register={register}
        errors={errors}
        options={modoOptions}
      />
    </section>
  );
}
