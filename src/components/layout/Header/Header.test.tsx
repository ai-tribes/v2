import { render, screen } from '@/lib/test-utils';
import { Header } from './Header';

describe('Header', () => {
  const defaultProps = {
    brandName: 'Test Brand',
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ],
  };

  it('renders brand name', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(defaultProps.brandName)).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header {...defaultProps} />);
    defaultProps.navItems.forEach(item => {
      const link = screen.getByText(item.label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.href);
    });
  });

  it('uses default brand name when not provided', () => {
    render(<Header />);
    expect(screen.getByText('AI Tribes')).toBeInTheDocument();
  });
}); 