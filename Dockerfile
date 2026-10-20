FROM node:12.16.1 AS base
ENV APP_HOME=/usr/src/app \
  TERM=xterm
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
EXPOSE 8000

FROM base AS development
ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN npm install
RUN npm rebuild node-sass
COPY .babelrc index.js nodemon.json ./
COPY ./webpack ./webpack
COPY client ./client
COPY server ./server
COPY translations/locales ./translations/locales
CMD ["npm", "start"]

FROM development AS build
ENV NODE_ENV production
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY package.json package-lock.json index.js ./
RUN npm install --production
RUN npm rebuild node-sass
COPY --from=build $APP_HOME/dist ./dist
CMD ["npm", "run", "start:prod"]
