FROM node:14.18.2-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "node", "start" ]


FROM mysql 
EXPOSE 3306 
COPY ./efishery.sql /docker-entrypoint-initdb.d/