/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  swcMinify: true,
  distDir: 'dist',
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    loader: 'custom',
    loaderFile: '/nextImageLoader.js',
  },
  transpilePackages: ['lucide-react'],
}

module.exports = withBundleAnalyzer(nextConfig)
