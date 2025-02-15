FROM node:20-alpine AS builder
WORKDIR /cnc-recruit-front

# Install pnpm
RUN npm install -g pnpm

COPY package.json  ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . . 
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /cnc-recruit-front

# Install pnpm globally in the runner stage
RUN npm install -g pnpm

COPY --from=builder /cnc-recruit-front/package.json . 
COPY --from=builder /cnc-recruit-front/pnpm-lock.yaml . 
COPY --from=builder /cnc-recruit-front/next.config.js ./ 
COPY --from=builder /cnc-recruit-front/public ./public 
COPY --from=builder /cnc-recruit-front/.next/standalone ./ 
COPY --from=builder /cnc-recruit-front/.next/static ./.next/static 

EXPOSE 3000
ENTRYPOINT ["pnpm", "run", "prod"]