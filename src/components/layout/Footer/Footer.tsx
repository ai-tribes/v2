import Link from 'next/link';
import { FooterProps } from './Footer.types';

export function Footer({ 
  copyrightText = `© ${new Date().getFullYear()} AI Tribes. All rights reserved.`,
  links = []
}: FooterProps) {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted">{copyrightText}</span>
          </div>
          <div className="col-md-6">
            <ul className="nav justify-content-md-end">
              {links.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link href={link.href} className="nav-link px-2 text-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 