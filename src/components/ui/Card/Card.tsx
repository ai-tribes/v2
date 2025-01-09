import { ExampleCardProps } from './Card.types';
import styles from './Card.module.css';

export function ExampleCard({ title, description, ctaText, ctaHref }: ExampleCardProps) {
  return (
    <div className={`card h-100 ${styles.card}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={ctaHref} className="btn btn-primary">{ctaText}</a>
      </div>
    </div>
  );
} 