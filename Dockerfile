FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# # Run database migrations
# RUN npx prisma migrate dev --name init

# # Run database seed
# RUN npx prisma db seed

ENV PORT 4000 

# Expose inside of the docker container and map the port to the host machine
EXPOSE $PORT

CMD ["npm", "run", "dev"]
