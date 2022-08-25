FROM node:16.15.1-alpine AS base 

WORKDIR /usr/src/app

# For dev copy the whole thing over
FROM base AS development
ENV NODE_ENV=development
COPY . .
RUN npm install
# RUN chmod -R u+x ./**/*.sh

# For building, copy the whole thing over and run a build command
FROM development AS builder
RUN rm -rf ./build
RUN npm run build

# For production, run the builder, then copy the results over
FROM base AS production
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/src/app/build ./build
ARG CRON_SCHEDULE=0 0 * * *
RUN crontab -l | { cat; echo "$CRON_SCHEDULE node /usr/src/app/build/index.js"; } | crontab -
ENTRYPOINT ["crond", "-f", "-l15"]