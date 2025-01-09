import Link from 'next/link';
import { ExampleCardProps } from './Card.types';
import { isExternalRoute } from '@/lib/routing/types';

export function ExampleCard({ title, description, ctaText, ctaHref }: ExampleCardProps) {
  const linkClassName = "btn btn-primary d-inline-flex align-items-center";

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {isExternalRoute(ctaHref) ? (
          <a
            href={ctaHref}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ctaText}
          </a>
        ) : (
          <Link
            href={ctaHref}
            className={linkClassName}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
} 