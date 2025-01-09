import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { HeaderProps } from './Header.types';

const mockHeaderProps: HeaderProps = {
  logo: <div>Logo</div>,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ],
  actions: (
    <>
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
    </>
  ),
};

const TestHeader = () => <Header {...mockHeaderProps} />;

TestHeader.displayName = 'TestHeader';

describe('Header', () => {
  it('renders logo, navigation and action items', () => {
    render(<TestHeader />);
    
    // Logo
    expect(screen.getByText('Logo')).toBeInTheDocument();
    
    // Navigation
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    
    // Actions
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
}); 