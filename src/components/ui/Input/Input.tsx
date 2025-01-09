import { forwardRef } from 'react';
import { InputProps } from './Input.types';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'outline',
      size = 'md',
      error,
      helperText,
      label,
      isInvalid,
      isDisabled,
      isRequired,
      isReadOnly,
      leftElement,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
      outline: 'border-input',
      filled: 'border-transparent bg-secondary',
      flushed: 'rounded-none border-b border-t-0 border-x-0 px-0',
      unstyled: 'border-none px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
    };

    const sizes = {
      sm: 'h-8 text-xs',
      md: 'h-10 text-sm',
      lg: 'h-12 text-base px-4',
    };

    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'mb-2 block text-sm font-medium',
              isDisabled && 'opacity-50'
            )}
          >
            {label}
            {isRequired && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            readOnly={isReadOnly}
            aria-invalid={isInvalid}
            aria-required={isRequired}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              isInvalid && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightElement}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'mt-2 text-sm',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 