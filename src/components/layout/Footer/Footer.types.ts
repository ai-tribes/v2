import { ReactNode } from 'react';
import { NavigationGroup, SocialLink } from '@/lib/routing/types';

export interface FooterProps {
  /**
   * The site logo/brand element
   */
  logo?: ReactNode;

  /**
   * Groups of links to display in columns
   */
  linkGroups?: NavigationGroup[];

  /**
   * Copyright text to display
   */
  copyright?: string;

  /**
   * Social media links
   */
  socialLinks?: SocialLink[];

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