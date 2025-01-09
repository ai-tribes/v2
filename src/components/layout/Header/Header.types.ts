import { ReactNode } from 'react';

export interface HeaderProps {
  /**
   * The site logo/brand element
   */
  logo?: ReactNode;

  /**
   * Navigation items to display
   */
  navigation?: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];

  /**
   * Actions to display in the header (e.g., login/signup buttons)
   */
  actions?: ReactNode;

  /**
   * Whether the header is sticky
   * @default true
   */
  isSticky?: boolean;

  /**
   * Whether to show a border at the bottom
   * @default true
   */
  showBorder?: boolean;

  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Optional mobile menu trigger element
   */
  mobileMenuTrigger?: ReactNode;

  /**
   * Whether the mobile menu is open
   * @default false
   */
  isMobileMenuOpen?: boolean;

  /**
   * Callback when mobile menu state changes
   */
  onMobileMenuToggle?: (isOpen: boolean) => void;
} 