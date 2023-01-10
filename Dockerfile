FROM node

EXPOSE 3030

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]