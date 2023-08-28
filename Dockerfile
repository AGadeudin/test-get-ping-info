FROM node:18.17.1

WORKDIR /application

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

COPY ./dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
