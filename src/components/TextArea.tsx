import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface TextAreaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function TextArea<T extends FieldValues>({
  label, name, register, errors, placeholder, required, rows = 4,
}: TextAreaProps<T>) {
  const error = errors[name];
  const fieldName = String(name);

  return (
    <div className="field">
      <label htmlFor={fieldName}>
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={fieldName}
        placeholder={placeholder}
        rows={rows}
        {...register(name)}
        className={error ? 'invalid' : ''}
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
