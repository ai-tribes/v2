import { FormEvent } from 'react';
import { FormProps, FormFieldProps, FormGroupProps } from './Form.types';

export function Form({
  onSubmit,
  children,
  isLoading = false,
  error,
  successMessage,
  className = '',
  ...props
}: FormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const formData = new FormData(event.currentTarget);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`needs-validation ${className}`}
      noValidate
      {...props}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {children}
    </form>
  );
}

export function FormField({
  name,
  label,
  error,
  children,
  isRequired = false,
  helperText,
}: FormFieldProps) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {isRequired && <span className="text-danger ms-1">*</span>}
        </label>
      )}
      
      {children}
      
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return (
    <div className={`row g-3 align-items-center ${className}`}>
      {children}
    </div>
  );
} 