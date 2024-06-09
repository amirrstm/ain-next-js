/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  swcMinify: true,
  output: 'standalone',
  reactStrictMode: process.env.NODE_ENV === 'production',
  images: {
    loader: 'custom',
    loaderFile: '/nextImageLoader.js',
  },
}

export default withNextIntl(nextConfig)
