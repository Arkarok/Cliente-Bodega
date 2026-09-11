FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-slim

WORKDIR /app

COPY --from=build /app/dist/CRUD-Angular ./dist/CRUD-Angular

EXPOSE 4000

CMD ["node", "dist/CRUD-Angular/server/server.mjs"]