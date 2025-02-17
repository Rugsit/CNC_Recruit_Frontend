# Build Stage
FROM node:20-alpine AS builder
WORKDIR /cnc-recruit-front

# Install pnpm
RUN npm install -g pnpm

COPY package.json  ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . . 
RUN pnpm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /cnc-recruit-front

# Install pnpm globally in the runner stage
RUN npm install -g pnpm

COPY --from=builder /cnc-recruit-front/package.json . 
COPY --from=builder /cnc-recruit-front/pnpm-lock.yaml . 

# Install production dependencies only
RUN pnpm install --prod

# Copy necessary project files
COPY --from=builder /cnc-recruit-front/next.config.js ./
COPY --from=builder /cnc-recruit-front/public ./public 
COPY --from=builder /cnc-recruit-front/.next ./next
COPY --from=builder /cnc-recruit-front/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "prod"]
