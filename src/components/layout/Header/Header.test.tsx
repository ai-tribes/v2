import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Header', () => {
  const defaultProps = {
    logo: <div>Logo</div>,
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'External', href: 'https://example.com', isExternal: true },
    ],
    actions: <button>Sign In</button>,
  };

  it('renders logo, navigation and actions', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('External')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('applies sticky class when isSticky is true', () => {
    render(<Header {...defaultProps} isSticky />);
    expect(screen.getByRole('banner')).toHaveClass('sticky');
  });

  it('applies border class when showBorder is true', () => {
    render(<Header {...defaultProps} showBorder />);
    expect(screen.getByRole('banner')).toHaveClass('border-b');
  });

  it('renders external links with proper attributes', () => {
    render(<Header {...defaultProps} />);
    const externalLink = screen.getByText('External');
    
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles mobile menu toggle', () => {
    const onMobileMenuToggle = jest.fn();
    render(
      <Header
        {...defaultProps}
        mobileMenuTrigger={<span>Menu</span>}
        onMobileMenuToggle={onMobileMenuToggle}
      />
    );

    fireEvent.click(screen.getByText('Menu'));
    expect(onMobileMenuToggle).toHaveBeenCalledWith(true);
  });

  it('shows mobile menu when isMobileMenuOpen is true', () => {
    render(
      <Header
        {...defaultProps}
        isMobileMenuOpen
        mobileMenuTrigger={<span>Menu</span>}
      />
    );

    // Mobile menu should be visible
    const mobileNav = screen.getAllByText('Home')[1]; // Second instance is in mobile menu
    expect(mobileNav).toBeInTheDocument();
    expect(mobileNav.closest('div')).toHaveClass('md:hidden');
  });

  it('hides mobile menu when isMobileMenuOpen is false', () => {
    render(
      <Header
        {...defaultProps}
        isMobileMenuOpen={false}
        mobileMenuTrigger={<span>Menu</span>}
      />
    );

    // Should only find one instance of Home (desktop nav)
    expect(screen.getAllByText('Home')).toHaveLength(1);
  });

  it('applies custom className', () => {
    render(<Header {...defaultProps} className="custom-header" />);
    expect(screen.getByRole('banner')).toHaveClass('custom-header');
  });

  it('renders navigation items as links', () => {
    render(<Header {...defaultProps} />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders mobile menu trigger only on mobile', () => {
    render(
      <Header
        {...defaultProps}
        mobileMenuTrigger={<span>Menu</span>}
      />
    );

    const mobileMenuContainer = screen.getByText('Menu').closest('div');
    expect(mobileMenuContainer).toHaveClass('md:hidden');
  });
}); 