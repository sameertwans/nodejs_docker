FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Expose inside of the docker container and map the port to the host machine
EXPOSE 3021

CMD ["npm", "run", "dev"]
