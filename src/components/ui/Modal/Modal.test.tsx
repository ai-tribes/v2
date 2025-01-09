import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
  };

  beforeEach(() => {
    defaultProps.onClose.mockClear();
  });

  it('renders when isOpen is true', () => {
    render(
      <Modal {...defaultProps}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal {...defaultProps} isOpen={false}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal {...defaultProps}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal', () => {
    render(
      <Modal {...defaultProps}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer content when provided', () => {
    render(
      <Modal {...defaultProps} footer={<button>Save</button>}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('prevents backdrop click when preventClose is true', () => {
    render(
      <Modal {...defaultProps} preventClose>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('applies custom size class when provided', () => {
    render(
      <Modal {...defaultProps} size="lg">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-4xl');
  });

  it('renders with custom className when provided', () => {
    render(
      <Modal {...defaultProps} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
  });

  it('renders with custom contentClassName when provided', () => {
    render(
      <Modal {...defaultProps} contentClassName="custom-content">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByTestId('modal-content')).toHaveClass('custom-content');
  });
}); 