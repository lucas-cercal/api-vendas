FROM node:18.19.0

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app
