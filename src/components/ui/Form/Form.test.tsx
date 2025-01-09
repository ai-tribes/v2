import { render, screen, fireEvent } from '@/lib/test-utils';
import { Form, FormField, FormGroup } from './Form';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

describe('Form Components', () => {
  describe('Form', () => {
    const mockSubmit = jest.fn();
    const defaultProps = {
      onSubmit: mockSubmit,
      children: <button type="submit">Submit</button>,
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders children correctly', () => {
      render(<Form {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
      render(<Form {...defaultProps} error="Form submission failed" />);
      expect(screen.getByText('Form submission failed')).toBeInTheDocument();
    });

    it('shows success message when provided', () => {
      render(<Form {...defaultProps} successMessage="Form submitted successfully" />);
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
    });

    it('calls onSubmit with form data', async () => {
      render(
        <Form onSubmit={mockSubmit}>
          <Input name="username" defaultValue="testuser" />
          <button type="submit">Submit</button>
        </Form>
      );

      fireEvent.submit(screen.getByRole('form'));
      expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
        username: 'testuser',
      }));
    });

    it('prevents submission when isLoading is true', () => {
      render(<Form {...defaultProps} isLoading={true} />);
      fireEvent.submit(screen.getByRole('form'));
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('FormField', () => {
    const defaultProps = {
      name: 'test',
      children: <Input />,
    };

    it('renders label when provided', () => {
      render(<FormField {...defaultProps} label="Test Field" />);
      expect(screen.getByText('Test Field')).toBeInTheDocument();
    });

    it('shows required indicator when isRequired is true', () => {
      render(<FormField {...defaultProps} label="Test Field" isRequired />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
      render(<FormField {...defaultProps} error="Field is required" />);
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    it('shows helper text when provided', () => {
      render(<FormField {...defaultProps} helperText="Enter your username" />);
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });
  });

  describe('FormGroup', () => {
    it('renders children with proper classes', () => {
      render(
        <FormGroup>
          <div>Child 1</div>
          <div>Child 2</div>
        </FormGroup>
      );
      const group = screen.getByText('Child 1').parentElement;
      expect(group).toHaveClass('row', 'g-3', 'align-items-center');
    });

    it('applies additional className when provided', () => {
      render(
        <FormGroup className="custom-class">
          <div>Content</div>
        </FormGroup>
      );
      const group = screen.getByText('Content').parentElement;
      expect(group).toHaveClass('custom-class');
    });
  });
}); 