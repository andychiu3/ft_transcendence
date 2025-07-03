FROM node:18-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

# vite as toolkit with HMR
EXPOSE 5173

CMD ["npm", "run", "dev"]
