import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { Input } from '../Input';

describe('FormField', () => {
  const defaultProps = {
    name: 'test-field',
    children: <Input placeholder="Test input" />,
  };

  it('renders input with correct props', () => {
    render(<FormField {...defaultProps} />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('id', 'test-field');
    expect(input).toHaveAttribute('name', 'test-field');
  });

  it('renders label when provided', () => {
    render(<FormField {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator when isRequired is true', () => {
    render(<FormField {...defaultProps} label="Test Label" isRequired />);
    const label = screen.getByText('Test Label');
    expect(label.parentElement).toContainElement(screen.getByText('*'));
  });

  it('shows error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<FormField {...defaultProps} error={errorMessage} />);
    
    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-destructive');
  });

  it('shows helper text when provided', () => {
    const helperText = 'Enter your username';
    render(<FormField {...defaultProps} helperText={helperText} />);
    
    const helperElement = screen.getByText(helperText);
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).not.toHaveClass('text-destructive');
  });

  it('sets aria-describedby correctly with error', () => {
    render(<FormField {...defaultProps} error="Error message" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('aria-describedby', 'test-field-error');
  });

  it('sets aria-describedby correctly with helper text', () => {
    render(<FormField {...defaultProps} helperText="Helper text" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('aria-describedby', 'test-field-helper');
  });

  it('applies custom className to wrapper', () => {
    render(<FormField {...defaultProps} className="custom-class" />);
    const wrapper = screen.getByPlaceholderText('Test input').parentElement?.parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('prioritizes error message over helper text', () => {
    render(
      <FormField
        {...defaultProps}
        error="Error message"
        helperText="Helper text"
      />
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('passes isRequired to input component', () => {
    render(<FormField {...defaultProps} isRequired />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('handles non-input children gracefully', () => {
    render(
      <FormField name="test-field">
        <div data-testid="custom-child">Custom child</div>
      </FormField>
    );
    
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });
}); 