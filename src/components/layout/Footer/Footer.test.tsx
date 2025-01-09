import { render, screen } from '@/lib/test-utils';
import { Footer } from './Footer';

describe('Footer', () => {
  const mockLogo = <div data-testid="mock-logo">Logo</div>;
  const mockIcon = <svg data-testid="mock-icon" />;
  
  const defaultProps = {
    logo: mockLogo,
    linkGroups: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog', isExternal: true },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    ],
    copyright: 'Test Copyright',
    socialLinks: [
      { icon: mockIcon, href: 'https://twitter.com', label: 'Twitter' },
      { icon: mockIcon, href: 'https://github.com', label: 'GitHub' },
    ],
    bottomContent: <div data-testid="bottom-content">Additional Content</div>,
  };

  it('renders all sections correctly', () => {
    render(<Footer {...defaultProps} />);
    
    // Logo
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    
    // Link groups
    defaultProps.linkGroups.forEach(group => {
      expect(screen.getByText(group.title)).toBeInTheDocument();
      group.links.forEach(link => {
        const linkElement = screen.getByText(link.label);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.closest('a')).toHaveAttribute('href', link.href);
        if (link.isExternal) {
          expect(linkElement.closest('a')).toHaveAttribute('target', '_blank');
          expect(linkElement.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
        }
      });
    });
    
    // Copyright
    expect(screen.getByText(defaultProps.copyright)).toBeInTheDocument();
    
    // Social links
    defaultProps.socialLinks.forEach(social => {
      const link = screen.getByLabelText(social.label);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', social.href);
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
    
    // Bottom content
    expect(screen.getByTestId('bottom-content')).toBeInTheDocument();
  });

  it('uses default copyright text when not provided', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} AI Tribes. All rights reserved.`)).toBeInTheDocument();
  });

  it('shows border by default', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass('border-t');
  });

  it('hides border when showBorder is false', () => {
    const { container } = render(<Footer showBorder={false} />);
    expect(container.firstChild).not.toHaveClass('border-t');
  });

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
}); 