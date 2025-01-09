import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: ModalSize;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
} 