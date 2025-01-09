import { render, screen } from '@/lib/test-utils';
import { ExampleCard } from './Card';

describe('ExampleCard', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    ctaText: 'Learn More',
    ctaHref: '#test',
  };

  it('renders all provided content', () => {
    render(<ExampleCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.ctaText)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.ctaHref);
  });

  it('applies hover styles correctly', () => {
    render(<ExampleCard {...defaultProps} />);
    const card = screen.getByRole('link').closest('.card');
    expect(card).toHaveClass('card');
  });
}); 