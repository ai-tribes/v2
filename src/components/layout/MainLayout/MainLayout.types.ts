import { ReactNode } from 'react';
import { HeaderProps } from '../Header/Header.types';
import { FooterProps } from '../Footer/Footer.types';

export interface MainLayoutProps {
  children: ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
} 