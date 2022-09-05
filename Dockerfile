# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV NODE_ENV=developer
RUN mkdir -p /usr/src/app    
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --force 

COPY . .

EXPOSE 4002

CMD [ "npm", "run", "start" ]   