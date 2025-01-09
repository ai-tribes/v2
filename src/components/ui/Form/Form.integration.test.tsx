import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Form, FormField, FormGroup } from './';
import { Input } from '../Input';
import { Button } from '../Button';

describe('Form Integration', () => {
  describe('Form with FormField', () => {
    it('submits form with field values', async () => {
      const handleSubmit = jest.fn();
      render(
        <Form onSubmit={handleSubmit}>
          <FormField name="username" label="Username">
            <Input defaultValue="testuser" />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByText('Submit'));
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
          })
        );
      });
    });

    it('handles multiple fields in a form', async () => {
      const handleSubmit = jest.fn();
      render(
        <Form onSubmit={handleSubmit}>
          <FormField name="username" label="Username">
            <Input defaultValue="testuser" />
          </FormField>
          <FormField name="email" label="Email">
            <Input defaultValue="test@example.com" type="email" />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByText('Submit'));
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            username: 'testuser',
            email: 'test@example.com',
          })
        );
      });
    });

    it('prevents submission when form is loading', async () => {
      const handleSubmit = jest.fn();
      render(
        <Form onSubmit={handleSubmit} isLoading>
          <FormField name="username" label="Username">
            <Input defaultValue="testuser" />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByText('Submit'));
      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form with FormGroup', () => {
    it('renders fields in horizontal layout', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormGroup direction="horizontal">
            <FormField name="firstName" label="First Name">
              <Input placeholder="First name" />
            </FormField>
            <FormField name="lastName" label="Last Name">
              <Input placeholder="Last name" />
            </FormField>
          </FormGroup>
        </Form>
      );

      const group = screen.getByPlaceholderText('First name').closest('.flex');
      expect(group).toHaveClass('items-center');
    });

    it('handles nested groups with different layouts', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormGroup>
            <FormField name="email" label="Email">
              <Input type="email" />
            </FormField>
            <FormGroup direction="horizontal">
              <FormField name="password" label="Password">
                <Input type="password" />
              </FormField>
              <FormField name="confirmPassword" label="Confirm Password">
                <Input type="password" />
              </FormField>
            </FormGroup>
          </FormGroup>
        </Form>
      );

      const verticalGroup = screen.getByLabelText('Email').closest('.space-y-4');
      const horizontalGroup = screen.getByLabelText('Password').closest('.flex');
      
      expect(verticalGroup).toBeInTheDocument();
      expect(horizontalGroup).toHaveClass('items-center');
    });
  });

  describe('Form Error Handling', () => {
    it('displays form-level error message', () => {
      render(
        <Form onSubmit={() => {}} error="Invalid credentials">
          <FormField name="username">
            <Input />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('displays field-level error messages', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField 
            name="username" 
            error="Username is required"
          >
            <Input />
          </FormField>
          <FormField 
            name="email" 
            error="Invalid email format"
          >
            <Input type="email" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Username is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });

    it('handles async form submission errors', async () => {
      const handleSubmit = jest.fn().mockRejectedValue(new Error('Submission failed'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Form onSubmit={handleSubmit}>
          <FormField name="username">
            <Input defaultValue="testuser" />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      );

      fireEvent.click(screen.getByText('Submit'));
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Accessibility', () => {
    it('maintains proper tab order', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField name="username" label="Username">
            <Input />
          </FormField>
          <FormField name="password" label="Password">
            <Input type="password" />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      );

      const elements = [
        screen.getByLabelText('Username'),
        screen.getByLabelText('Password'),
        screen.getByText('Submit'),
      ];

      elements.forEach((element, index) => {
        expect(element).toHaveAttribute('tabIndex', index === 2 ? undefined : '0');
      });
    });

    it('associates labels with inputs correctly', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField name="username" label="Username">
            <Input />
          </FormField>
        </Form>
      );

      const input = screen.getByLabelText('Username');
      const label = screen.getByText('Username');
      
      expect(input).toHaveAttribute('id', 'username');
      expect(label).toHaveAttribute('for', 'username');
    });
  });
}); 