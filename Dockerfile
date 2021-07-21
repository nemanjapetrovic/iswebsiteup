# Using multi-stage build process

# Build process
FROM node:lts-alpine3.14 as build

WORKDIR /usr/src/iswebsiteup
COPY . .
RUN npm install && npm run build

# App running
FROM node:lts-alpine3.14
# We add some dumb app because Node.js is not designed to run as PID 1 in Docker
RUN apk add dumb-init

USER node
EXPOSE 8080

ENV NODE_ENV=production \
    PORT=8080 \
    TELEGRAM_LOGGER_ACTIVATED=0

WORKDIR /usr/src/iswebsiteup
COPY --from=build ["/usr/src/iswebsiteup/www","/usr/src/iswebsiteup/package.json","/usr/src/iswebsiteup/package-lock.json","./"]
RUN npm ci --production && npm cache clean --force

CMD ["dumb-init", "node", "app.js"]
