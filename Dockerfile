# stage 1

FROM node:18 AS builder

WORKDIR /app

COPY . /app/

RUN npm install

COPY . .

RUN npm run build

#stage 2

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]




