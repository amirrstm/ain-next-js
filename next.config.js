/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  swcMinify: true,
  reactStrictMode: process.env.NODE_ENV === 'production',
  output: 'standalone',
  images: {
    loader: 'custom',
    loaderFile: '/nextImageLoader.js',
  },
  transpilePackages: ['lucide-react'],
}

module.exports = withBundleAnalyzer(nextConfig)
