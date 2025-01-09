import { render, screen } from '@/lib/test-utils';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  const defaultProps = {
    headerProps: {
      brandName: 'Test Brand',
      navItems: [{ label: 'Home', href: '/' }],
    },
    footerProps: {
      copyrightText: 'Test Copyright',
      links: [{ label: 'Privacy', href: '/privacy' }],
    },
    children: <div>Test Content</div>,
  };

  it('renders header, content, and footer', () => {
    render(<MainLayout {...defaultProps} />);
    
    // Check header
    expect(screen.getByText(defaultProps.headerProps.brandName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.headerProps.navItems[0].label)).toBeInTheDocument();
    
    // Check content
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    
    // Check footer
    expect(screen.getByText(defaultProps.footerProps.copyrightText)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.footerProps.links[0].label)).toBeInTheDocument();
  });

  it('renders with default header and footer props', () => {
    render(<MainLayout>{defaultProps.children}</MainLayout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('AI Tribes')).toBeInTheDocument();
  });
}); 