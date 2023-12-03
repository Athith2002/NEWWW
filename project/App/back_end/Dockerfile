FROM node:latest

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5005
# required for docker desktop port mapping

CMD ["npm", "run", "dev"]