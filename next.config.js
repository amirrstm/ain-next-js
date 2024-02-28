/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const nextConfig = {
  swcMinify: true,
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    loader: 'custom',
    loaderFile: '/nextImageLoader.js',
  },
  transpilePackages: ['lucide-react'],
}

module.exports = withBundleAnalyzer(nextConfig)

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
