// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: 'https://70aed62355ed21e347cddda02698a8e3@o490318.ingest.sentry.io/4506807006920704',
  tracesSampleRate: 1,
  debug: false,
})
