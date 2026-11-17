import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { SelectField } from '../Select';
import { dbNecesitaOptions, dbSensibleOptions } from '../../config/formOptions';

export function DatabaseSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>Base de datos</h2>
      <p className="hint">Solo si necesitás guardar información.</p>
      <SelectField
        label="¿Necesitás guardar datos?"
        name="db_necesita"
        register={register}
        errors={errors}
        options={dbNecesitaOptions}
      />
      <TextArea label="¿Qué información se guardaría?" name="db_que" register={register} errors={errors} placeholder="Ej: nombre, email y mensaje de cada consulta; o productos con foto, precio y stock..." />
      <Input label="¿Quién carga y edita esos datos?" name="db_quien" register={register} errors={errors} placeholder="Ej: yo desde un panel, o vos con acceso a la base" />
      <div className="row">
        <Input label="Volumen estimado de registros" name="db_volumen" register={register} errors={errors} placeholder="Ej: menos de 100, miles..." />
        <SelectField
          label="¿Datos sensibles? (usuarios, pagos)"
          name="db_sensible"
          register={register}
          errors={errors}
          options={dbSensibleOptions}
        />
      </div>
    </section>
  );
}
