FROM node:lts-trixie

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
EXPOSE 4000

CMD [ "npm", "run", "start" ]