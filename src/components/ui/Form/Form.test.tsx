import { render, screen, fireEvent } from '@testing-library/react';
import { Form, FormField, FormGroup } from './';
import { Input } from '../Input';

describe('Form Components', () => {
  describe('Form', () => {
    const mockSubmit = jest.fn();
    const defaultProps = {
      onSubmit: mockSubmit,
    };

    beforeEach(() => {
      mockSubmit.mockClear();
    });

    it('renders children correctly', () => {
      render(
        <Form {...defaultProps}>
          <div>Form Content</div>
        </Form>
      );
      expect(screen.getByText('Form Content')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
      render(
        <Form {...defaultProps} error="Form submission failed">
          <div>Form Content</div>
        </Form>
      );
      expect(screen.getByText('Form submission failed')).toBeInTheDocument();
    });

    it('shows success message when provided', () => {
      render(
        <Form {...defaultProps} success="Form submitted successfully">
          <div>Form Content</div>
        </Form>
      );
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
    });

    it('calls onSubmit with form data', () => {
      render(
        <Form {...defaultProps}>
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
      render(
        <Form {...defaultProps} isLoading>
          <button type="submit">Submit</button>
        </Form>
      );
      fireEvent.submit(screen.getByRole('form'));
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });

  describe('FormField', () => {
    it('renders label correctly', () => {
      render(
        <FormField name="username" label="Username">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('shows required indicator when isRequired is true', () => {
      render(
        <FormField name="username" label="Username" isRequired>
          <Input />
        </FormField>
      );
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shows error message when provided', () => {
      render(
        <FormField name="username" error="This field is required">
          <Input />
        </FormField>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('shows helper text when provided', () => {
      render(
        <FormField name="username" helperText="Enter your username">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Enter your username')).toBeInTheDocument();
    });
  });

  describe('FormGroup', () => {
    it('renders children correctly', () => {
      render(
        <FormGroup>
          <div>Field 1</div>
          <div>Field 2</div>
        </FormGroup>
      );
      expect(screen.getByText('Field 1')).toBeInTheDocument();
      expect(screen.getByText('Field 2')).toBeInTheDocument();
    });

    it('applies vertical direction classes by default', () => {
      render(
        <FormGroup>
          <div>Field 1</div>
          <div>Field 2</div>
        </FormGroup>
      );
      expect(screen.getByText('Field 1').parentElement).toHaveClass('space-y-4');
    });

    it('applies horizontal direction classes when specified', () => {
      render(
        <FormGroup direction="horizontal">
          <div>Field 1</div>
          <div>Field 2</div>
        </FormGroup>
      );
      expect(screen.getByText('Field 1').parentElement).toHaveClass('flex', 'items-center');
    });

    it('applies full width class when isFullWidth is true', () => {
      render(
        <FormGroup isFullWidth>
          <div>Field 1</div>
        </FormGroup>
      );
      expect(screen.getByText('Field 1').parentElement).toHaveClass('w-full');
    });
  });
}); 