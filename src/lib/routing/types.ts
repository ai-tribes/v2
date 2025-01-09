import { Route } from 'next';

export type InternalRoute = Route;
export type ExternalRoute = URL;
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

export function isExternalRoute(route: RouteType): route is URL {
  return route instanceof URL;
}

export function createInternalRoute(path: string): InternalRoute {
  return path as Route;
}

export function createExternalRoute(url: string): ExternalRoute {
  return new URL(url);
} 