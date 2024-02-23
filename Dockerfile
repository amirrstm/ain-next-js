FROM node:18.17.1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

ENV NODE_ENV production
ARG NEXT_PUBLIC_API_BASE_ENDPOINT
ENV NEXT_PUBLIC_API_BASE_ENDPOINT=${NEXT_PUBLIC_API_BASE_ENDPOINT}
ARG NEXT_PUBLIC_BASE_ENDPOINT
ENV NEXT_PUBLIC_BASE_ENDPOINT=${NEXT_PUBLIC_BASE_ENDPOINT}
ARG NEXT_PUBLIC_PARTNER_PORTAL_URL
ENV NEXT_PUBLIC_PARTNER_PORTAL_URL=${NEXT_PUBLIC_PARTNER_PORTAL_URL}
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ENV NODE_ENV production
ARG NEXT_PUBLIC_API_BASE_ENDPOINT
ENV NEXT_PUBLIC_API_BASE_ENDPOINT=${NEXT_PUBLIC_API_BASE_ENDPOINT}
ARG NEXT_PUBLIC_BASE_ENDPOINT
ENV NEXT_PUBLIC_BASE_ENDPOINT=${NEXT_PUBLIC_BASE_ENDPOINT}
ARG NEXT_PUBLIC_PARTNER_PORTAL_URL
ENV NEXT_PUBLIC_PARTNER_PORTAL_URL=${NEXT_PUBLIC_PARTNER_PORTAL_URL}
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

CMD ["node", "server.js"]