import { useState } from 'react';
import type { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { AlertCircle, Info } from 'lucide-react';

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  [key: string]: unknown;
}

export function Input<T extends FieldValues>({
  label, name, register, errors, type = 'text', placeholder, required, hint, ...rest
}: InputProps<T>) {
  const error = errors[name];
  const fieldName = String(name);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="field">
      <label htmlFor={fieldName} className="field-label">
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
        {hint && (
          <span
            className="field-hint-tooltip"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
            tabIndex={0}
            role="button"
            aria-label={`Ayuda para ${label}`}
          >
            <Info size={14} />
            {showHint && (
              <span className="tooltip-content">
                {hint}
              </span>
            )}
          </span>
        )}
      </label>
      <input
        id={fieldName}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={error ? 'invalid' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldName}-error` : undefined}
        {...rest}
      />
      {error && (
        <span className="error-msg" id={`${fieldName}-error`} role="alert">
          <AlertCircle size={12} />
          {String(error.message)}
        </span>
      )}
    </div>
  );
}
