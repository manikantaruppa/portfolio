// lib/getApiUrl.ts
export function getApiUrl(): string {
  // For Vercel deployment:
  // - In production: API is at same origin (/api/send-email)
  // - In development: Use localhost or env variable

  if (import.meta.env.PROD) {
    // Production: API is at same origin (Vercel serverless function)
    return '';
  }

  // Development: Use environment variable or localhost backend
  return import.meta.env.VITE_API_URL || 'http://localhost:8001';
}

// Helper to check if we're in production
export function isProduction(): boolean {
  return import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.PROD;
}
