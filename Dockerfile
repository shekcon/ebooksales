FROM node:12

WORKDIR /src/app

COPY . .

RUN npm install --dev

CMD [ "npm", "start" ]