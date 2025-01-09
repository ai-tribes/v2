import { ExampleCard } from '@/components/ui/Card';

export default function ExamplesPage() {
  const examples = [
    {
      title: "Basic Example",
      description: "A simple example showing basic components and styling with Bootstrap 5.",
      ctaText: "Learn More",
      ctaHref: "#"
    },
    {
      title: "Advanced Features",
      description: "Explore advanced features and integrations available in the platform.",
      ctaText: "Explore",
      ctaHref: "#"
    },
    {
      title: "API Integration",
      description: "Learn how to integrate with our API and build custom solutions.",
      ctaText: "View Docs",
      ctaHref: "#"
    }
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4">AI Tribes Examples</h1>
      
      <div className="row g-4">
        {examples.map((example, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <ExampleCard {...example} />
          </div>
        ))}
      </div>
    </div>
  );
} 