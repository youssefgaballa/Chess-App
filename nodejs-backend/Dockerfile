FROM node:lts-trixie

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${BACKEND_PORT}
EXPOSE ${HTTP_PORT}

CMD [ "npm", "run", "start" ]