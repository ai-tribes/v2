import { FormHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Whether the form is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the form is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * The error message to display
   */
  error?: string;

  /**
   * The success message to display
   */
  success?: string;

  /**
   * Form submission handler
   */
  onSubmit: (data: any) => void | Promise<void>;
}

export interface FieldProps {
  id: string;
  name: string;
  'aria-describedby'?: string;
  isRequired?: boolean;
  error?: string;
}

export interface FormFieldProps {
  /**
   * The name of the field
   */
  name: string;

  /**
   * The label for the field
   */
  label?: string;

  /**
   * Whether the field is required
   * @default false
   */
  isRequired?: boolean;

  /**
   * The error message to display
   */
  error?: string;

  /**
   * Helper text to display below the field
   */
  helperText?: string;

  /**
   * The children components (usually Input, Select, etc.)
   */
  children: ReactElement<FieldProps>;

  /**
   * Optional className for styling
   */
  className?: string;
}

export interface FormGroupProps {
  /**
   * The children components
   */
  children: ReactNode;

  /**
   * The direction of the group
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * The spacing between items
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';

  /**
   * Whether the group should take up the full width
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * Optional className for styling
   */
  className?: string;
} 