FROM node:18-alpine
EXPOSE 3000
EXPOSE 9466

RUN mkdir /app && chown -R node:node /app

USER node

COPY package.json package-lock.json /app/
RUN cd /app && npm ci

WORKDIR /app

COPY --chown=node:node . /app

RUN npm run build

CMD [ "npm", "run" ,"start:prod" ]
