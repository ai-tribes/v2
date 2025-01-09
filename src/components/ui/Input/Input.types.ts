import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * The variant of the input
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * Whether the input is invalid
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the input is required
   * @default false
   */
  isRequired?: boolean;

  /**
   * Whether the input is read only
   * @default false
   */
  isReadOnly?: boolean;

  /**
   * The error message to display
   */
  error?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Optional left element (icon, text, etc.)
   */
  leftElement?: ReactNode;

  /**
   * Optional right element (icon, text, etc.)
   */
  rightElement?: ReactNode;
} 