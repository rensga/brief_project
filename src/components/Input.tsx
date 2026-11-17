import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  [key: string]: unknown;
}

export function Input<T extends FieldValues>({
  label, name, register, errors, type = 'text', placeholder, required, ...rest
}: InputProps<T>) {
  const error = errors[name];
  const fieldName = String(name);

  return (
    <div className="field">
      <label htmlFor={fieldName}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      <input
        id={fieldName}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={error ? 'invalid' : ''}
        {...rest}
      />
      {error && (
        <span className="error-msg">
          <AlertCircle size={12} />
          {String(error.message)}
        </span>
      )}
    </div>
  );
}
