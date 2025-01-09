import { render, screen } from '@/lib/test-utils';
import { Input } from './Input';

describe('Input', () => {
  it('renders default input correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('form-control-sm');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('form-control-lg');
  });

  it('shows error message when error is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
  });

  it('shows helper text when provided', () => {
    render(<Input helperText="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('applies full width class when isFullWidth is true', () => {
    render(<Input isFullWidth />);
    expect(screen.getByRole('textbox')).toHaveClass('w-100');
  });

  it('renders floating label variant correctly', () => {
    render(<Input variant="floating" label="Email" />);
    expect(screen.getByRole('textbox').parentElement).toHaveClass('form-floating');
  });

  it('merges custom className with default classes', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('form-control', 'custom-class');
  });
}); 