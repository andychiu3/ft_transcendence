FROM  node:20-alpine

WORKDIR  /app

COPY package.json .

RUN  npm install

# RUN npm run build

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
