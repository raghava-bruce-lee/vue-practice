FROM nginx:stable-alpine

WORKDIR /app

COPY . .

COPY /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]