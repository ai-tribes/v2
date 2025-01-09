import Link from 'next/link';
import { FooterProps } from './Footer.types';
import { cn } from '@/lib/utils';
import { isExternalRoute } from '@/lib/routing/types';

export function Footer({ 
  logo,
  linkGroups = [],
  copyright = `© ${new Date().getFullYear()} AI Tribes. All rights reserved.`,
  socialLinks = [],
  bottomContent,
  showBorder = true,
  className
}: FooterProps) {
  return (
    <footer className={cn('bg-white', showBorder && 'border-top', className)}>
      <div className="container py-5">
        <div className="row">
          {/* Logo section */}
          {logo && (
            <div className="col-12 col-xl-4 mb-4 mb-xl-0">
              {logo}
            </div>
          )}
          
          {/* Link groups */}
          <div className={cn(
            "col-12",
            logo ? "col-xl-8" : "col-xl-12"
          )}>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {linkGroups.map((group) => (
                <div key={group.title} className="col">
                  <h3 className="h6 mb-3">{group.title}</h3>
                  <ul className="nav flex-column">
                    {group.links.map((link) => (
                      <li key={link.label} className="nav-item">
                        {isExternalRoute(link.href) ? (
                          <a
                            href={link.href}
                            className="nav-link px-0 py-1 text-muted"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="nav-link px-0 py-1 text-muted"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-top mt-4 pt-4">
          {bottomContent}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3">
            <p className="text-muted small mb-3 mb-sm-0">{copyright}</p>
            
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="nav">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="nav-link text-muted px-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 