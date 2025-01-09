import { forwardRef } from 'react';
import { FormProps } from './Form.types';
import { cn } from '@/lib/utils';

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      className,
      isLoading = false,
      isDisabled = false,
      error,
      success,
      onSubmit,
      ...props
    },
    ref
  ) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isLoading || isDisabled) return;

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      try {
        await onSubmit(data);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    };

    return (
      <form
        ref={ref}
        className={cn('space-y-6', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-success/15 p-3 text-sm text-success">
              {success}
            </div>
          )}
          {children}
        </div>
      </form>
    );
  }
);

Form.displayName = 'Form'; 