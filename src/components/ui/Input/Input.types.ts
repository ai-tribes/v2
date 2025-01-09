import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldProps } from '../Form/Form.types';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, 
  Pick<FieldProps, 'error' | 'isRequired'> {
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
   * Whether the input is read only
   * @default false
   */
  isReadOnly?: boolean;

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