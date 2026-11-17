import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';
import { TextArea } from '../TextArea';

export function ObservationsSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>8 · Observaciones y aprobación</h2>
      <TextArea label="¿Algo más que quieras contarnos?" name="observaciones" register={register} errors={errors} placeholder="Cualquier detalle, idea o restricción" />
      <div className="row">
        <Input label="Fecha" name="fecha_firma" register={register} errors={errors} type="date" />
        <Input label="Firma / nombre" name="firma" register={register} errors={errors} />
      </div>
    </section>
  );
}
