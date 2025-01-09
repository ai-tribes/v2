import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names using clsx
 * This ensures proper handling of conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
} 