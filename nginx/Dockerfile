FROM	nginx:alpine

RUN		apk add --no-cache openssl

COPY	./conf/default.conf /etc/nginx/conf.d/default.conf

RUN		mkdir -p /etc/ssl/key /etc/ssl/cert && \
		openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
		-keyout /etc/ssl/key/nginx.key \
		-out /etc/ssl/cert/nginx.crt \
		-subj "/CN=localhost"

EXPOSE	443

CMD		["nginx", "-g", "daemon off;"]
