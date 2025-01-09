import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { createInternalRoute } from '@/lib/routing/types';
import Link from 'next/link';

describe('Header', () => {
  it('renders navigation links correctly', () => {
    const navigation = [
      { label: 'Home', href: createInternalRoute('/') },
      { label: 'About', href: createInternalRoute('/about') },
    ];

    render(<Header navigation={navigation} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders actions correctly', () => {
    const actions = (
      <>
        <Link href={createInternalRoute('/login')}>Login</Link>
        <Link href={createInternalRoute('/signup')}>Sign Up</Link>
      </>
    );

    render(<Header actions={actions} />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
}); 