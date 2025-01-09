import { forwardRef } from 'react';
import { FormGroupProps } from './Form.types';
import { cn } from '@/lib/utils';

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      children,
      direction = 'vertical',
      spacing = 'md',
      isFullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
    };

    const directionClasses = {
      vertical: spacingClasses[spacing],
      horizontal: cn(
        'flex items-center',
        {
          'gap-2': spacing === 'sm',
          'gap-4': spacing === 'md',
          'gap-6': spacing === 'lg',
        }
      ),
    };

    return (
      <div
        ref={ref}
        className={cn(
          directionClasses[direction],
          isFullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup'; 