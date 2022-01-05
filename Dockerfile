FROM node:14

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npm install aws-crt@1.1.3

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]