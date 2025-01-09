import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the button takes up the full width of its container
   * @default false
   */
  isFullWidth?: boolean;

  /**
   * The content of the button
   */
  children: ReactNode;

  /**
   * Optional left icon
   */
  leftIcon?: ReactNode;

  /**
   * Optional right icon
   */
  rightIcon?: ReactNode;

  /**
   * Optional loading text
   * @default 'Loading...'
   */
  loadingText?: string;
}
