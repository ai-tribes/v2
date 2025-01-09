import { render, screen } from '@/lib/test-utils';
import { Footer } from './Footer';

describe('Footer', () => {
  const defaultProps = {
    copyrightText: 'Test Copyright',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  };

  it('renders copyright text', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByText(defaultProps.copyrightText)).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer {...defaultProps} />);
    defaultProps.links.forEach(link => {
      const linkElement = screen.getByText(link.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.href);
    });
  });

  it('uses default copyright text when not provided', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} AI Tribes. All rights reserved.`)).toBeInTheDocument();
  });
}); 