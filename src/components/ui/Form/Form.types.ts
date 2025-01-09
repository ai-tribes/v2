import { FormHTMLAttributes, ReactNode } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  children: ReactNode;
  isLoading?: boolean;
  error?: string;
  successMessage?: string;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  error?: string;
  children: ReactNode;
  isRequired?: boolean;
  helperText?: string;
}

export interface FormGroupProps {
  children: ReactNode;
  className?: string;
} 