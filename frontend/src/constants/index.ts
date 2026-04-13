// Common constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  RESUMES: '/dashboard/resumes',
  JOBS: '/dashboard/jobs',
  APPLICATIONS: '/dashboard/applications',
  SETTINGS: '/dashboard/settings',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  RESUMES: {
    LIST: '/api/resumes',
    GET: (id: string) => `/api/resumes/${id}`,
    CREATE: '/api/resumes',
    UPDATE: (id: string) => `/api/resumes/${id}`,
    DELETE: (id: string) => `/api/resumes/${id}`,
    UPLOAD: '/api/resumes/upload',
  },
  JOBS: {
    LIST: '/api/jobs',
    GET: (id: string) => `/api/jobs/${id}`,
    CREATE: '/api/jobs',
    UPDATE: (id: string) => `/api/jobs/${id}`,
    DELETE: (id: string) => `/api/jobs/${id}`,
  },
  APPLICATIONS: {
    LIST: '/api/applications',
    GET: (id: string) => `/api/applications/${id}`,
    CREATE: '/api/applications',
    UPDATE: (id: string) => `/api/applications/${id}`,
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
  },
} as const;

// UI Constants
export const COLORS = {
  primary: '#4F46E5',
  secondary: '#6366F1',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
} as const;

export const TRANSITIONS = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out',
} as const;

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const;

// Animation Defaults
export const ANIMATION_DURATION = {
  FAST: 0.15,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;
