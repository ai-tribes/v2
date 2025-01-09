import { Route } from 'next';

export type InternalRoute = Route;
export type ExternalRoute = string;
export type RouteType = InternalRoute | ExternalRoute;

export interface NavigationLink {
  label: string;
  href: RouteType;
  isExternal?: boolean;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

export interface SocialLink extends NavigationLink {
  icon: React.ReactNode;
}

export function isExternalRoute(route: RouteType): route is ExternalRoute {
  return typeof route === 'string' && (route.startsWith('http://') || route.startsWith('https://'));
}

export function createInternalRoute(path: string): InternalRoute {
  return path as Route;
}

export function createExternalRoute(url: string): ExternalRoute {
  // Validate URL format
  try {
    new URL(url); // This validates the URL format
    return url;
  } catch (e) {
    throw new Error(`Invalid URL format: ${url}`);
  }
} 