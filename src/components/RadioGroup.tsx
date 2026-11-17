import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface RadioGroupProps<T extends FieldValues> {
  groupLabel?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  options: { value: string; label: string }[];
}

export function RadioGroup<T extends FieldValues>({
  groupLabel, name, register, errors, options,
}: RadioGroupProps<T>) {
  const error = errors[name];

  return (
    <div className="field">
      {groupLabel && <span className="group-label">{groupLabel}</span>}
      <div className="checks">
        {options.map((opt) => {
          const registered = register(name);
          const { name: _name, ...restRegistered } = registered;
          return (
            <label key={opt.value}>
              <input type="radio" name={String(name)} value={opt.value} {...restRegistered} />
              {opt.label}
            </label>
          );
        })}
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
