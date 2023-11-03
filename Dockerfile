FROM node:16
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

COPY nodemon.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

COPY .env ./

RUN npm install
RUN npm install -g nodemon
RUN npx prisma generate
# RUN npx prisma migrate

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm run dev-start