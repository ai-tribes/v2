import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('shows required indicator when isRequired is true', () => {
    render(<Input label="Username" isRequired />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows helper text when provided', () => {
    render(<Input helperText="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('can be readonly', () => {
    render(<Input isReadOnly />);
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('renders left element when provided', () => {
    render(
      <Input
        leftElement={<span data-testid="left-element">@</span>}
        placeholder="Username"
      />
    );
    expect(screen.getByTestId('left-element')).toBeInTheDocument();
  });

  it('renders right element when provided', () => {
    render(
      <Input
        rightElement={<span data-testid="right-element">✓</span>}
        placeholder="Username"
      />
    );
    expect(screen.getByTestId('right-element')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Input variant="outline" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-input');

    rerender(<Input variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-secondary');

    rerender(<Input variant="flushed" />);
    expect(screen.getByRole('textbox')).toHaveClass('rounded-none');

    rerender(<Input variant="unstyled" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-none');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8');

    rerender(<Input size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12');
  });

  it('applies error styles when isInvalid is true', () => {
    render(<Input isInvalid />);
    expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
  });
}); 