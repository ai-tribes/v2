import { ExampleCardProps } from './Card.types';
import Link from 'next/link';

export function ExampleCard({ title, description, ctaText, ctaHref }: ExampleCardProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <Link 
          href={ctaHref}
          className="btn btn-primary d-inline-flex align-items-center"
        >
          {ctaText}
          <svg
            className="ms-2"
            style={{ width: '1rem', height: '1rem' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
} 