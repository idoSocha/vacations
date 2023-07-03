FROM node:18-alpine

RUN npm i -g nodemon

RUN npm i -g ts-node

WORKDIR /backend

COPY package*.json /backend

RUN npm i

COPY . /backend

ENTRYPOINT npm start
