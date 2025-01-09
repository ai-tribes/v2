import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-modal="true">
      <div className="modal-backdrop fade show" onClick={closeOnOverlayClick ? onClose : undefined} />
      <div className={`modal-dialog modal-${size} modal-dialog-centered`}>
        <div className="modal-content">
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && <h5 className="modal-title">{title}</h5>}
              {showCloseButton && (
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                />
              )}
            </div>
          )}
          
          <div className="modal-body">{children}</div>
          
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
} 