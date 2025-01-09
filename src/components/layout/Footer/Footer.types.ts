import { ReactNode } from 'react';

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export interface FooterProps {
  /**
   * The site logo/brand element
   */
  logo?: ReactNode;

  /**
   * Groups of links to display in columns
   */
  linkGroups?: FooterLinkGroup[];

  /**
   * Copyright text to display
   */
  copyright?: string;

  /**
   * Social media links
   */
  socialLinks?: {
    icon: ReactNode;
    href: string;
    label: string;
  }[];

  /**
   * Additional content to display above the copyright
   */
  bottomContent?: ReactNode;

  /**
   * Whether to show a border at the top
   * @default true
   */
  showBorder?: boolean;

  /**
   * Optional className for styling
   */
  className?: string;
} 