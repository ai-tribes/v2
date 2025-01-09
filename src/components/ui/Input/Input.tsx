import { useId } from 'react';
import { InputProps } from './Input.types';

export function Input({
  label,
  error,
  size = 'md',
  variant = 'default',
  isFullWidth = false,
  helperText,
  className = '',
  id: providedId,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = providedId || generatedId;

  const sizeClasses = {
    sm: 'form-control-sm',
    md: '',
    lg: 'form-control-lg',
  };

  const widthClass = isFullWidth ? 'w-100' : '';
  const errorClass = error ? 'is-invalid' : '';

  const inputClasses = [
    'form-control',
    sizeClasses[size],
    widthClass,
    errorClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'floating') {
    return (
      <div className="form-floating">
        <input id={id} className={inputClasses} placeholder=" " {...props} />
        {label && <label htmlFor={id}>{label}</label>}
        {error && <div className="invalid-feedback">{error}</div>}
        {helperText && <div className="form-text">{helperText}</div>}
      </div>
    );
  }

  return (
    <div className={`mb-3 ${widthClass}`}>
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input id={id} className={inputClasses} {...props} />
      {error && <div className="invalid-feedback">{error}</div>}
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
} 