/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  swcMinify: true,
  env: {
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_GOOGLE_SECRET_ID: process.env.NEXT_GOOGLE_SECRET_ID,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
  },
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    loader: 'custom',
    loaderFile: '/nextImageLoader.js',
  },
  transpilePackages: ['lucide-react'],
}

module.exports = withNextIntl(nextConfig)

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: 'ainevis-fh',
    project: 'ainevis-front',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
)
