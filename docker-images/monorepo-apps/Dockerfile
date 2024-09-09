FROM node:22-alpine3.19 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS build

COPY ../../ /monorepo

WORKDIR /monorepo

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=web-app --prod /prod/web-app

FROM base AS web-app

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /prod/web-app/public ./apps/web-app/public
COPY --from=build --chown=nextjs:nodejs /prod/web-app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /prod/web-app/.next/static ./apps/web-app/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME=0.0.0.0 node apps/web-app/server.js
