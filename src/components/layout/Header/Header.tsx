import { forwardRef } from 'react';
import Link from 'next/link';
import { HeaderProps } from './Header.types';
import { cn } from '@/lib/utils';

export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      logo,
      navigation = [],
      actions,
      isSticky = true,
      showBorder = true,
      className,
      mobileMenuTrigger,
      isMobileMenuOpen = false,
      onMobileMenuToggle,
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'navbar navbar-expand-md bg-white',
          isSticky && 'sticky-top',
          showBorder && 'border-bottom',
          className
        )}
      >
        <div className="container">
          {/* Logo Section */}
          <div className="navbar-brand">
            {logo}
          </div>

          {/* Mobile Menu Button */}
          {mobileMenuTrigger && (
            <button
              type="button"
              className="navbar-toggler"
              onClick={() => onMobileMenuToggle?.(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              {mobileMenuTrigger}
            </button>
          )}

          {/* Navigation and Actions */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            {/* Desktop Navigation */}
            <nav className="navbar-nav me-auto mb-2 mb-md-0">
              {navigation.map(({ label, href, isExternal }) => (
                isExternal ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className="nav-link"
                  >
                    {label}
                  </Link>
                )
              ))}
            </nav>

            {/* Actions Section */}
            {actions && (
              <div className="d-flex">
                {actions}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header'; 