FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add --no-cache \
	python3 \
	make \
	g++ \
	sqlite-dev

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
