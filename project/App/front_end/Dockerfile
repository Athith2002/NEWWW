FROM node:latest

WORKDIR /app

COPY package.json .

COPY node_modules .

COPY . .

RUN npm install

EXPOSE 4173

CMD ["npm","run","dev"]