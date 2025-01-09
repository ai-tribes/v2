import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays loading state', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays custom loading text', () => {
    render(<Button isLoading loadingText="Please wait...">Click me</Button>);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders left icon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>
        Click me
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        Click me
      </Button>
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies full width class when isFullWidth is true', () => {
    render(<Button isFullWidth>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');

    rerender(<Button variant="outline">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-input');

    rerender(<Button variant="ghost">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent');

    rerender(<Button variant="link">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('underline-offset-4');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(<Button size="md">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');

    rerender(<Button size="lg">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });
});
