# Deployment Guide

This guide covers different deployment strategies for the AINevis application, from development to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Deployment Options](#deployment-options)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Docker Deployment](#docker-deployment)
- [Traditional Server Deployment](#traditional-server-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Logging](#monitoring--logging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying AINevis, ensure you have:

- Node.js 18+ installed
- pnpm package manager
- Git access to the repository
- Environment variables configured
- Backend API server running
- Cloud storage accounts (Cloudinary, Cloudflare)

## Environment Configuration

### Development Environment

```bash
# Clone the repository
git clone https://github.com/amirrstm/AIN-NextJS.git
cd AIN-NextJS

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.development

# Start development server
pnpm dev
```

### Production Environment

```bash
# Install production dependencies
pnpm install --prod

# Build the application
pnpm build

# Start production server
pnpm start
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment experience for Next.js applications.

#### Automatic Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Build Settings**
   ```bash
   Build Command: pnpm build
   Output Directory: .next (default)
   Install Command: pnpm install
   Development Command: pnpm dev
   ```

3. **Set Environment Variables**
   Add the following environment variables in Vercel dashboard:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_BASE_ENDPOINT=https://your-api-domain.com
   NEXT_PUBLIC_API_BASE_ENDPOINT=https://your-api-domain.com/api/v1
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   NEXT_PUBLIC_CLOUDFLARE_CLOUD_NAME=your_cloudflare_name
   ANALYZE=false
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

#### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Deploy with environment variables
vercel --prod --env NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. Docker Deployment

#### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Use Node.js 18 Alpine Linux
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  ainevis-frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
      - NEXT_PUBLIC_BASE_ENDPOINT=http://backend:4000
      - NEXT_PUBLIC_API_BASE_ENDPOINT=http://backend:4000/api/v1
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${CLOUDINARY_NAME}
      - NEXT_PUBLIC_CLOUDFLARE_CLOUD_NAME=${CLOUDFLARE_NAME}
    depends_on:
      - backend
    networks:
      - ainevis-network

  backend:
    image: ainevis/backend:latest
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
    networks:
      - ainevis-network

networks:
  ainevis-network:
    driver: bridge
```

#### Deploy with Docker

```bash
# Build the image
docker build -t ainevis-frontend .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  -e NEXT_PUBLIC_BASE_ENDPOINT=https://api.your-domain.com \
  -e NEXT_PUBLIC_API_BASE_ENDPOINT=https://api.your-domain.com/api/v1 \
  ainevis-frontend

# Or use Docker Compose
docker-compose up -d
```

### 3. Traditional Server Deployment

#### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'ainevis-frontend',
      script: 'pnpm start',
      cwd: '/path/to/your/project',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Cache static assets
    location /_next/static/ {
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    location /static/ {
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'

    - name: Install dependencies
      run: pnpm install --frozen-lockfile

    - name: Run linting
      run: pnpm check

    - name: Build application
      run: pnpm build
      env:
        NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
        NEXT_PUBLIC_BASE_ENDPOINT: ${{ secrets.NEXT_PUBLIC_BASE_ENDPOINT }}
        NEXT_PUBLIC_API_BASE_ENDPOINT: ${{ secrets.NEXT_PUBLIC_API_BASE_ENDPOINT }}

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
image: node:18-alpine

stages:
  - test
  - build
  - deploy

cache:
  paths:
    - node_modules/

install_dependencies:
  stage: test
  script:
    - pnpm install --frozen-lockfile

lint:
  stage: test
  script:
    - pnpm check

build:
  stage: build
  script:
    - pnpm build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - pnpm add -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  only:
    - main
```

## Environment Variables

### Required Variables

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BASE_ENDPOINT=https://api.your-domain.com
NEXT_PUBLIC_API_BASE_ENDPOINT=https://api.your-domain.com/api/v1

# Cloud Services
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDFLARE_CLOUD_NAME=your_cloudflare_name

# Optional
ANALYZE=false
```

### Environment-Specific Configuration

#### Development
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3500
NEXT_PUBLIC_BASE_ENDPOINT=http://localhost:4000
NEXT_PUBLIC_API_BASE_ENDPOINT=http://localhost:4000/api/v1
```

#### Staging
```bash
NEXT_PUBLIC_SITE_URL=https://staging.ainevis.com
NEXT_PUBLIC_BASE_ENDPOINT=https://api-staging.ainevis.com
NEXT_PUBLIC_API_BASE_ENDPOINT=https://api-staging.ainevis.com/api/v1
```

#### Production
```bash
NEXT_PUBLIC_SITE_URL=https://ainevis.com
NEXT_PUBLIC_BASE_ENDPOINT=https://api.ainevis.com
NEXT_PUBLIC_API_BASE_ENDPOINT=https://api.ainevis.com/api/v1
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
ANALYZE=true pnpm build

# Enable experimental features
# Add to next.config.mjs
experimental: {
  optimizePackageImports: ['@radix-ui/react-icons']
}
```

### CDN Configuration

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif']
  },
  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://cdn.ainevis.com'
    : ''
}
```

### Caching Strategy

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

## Monitoring & Logging

### Vercel Analytics

```javascript
// pages/_app.tsx or layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

### Performance Monitoring

```javascript
// pages/_app.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}
```

### Error Tracking

```javascript
// lib/error-tracking.js
export const logError = (error, context) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service
    console.error('Error:', error, 'Context:', context)
  }
}
```

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

#### Memory Issues

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

#### Environment Variable Issues

```bash
# Debug environment variables
pnpm build 2>&1 | grep "NEXT_PUBLIC"
```

### Health Checks

```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}
```

### Deployment Verification

```bash
# Check if application is running
curl -f http://localhost:3000/api/health

# Check environment variables
curl http://localhost:3000/api/config
```

## Security Considerations

### HTTPS Configuration

```javascript
// next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http'
          }
        ],
        destination: 'https://ainevis.com/:path*',
        permanent: true
      }
    ]
  }
}
```

### Security Headers

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## Backup & Recovery

### Database Backup

```bash
# Backup user data (if applicable)
curl -X GET "https://api.ainevis.com/backup" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -o backup-$(date +%Y%m%d).json
```

### Application Recovery

```bash
# Rollback to previous version
vercel rollback

# Or using Git
git revert HEAD
git push origin main
```

## Support

For deployment support:
- **Documentation**: [docs.ainevis.com/deployment](https://docs.ainevis.com/deployment)
- **Issues**: [GitHub Issues](https://github.com/amirrstm/AIN-NextJS/issues)
- **DevOps Support**: devops@ainevis.com

---

*Last updated: September 2024*