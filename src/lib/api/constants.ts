export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  TRIBES: {
    LIST: '/tribes',
    CREATE: '/tribes',
    GET: (id: string) => `/tribes/${id}`,
    UPDATE: (id: string) => `/tribes/${id}`,
    DELETE: (id: string) => `/tribes/${id}`,
  },
  AGENTS: {
    LIST: '/agents',
    CREATE: '/agents',
    GET: (id: string) => `/agents/${id}`,
    UPDATE: (id: string) => `/agents/${id}`,
    DELETE: (id: string) => `/agents/${id}`,
  },
} as const;

export const API_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export const DEFAULT_API_CONFIG = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
} as const; 