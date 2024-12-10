FROM node:20-alpine AS builder
WORKDIR /cnc-recruit-front

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /cnc-recruit-front
COPY --from=builder /cnc-recruit-front/package.json .
COPY --from=builder /cnc-recruit-front/package-lock.json .
COPY --from=builder /cnc-recruit-front/next.config.js ./
COPY --from=builder /cnc-recruit-front/public ./public
COPY --from=builder /cnc-recruit-front/.next/standalone ./
COPY --from=builder /cnc-recruit-front/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "run", "prod"]