import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface SelectFieldProps<T extends FieldValues> {
  label?: string;
  groupLabel?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: { value: string; label: string }[];
}

export function SelectField<T extends FieldValues>({
  label, groupLabel, name, register, errors, options,
}: SelectFieldProps<T>) {
  const error = errors[name];
  const fieldName = String(name);

  return (
    <div className="field">
      {groupLabel && <span className="group-label">{groupLabel}</span>}
      {label && <label htmlFor={fieldName}>{label}</label>}
      <select id={fieldName} {...register(name)} className={error ? 'invalid' : ''}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <span className="error-msg">
          <AlertCircle size={12} />
          {String(error.message)}
        </span>
      )}
    </div>
  );
}
