import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BriefData } from '../../lib/validation';
import { Input } from '../Input';

export function ClientSection({ register, errors }: { register: UseFormRegister<BriefData>; errors: FieldErrors<BriefData> }) {
  return (
    <section className="card">
      <h2>1 · Datos del cliente</h2>
      <p className="hint">Para saber con quién hablamos.</p>
      <div className="row">
        <Input label="Nombre y apellido *" name="nombre" register={register} errors={errors} required />
        <Input label="Empresa / marca" name="empresa" register={register} errors={errors} />
      </div>
      <div className="row">
        <Input label="Email *" name="email" register={register} errors={errors} type="email" required />
        <Input label="Teléfono / WhatsApp" name="telefono" register={register} errors={errors} type="tel" />
      </div>
      <Input label="Rubro o actividad" name="rubro" register={register} errors={errors} placeholder="Ej: gastronomía, consultoría, inmobiliaria..." />
    </section>
  );
}
