import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface CheckboxGroupProps<T extends FieldValues> {
  label?: string;
  groupLabel?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: { value: string; label: string }[];
}

export function CheckboxGroup<T extends FieldValues>({
  label, groupLabel, name, register, errors, options,
}: CheckboxGroupProps<T>) {
  const error = errors[name];

  return (
    <div className="field">
      {groupLabel && <span className="group-label">{groupLabel}</span>}
      {label && <label>{label}</label>}
      <div className="checks">
        {options.map((opt) => (
          <label key={opt.value}>
            <input type="checkbox" value={opt.value} {...register(name)} />
            {opt.label}
          </label>
        ))}
      </div>
      {error && (
        <span className="error-msg">
          <AlertCircle size={12} />
          {String(error.message)}
        </span>
      )}
    </div>
  );
}
