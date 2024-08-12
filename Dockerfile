FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine AS deployment

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/index.js" ]