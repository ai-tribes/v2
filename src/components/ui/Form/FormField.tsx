import { forwardRef, isValidElement, cloneElement } from 'react';
import { FormFieldProps, FieldProps } from './Form.types';
import { cn } from '@/lib/utils';

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      name,
      label,
      error,
      helperText,
      isRequired = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Clone child element to pass down field props
    const field = isValidElement(children)
      ? cloneElement<FieldProps>(children, {
          id: name,
          name,
          'aria-describedby': error ? `${name}-error` : helperText ? `${name}-helper` : undefined,
          isRequired,
          error,
        })
      : children;

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            )}
          >
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </label>
        )}
        {field}
        {(error || helperText) && (
          <p
            className={cn(
              'text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
            id={error ? `${name}-error` : `${name}-helper`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField'; 