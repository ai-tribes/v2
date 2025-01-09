import { render, screen, fireEvent } from '@/lib/test-utils';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    // Create portal root
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal content when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Modal {...defaultProps} footer={<button>Close</button>} />
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking overlay if closeOnOverlayClick is true', () => {
    render(<Modal {...defaultProps} closeOnOverlayClick={true} />);
    fireEvent.click(screen.getByRole('dialog').firstChild as Element);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking overlay if closeOnOverlayClick is false', () => {
    render(<Modal {...defaultProps} closeOnOverlayClick={false} />);
    fireEvent.click(screen.getByRole('dialog').firstChild as Element);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('applies size class correctly', () => {
    const { rerender } = render(<Modal {...defaultProps} size="lg" />);
    expect(screen.getByRole('dialog').children[1]).toHaveClass('modal-dialog-centered', 'modal-lg');

    rerender(<Modal {...defaultProps} size="sm" />);
    expect(screen.getByRole('dialog').children[1]).toHaveClass('modal-dialog-centered', 'modal-sm');
  });

  it('does not show close button when showCloseButton is false', () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });
}); 