// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: 'https://70aed62355ed21e347cddda02698a8e3@o490318.ingest.sentry.io/4506807006920704',
  tracesSampleRate: 1,
  debug: false,
})
