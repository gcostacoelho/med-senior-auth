FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

EXPOSE 5001

COPY . .

CMD npm run build && npm run start:prod